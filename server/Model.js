const knex = require('knex')(require('../knexfile'))
const { Model } = require('objection')
Model.knex(knex)
module.exports = Model

