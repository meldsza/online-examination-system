const Model = require('../Model')
class AbstractModel extends Model {
    static get modelPaths() {
        return [__dirname];
    }
    $beforeInsert() {
        this.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    $beforeUpdate() {
        this.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
}
module.exports = AbstractModel

