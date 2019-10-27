const Faculty = require('../../models/Faculty')
module.exports = {
    async all(obj, args) {
        let query = Faculty;
        if (args.name)
            query.where('name', 'LIKE', '%' + args.name + '%');

        return await query.fetchPage({
            pageSize: args.limit,
            page: args.page
        })

    },
    async get(obj, args) {
        return await Faculty.where({ 'id': args.id }).fetch();
    }
}