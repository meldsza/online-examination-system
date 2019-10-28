const Student = require('../../models/Student')
module.exports = {
    async createStudent(parent, args) {
        return await Student.query().insert(args)
    },
    async updateStudent(parent, args) {
        return await Student.query().patchAndFetchById(args.id, args)

    },
}