const Test = require('../../models/Test')
module.exports = {
    async all(obj, args) {
        let query = Test.query();
        if (args.name)
            query.where('name', 'LIKE', '%' + args.name + '%');

        let res = await query.page(args.page || 0, args.limit || 1000)
        return res.results
    },
    async get(obj, args) {
        return await Test.query().where({ 'id': args.id });
    },
    async getFaculties(obj) {
        return await obj.$relatedQuery('faculties')
    },
    async getQuestions(obj) {
        return await obj.$relatedQuery('questions')
    },
    async getGroups(obj) {
        return await obj.$relatedQuery('groups')
    },
    async getAttempts(obj) {
        return await obj.$relatedQuery('attempts')
    },
    async getCourse(obj) {
        return await obj.$relatedQuery('course')
    }
}