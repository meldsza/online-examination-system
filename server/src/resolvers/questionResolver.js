const Question = require('../../models/Question')
module.exports = {
    async get(obj, args) {
        return await Question.query().findById(args.id)
    },
    async getTest(obj) {
        return await obj.$relatedQuery('test')
    },
    async getStudentAnswers(obj) {
        return await obj.$relatedQuery('student_answers')
    }
}