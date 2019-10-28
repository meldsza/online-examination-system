const Attempt = require('../../models/Attempt')
module.exports = {
    async get(obj, args) {
        return await Attempt.query().where({ 'id': args.id });
    },
    async getTest(obj) {
        return await obj.$relatedQuery('test')
    },
    async getAnswers(obj) {
        return await obj.$relatedQuery('answers')
    },
    async getStudent(obj) {
        return await obj.$relatedQuery('student')
    },
}