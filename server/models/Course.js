
const Model = require('./AbstractModel')
class Course extends Model {
    static get tableName() {
        return 'courses';
    }
    static get relationMappings() {
        return {
            test: {
                relation: Model.HasManyRelation,
                modelClass: 'Test',
                join: {
                    from: 'courses.id',
                    to: 'tests.course_id'
                }
            }
        };
    }
}

module.exports = Course