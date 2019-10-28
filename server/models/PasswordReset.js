

const Model = require('./AbstractModel')
class PasswordReset extends Model {
    static get tableName() {
        return 'password_resets';
    }
}
module.exports = PasswordReset
