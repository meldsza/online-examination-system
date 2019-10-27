const bookshelf = require('../bookshelf')
module.exports = bookshelf.model('AppSetting', {
    tableName: 'app_settings'
});