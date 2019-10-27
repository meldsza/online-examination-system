const bookshelf = require('../bookshelf')
module.exports = bookshelf.model('Attempt', {
    tableName: 'attempts',
    test() {
        return this.belongsTo('Test')
    },
    student() {
        return this.belongsTo('Student')
    }
});