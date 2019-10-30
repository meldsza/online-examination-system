const cors = require('cors')
const morgan = require('morgan');
const db = require('./src/db');
const http = require('http')
const permissionDirective = require('./src/directives/permissionDirective')
const userTypeDirective = require('./src/directives/userTypeDirective')
const express = require('express');
const bodyParser = require('body-parser')
const { ApolloServer, AuthenticationError } = require('apollo-server-express')
const schema = require('./src/schema');
const resolvers = require('./src/resolvers');
const facultyLogin = require('./src/auth/loginFaculty')
const studentLogin = require('./src/auth/loginStudent')

let server;
async function verifyToken(token) {
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
    return user;
}
function createServer() {
    let app = express();



    const httpServer = initalizeServer(app);
    //app.use(express.static('dist'))
    //setupAuth(app)
    launchServer(httpServer);
}
function initalizeServer(app) {
    server = new ApolloServer({
        introspection: true,
        playground: true,
        typeDefs: schema,
        resolvers,
        schemaDirectives: {
            permission: permissionDirective,
            user_type: userTypeDirective
        },
        subscriptions: {
            onConnect: async (connectionParams) => {
                if (connectionParams.authToken) {
                    return { user: await verifyToken(connectionParams.authToken) }
                }

                throw new Error('Missing auth token!');
            },
        },
        formatError: error => {
            return {
                ...error,
            };
        },
        context: async ({ req, connection }) => {
            // get the user token from the headers
            if (connection) {
                // check connection for metadata
                return connection.context;
            }
            let token = req.headers.authorization || '';
            if (!token.includes("Bearer")) throw new AuthenticationError("Invalid token")
            token = token.substring(7).trim()
            // try to retrieve a user with the token
            return { user: await verifyToken(token) }

        },
        dataSources: () => ({ db })
    });
    //app.use('/graphql', server.getMiddleware())
    setupAuth(app)
    server.applyMiddleware({ app, path: '/graphql' });
    const httpServer = http.createServer(app);
    server.installSubscriptionHandlers(httpServer);
    return httpServer
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
function launchServer(httpServer) {
    const port = process.env.PORT || 4000;

    httpServer.listen({ port }, () => {
        console.log(`Apollo Server on http://localhost:${port}/${server.graphqlPath}`);
        console.log(`🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`)
    });
}
module.exports = {
    launchServer,
    initalizeServer,
    setupAuth,
    createServer
}