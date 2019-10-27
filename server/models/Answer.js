const bookshelf = require('../bookshelf')
module.exports = bookshelf.model('Answer', {
    tableName: 'answers',
    attempt() {
        return this.belongsTo('Attempt')
    },
    question() {
        return this.belongsTo('Question')
    }
});