const Faculty = require('../../models/Faculty')
module.exports = {
    async createFaculty(parent, args) {
        return await Faculty.query().insert(args)
    },
    async updateFaculty(parent, args, context) {
        if (args.id == context.user.id)
            return await Faculty.query().patchAndFetchById(args.id, args)
        else throw new Error("Forbidden")
    },
    async updateFacultyPermissions(parent, args) {
        return await Faculty.query().patchAndFetchById(args.id, args)
    }
}