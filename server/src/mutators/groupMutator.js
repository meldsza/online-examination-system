const Group = require('../../models/Group')
module.exports = {
    async createGroup(parent, args, context) {
        let group = await Group.query().insert(args)
        await group.$appendRelated('faculties', context.user.id)
        return await group.$query()
    },
    async updateGroup(parent, args, context) {
        let userGroups = await context.user.$relatedQuery('groups')
        if (userGroups.find(g => g.id == args.id) || context.user.permissions.includes("MANAGE_APPLICATION"))
            return await Group.query().patchAndFetchById(args.id, args)
        else throw new Error("Forbidden")
    },
    async addFacultyToGroup(parent, args, context) {
        let group = await Group.query().findById(args.groupID).eager('faculties');
        if (group.faculties.find(f => (f.id == context.user.id)))
            await group.$appendRelated('faculties', args.facultyID)
        return await group.$query()
    },
    async removeFacultyFromGroup(parent, args, context) {
        let group = await Group.query().findById(args.groupID).eager('faculties');
        if (group.faculties.find(f => (f.id == context.user.id)))
            await group.$relatedQuery('faculties').unrelate().where('id', args.facultyID)
        return await group.$query()
    },
    async addStudentToGroup(parent, args, context) {
        let group = await Group.query().findById(args.groupID).eager('faculties');
        if (group.faculties.find(f => (f.id == context.user.id)))
            await group.$appendRelated('students', args.studentID)
        return await group.$query()
    },
    async removeStudentFromGroup(parent, args, context) {
        let group = await Group.query().findById(args.groupID).eager('faculties');
        if (group.faculties.find(f => (f.id == context.user.id)))
            await group.$relatedQuery('students').unrelate().where('id', args.studentID)
        return await group.$query()
    },

}