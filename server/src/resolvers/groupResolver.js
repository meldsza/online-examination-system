const Group = require('../../models/Group')
module.exports = {
    async all(obj, args) {
        let query = Group.query();
        if (args.name)
            query.where('name', 'LIKE', '%' + args.name + '%');

        let res = await query.page(args.page || 0, args.limit || 1000)
        return res.results

    },
    async get(obj, args) {
        return await Group.query().where({ 'id': args.id });
    },
    async getParent(obj) {
        return obj.$relatedQuery('parent')
    },
    async getChildren(obj) {
        return obj.$relatedQuery('children')
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