const fs = require('fs')
const { gql } = require('apollo-server');

module.exports = gql(fs.readFileSync('./schema.graphql', { encoding: 'utf-8' }))

