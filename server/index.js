const cors = require('cors')
const morgan = require('morgan');
const db = require('./src/db');
const permissionDirective = require('./src/directives/permissionDirective')
const userTypeDirective = require('./src/directives/userTypeDirective')
const express = require('express');
const { ApolloServer, AuthenticationError } = require('apollo-server-express')
const schema = require('./src/schema');
const resolvers = require('./src/resolvers');

function createServer() {
    let app = express();
    initalizeServer(app);
    app.use(express.static('dist'))
    launchServer(app);
}
function initalizeServer(app) {

    app.use(cors());

    app.use(morgan('dev'));


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
            const tu = await db.UserToken.where({ 'token': token })
            if (!tu)
                throw new AuthenticationError("Invalid token")
            let user;
            if (tu.user_type == 'Faculty') {
                user = await db.Faculty.query().findById(tu.user_id);
                user.type = "FACULTY"
            } else if (tu.user_type == 'Student') {
                user = await db.Student.query().findById(tu.user_id);
                user.type = "STUDENT"
            }
            else throw new AuthenticationError("Invalid token")
            // add the user to the context
            return { user };
        },
        dataSources: () => ({ db })
    });
    server.applyMiddleware({ app });

}
function launchServer(app) {
    const port = process.env.PORT || 8000;

    app.listen({ port }, () => {
        console.log(`Apollo Server on http://localhost:${port}/graphql`);
    });
}
module.exports = {
    launchServer,
    initalizeServer,
    createServer
}