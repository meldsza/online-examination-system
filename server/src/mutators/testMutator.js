const Test = require('../../models/Test')
module.exports = {
    async createTest(parent, args, context) {
        let test = await Test.query().insert(args)
        await test.$appendRelated('faculties', context.user.id)
        return await test.$query();

    },
    async updateTest(parent, args, context) {
        let userTests = await context.user.$relatedQuery('tests')
        if (userTests.find(g => g.id == args.id) || context.user.permissions.includes("MANAGE_APPLICATION"))
            await Test.query().upsertGraph(args)
        else throw new Error("Forbidden")
        return await Test.query();
    },
    async addFacultyToTest(parent, args, context) {
        let userTests = await context.user.$relatedQuery('tests')
        if (userTests.find(g => g.id == args.id) || context.user.permissions.includes("MANAGE_APPLICATION")) {
            await Test.query().findById(args.testID).$appendRelated('faculties', args.facultyID)
        }
        else throw new Error("Forbidden")
        return Test.query().findById(args.testID)
    },
    async removeFacultyFromTest(parent, args, context) {
        let userTests = await context.user.$relatedQuery('tests')
        if (userTests.find(g => g.id == args.id) || context.user.permissions.includes("MANAGE_APPLICATION"))
            await Test.query().findById(args.testID).$relatedQuery('faculties').unrelate().where('id', args.facultyID)
        else throw new Error("Forbidden")
        return Test.query().findById(args.testID)
    },
}