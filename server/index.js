const cors = require('cors')
const morgan = require('morgan');
const db = require('./src/db');
const express = require('express');
const asp = require('apollo-server-express')
const ApolloServer = asp.ApolloServer,
    AuthenticationError = asp.AuthenticationError


const schema = require('./src/schema');
const resolvers = require('./src/resolvers');

function createServer() {
    let app = express();
    initalizeServer(app);
    launchServer(app);
}
function initalizeServer(app) {

    app.use(cors());

    app.use(morgan('dev'));
    app.use(express.static('dist'))

    const server = new ApolloServer({
        introspection: true,
        playground: true,
        typeDefs: schema,
        resolvers,
        formatError: error => {
            return {
                ...error,
            };
        },
        context: ({ req }) => {
            // get the user token from the headers
            let token = req.headers.authorization || '';
            if (!token.includes("Bearer")) return new AuthenticationError("Invalid token")
            token = token.substring(7).trim()
            // try to retrieve a user with the token
            const user = db.findUserByToken(token);

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