const bookshelf = require('../bookshelf')
module.exports = bookshelf.model('UserToken', {
    tableName: 'user_tokens',
    user() {
        this.morphOne('user', ['user_id', 'user_type'], ['Student', 'Faculty'])
    }
});