const bookshelf = require('../bookshelf')
module.exports = bookshelf.model('UserToken', {
    tableName: 'user_tokens'
});