const Group = require('../../models/Group')
module.exports = {
    async all(obj, args) {
        let query = Group.query();
        if (args.name)
            query.where('name', 'LIKE', '%' + args.name + '%');

        let res = await query.orderBy('created_at', 'desc').page(args.page || 0, args.limit || 1000)
        return res.results

    },
    async get(obj, args) {
        return await Group.query().findById(args.id);
    },
    async getStudents(obj) {
        return obj.$relatedQuery('students')
    },
    async getFaculties(obj) {
        return obj.$relatedQuery('faculties')
    },
    async getTests(obj) {
        return await obj.$relatedQuery('tests')
    }
}