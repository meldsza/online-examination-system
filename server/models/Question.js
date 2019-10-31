
const Model = require('./AbstractModel')
class Question extends Model {
    static get tableName() {
        return 'questions';
    }
    static get jsonAttributes() {
        return ['schema'];
    }
    static get relationMappings() {
        return {
            test: {
                relation: Model.BelongsToOneRelation,
                modelClass: 'Test',
                join: {
                    from: 'questions.test_id',
                    to: 'tests.id'
                }
            },
            student_answers: {
                relation: Model.HasManyRelation,
                modelClass: 'Answer',
                join: {
                    from: 'questions.id',
                    to: 'answers.question_id'
                }
            }
        };
    }
}

module.exports = Question