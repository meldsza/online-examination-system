const knex = require('knex')(require('../knexfile'))
const { Model } = require('objection')

class CustomQueryBuilder extends Model.QueryBuilder {
    omit(omits) {
        this.mergeContext({ omits })
        return this
    }
}
Model.knex(knex)
module.exports = Model

