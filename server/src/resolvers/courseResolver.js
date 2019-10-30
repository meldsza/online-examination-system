const Course = require('../../models/Course')
module.exports = {
    async all(obj, args) {
        let query = Course.query();
        if (args.name)
            query.where('name', 'LIKE', '%' + args.name + '%');

        let res = await query.orderBy('created_at', 'desc').page(args.page || 0, args.limit || 1000)
        return res.results
    },
    async get(obj, args) {
        return await Course.query().where({ 'id': args.id });
    },
    async getTests(obj) {
        return await obj.$relatedQuery('tests')
    },
}