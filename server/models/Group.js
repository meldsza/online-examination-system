const bookshelf = require('../bookshelf')
module.exports = bookshelf.model('Group', {
    tableName: 'groups',
    parent() {
        return this.belongsTo('Group', 'parent_group')
    },
    children() {
        return this.hasMany('Group', 'parent_group')
    },
    students() {
        return this.belongsToMany('Student', 'group_student')
    },
    faculties() {
        return this.belongsToMany('Faculty', 'group_faculty')
    },
    test() {
        return this.belongsToMany('Test', 'group_test')
    }
});