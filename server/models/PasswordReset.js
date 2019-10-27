const bookshelf = require('../bookshelf')
module.exports = bookshelf.model('PasswordReset', {
    tableName: 'password_resets'
});