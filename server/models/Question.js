const bookshelf = require('../bookshelf')
module.exports = bookshelf.model('Question', {
    tableName: 'questions',
    test() {
        return this.belongsTo('Test')
    },
    attempts() {
        return this.hasMany('Attempt')
    }
});