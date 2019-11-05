const Faculty = require('../../models/Faculty')
module.exports = {
    async all(obj, args) {
        let query = Faculty.query();
        if (args.name)
            query.where('name', 'LIKE', '%' + args.name + '%');

        let res = await query.orderBy('created_at', 'desc').page(args.page || 0, args.limit || 1000)
        return res.results

    },
    async get(obj, args) {
        return await Faculty.query().findById(args.id);
    },
    async getGroups(obj) {
        return obj.$relatedQuery('groups')
    },
    async getTests(obj) {
        return obj.$relatedQuery('tests')
    }
}