const bookshelf = require('../bookshelf')
module.exports = bookshelf.model('Question', {
    tableName: 'questions'
});