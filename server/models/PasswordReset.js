const bookshelf = require('../bookshelf')
module.exports = bookshelf.model('PasswordReset', {
    tableName: 'password_resets',
    user() {
        return this.morphOne('user', ['user_id', 'user_type'], ['Student', 'Faculty'])
    }
});