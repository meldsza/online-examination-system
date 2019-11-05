
const Model = require('./AbstractModel')
class Attempt extends Model {
    static get tableName() {
        return 'attempts';
    }
    static get relationMappings() {
        return {
            test: {
                relation: Model.BelongsToOneRelation,
                modelClass: 'Test',
                join: {
                    from: 'attempts.test_id',
                    to: 'tests.id'
                }
            },
            student: {
                relation: Model.BelongsToOneRelation,
                modelClass: 'Student',
                join: {
                    from: 'attempts.student_id',
                    to: 'students.id'
                }
            }, answers: {
                relation: Model.HasManyRelation,
                modelClass: 'Answer',
                join: {
                    from: 'attempts.id',
                    to: 'answers.attempt_id'
                }
            },
        };
    }
}

module.exports = Attempt