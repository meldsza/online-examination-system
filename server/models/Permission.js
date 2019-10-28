
const Model = require('./AbstractModel')
class Permission extends Model {
    static get tableName() {
        return 'permissions';
    }
}
module.exports = Permission
