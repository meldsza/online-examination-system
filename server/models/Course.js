const bookshelf = require('../bookshelf')
module.exports = bookshelf.model('Course', {
    tableName: 'courses',
    tests() {
        return this.hasMany('Test')
    }
});