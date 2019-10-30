const Student = require('../../models/Student')
module.exports = {
    async all(obj, args) {
        let query = Student.query();
        if (args.name)
            query.where('name', 'LIKE', '%' + args.name + '%');


        let res = await query.orderBy('created_at', 'desc').page(args.page || 0, args.limit || 1000)
        return res.results


    },
    async get(obj, args) {
        let s = await Student.query().where({ 'id': args.id });
        console.log(s)
        return s;
    },
    async getGroups(obj) {
        return await obj.$relatedQuery('groups')
    },
    async getAttempts(obj) {
        return await obj.$relatedQuery('attempts')
    }
}