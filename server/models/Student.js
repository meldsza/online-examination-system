const bookshelf = require('../bookshelf')
module.exports = bookshelf.model('Student', {
    tableName: 'students',
    groups() {
        this.belongsToMany('Group', 'group_student')
    }
});