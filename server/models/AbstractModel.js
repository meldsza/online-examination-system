const Model = require('../Model')
class AbstractModel extends Model {
    static get modelPaths() {
        return [__dirname];
    }
}
module.exports = AbstractModel

