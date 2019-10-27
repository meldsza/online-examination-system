const bookshelf = require('../bookshelf')
module.exports = bookshelf.model('Answer', {
    tableName: 'answers',
    attempt() {
        this.belongsTo('Attempt')
    },
    question() {
        return this.belongsTo('Question')
    }
});