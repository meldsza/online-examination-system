const Faculty = require('../../models/Faculty')
module.exports = {
    async all(obj, args) {
        let query = Faculty.query();
        if (args.name)
            query.where('name', 'LIKE', '%' + args.name + '%');

        let res = await query.page(args.page || 0, args.limit || 1000)
        return res.results

    },
    async get(obj, args) {
        return await Faculty.query().where({ 'id': args.id });
    },
    async getGroups(obj) {
        return obj.$relatedQuery('faculties').where('id', obj.id)
    },
    async getPermissions(obj) {
        return await obj.$relatedQuery('permissions')
    }
}