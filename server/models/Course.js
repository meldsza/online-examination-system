const bookshelf = require('../bookshelf')
module.exports = bookshelf.model('Course', {
    tableName: 'courses'
});