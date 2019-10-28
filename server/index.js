const cors = require('cors')
const morgan = require('morgan');
const db = require('./src/db');
const permissionDirective = require('./src/directives/permissionDirective')
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
        },
        formatError: error => {
            return {
                ...error,
            };
        },
        context: async ({ req }) => {
            // get the user token from the headers
            let token = req.headers.authorization || '';
            if (!token.includes("Bearer")) return new AuthenticationError("Invalid token")
            token = token.substring(7).trim()
            // try to retrieve a user with the token
            const tu = await db.UserToken.where({ 'token': token }).fetch()
            if (!tu)
                return new AuthenticationError("Invalid token")
            const user = tu.user;
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