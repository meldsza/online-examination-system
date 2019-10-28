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
    }
}