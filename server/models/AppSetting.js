
const Model = require('./AbstractModel')
class AppSetting extends Model {
    static get tableName() {
        return 'app_settings';
    }
}
module.exports = AppSetting
