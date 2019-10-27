const bookshelf = require('../bookshelf')
module.exports = bookshelf.model('Test', {
    tableName: 'tests',
    course() {
        return this.belongsTo('Course')
    },
    groups() {
        return this.belongsToMany('Group', 'group_test')
    },
    faculty() {
        return this.belongsTo('Faculty', 'faculty_test')
    }
});