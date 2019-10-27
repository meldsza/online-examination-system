const Student = require('../../models/Student')
module.exports = {
    async all(obj, args) {
        let query = Student;
        if (args.name)
            query.where('name', 'LIKE', '%' + args.name + '%');


        return await query.fetchPage({
            pageSize: args.limit,
            page: args.page
        })


    },
    async get(obj, args) {
        return await Student.where({ 'id': args.id }).fetch();
    }
}