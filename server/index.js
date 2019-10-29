const cors = require('cors')
const morgan = require('morgan');
const db = require('./src/db');
const permissionDirective = require('./src/directives/permissionDirective')
const userTypeDirective = require('./src/directives/userTypeDirective')
const express = require('express');
const bodyParser = require('body-parser')
const { ApolloServer, AuthenticationError } = require('apollo-server-express')
const schema = require('./src/schema');
const resolvers = require('./src/resolvers');
const facultyLogin = require('./src/auth/loginFaculty')
const studentLogin = require('./src/auth/loginStudent')

function createServer() {
    let app = express();
    initalizeServer(app);
    app.use(express.static('dist'))
    //setupAuth(app)
    launchServer(app);
}
function initalizeServer(app) {
    const server = new ApolloServer({
        introspection: true,
        playground: true,
        typeDefs: schema,
        resolvers,
        schemaDirectives: {
            permission: permissionDirective,
            user_type: userTypeDirective
        },
        formatError: error => {
            return {
                ...error,
            };
        },
        context: async ({ req }) => {
            // get the user token from the headers
            let token = req.headers.authorization || '';
            if (!token.includes("Bearer")) throw new AuthenticationError("Invalid token")
            token = token.substring(7).trim()
            // try to retrieve a user with the token
            let tu = await db.UserToken.query().where({ 'token': token })
            if (tu.length == 0)
                throw new AuthenticationError("Invalid token")
            tu = tu[0]
            let user;
            if (tu.user_type == 'FACULTY') {
                user = await db.Faculty.query().findById(tu.user_id);
                user.type = "FACULTY"
            } else if (tu.user_type == 'STUDENT') {
                user = await db.Student.query().findById(tu.user_id);
                user.type = "STUDENT"
            }
            else throw new AuthenticationError("Invalid token")
            // add the user to the context
            return { user };
        },
        dataSources: () => ({ db })
    });
    //app.use('/graphql', server.getMiddleware())
    setupAuth(app)
    server.applyMiddleware({ app, path: '/graphql' });
}
function setupAuth(app) {
    app.use(bodyParser.json()) // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    app.use(cors())
    app.use(morgan('dev'));
    const authrouter = express.Router();
    authrouter.post('/faculty/login', facultyLogin)
    authrouter.post('/student/login', studentLogin)
    app.use('/auth', authrouter)

}
function launchServer(app) {
    const port = process.env.PORT || 4000;

    app.listen({ port }, () => {
        console.log(`Apollo Server on http://localhost:${port}/graphql`);
    });
}
module.exports = {
    launchServer,
    initalizeServer,
    setupAuth,
    createServer
}