const Test = require('../../models/Test')
module.exports = {
    async createTest(parent, args, context) {
        args.settings = {}
        let test = await Test.query().insert(args)
        await test.$relatedQuery('faculties').relate(context.user)
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
        let test;
        if (userTests.find(g => g.id == args.id) || context.user.permissions.includes("MANAGE_APPLICATION")) {
            test = await Test.query().findById(args.testID)
            test.$relatedQuery('faculties').relate(args.facultyID)
        }
        else throw new Error("Forbidden")
        return test.$query()
    },
    async removeFacultyFromTest(parent, args, context) {
        let userTests = await context.user.$relatedQuery('tests')
        if (userTests.find(g => g.id == args.id) || context.user.permissions.includes("MANAGE_APPLICATION"))
            await Test.query().findById(args.testID).$relatedQuery('faculties').unrelate().where('id', args.facultyID)
        else throw new Error("Forbidden")
        return Test.query().findById(args.testID)
    },
}