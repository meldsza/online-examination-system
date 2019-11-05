const Answer = require('../../models/Answer')
module.exports = {
    async get(obj, args) {
        return await Answer.query().findById(args.id);
    },
    async getAttempt(obj) {
        return await obj.$relatedQuery('attempt')
    },
    async getQuestion(obj) {
        return await obj.$relatedQuery('question')
    }

}