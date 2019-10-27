const bookshelf = require('../bookshelf')
module.exports = bookshelf.model('Student', {
    tableName: 'students'
});