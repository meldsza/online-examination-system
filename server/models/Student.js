const bookshelf = require('../bookshelf')
module.exports = bookshelf.model('Student', {
    tableName: 'students',
    groups() {
        return this.belongsToMany('Group', 'group_student')
    },
    attempts() {
        return this.hasMany('Attempt')
    }
});