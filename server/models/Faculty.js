const bookshelf = require('../bookshelf')
module.exports = bookshelf.model('Faculty', {
    tableName: 'faculties',
    permissions() {
        return this.belongsToMany('Permission', 'administrators');
    },
    groups() {
        this.belongsToMany('Group', 'group_faculty')
    }
});