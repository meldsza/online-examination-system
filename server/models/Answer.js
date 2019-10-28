const Model = require('./AbstractModel')
class Answer extends Model {
    static get tableName() {
        return 'answers';
    }
    static get relationMappings() {
        return {
            attempt: {
                relation: Model.BelongsToOneRelation,
                modelClass: 'Attempt',
                join: {
                    from: 'answers.attempt_id',
                    to: 'attempts.id'
                }
            },
            question: {
                relation: Model.BelongsToOneRelation,
                modelClass: 'Question',
                join: {
                    from: 'answers.question_id',
                    to: 'questions.id'
                }
            }
        };
    }
}
module.exports = Answer