const Attempt = require('../../models/Attempt')
const Answer = require('../../models/Answer')
module.exports = {
    async attemptTest(parent, args, context) {
        return await Attempt.query().insert({ test_id: args.testID, student_id: context.user.id })
    },
    async answerQuestion(parent, args, context) {
        let attempt = await Attempt.query().findById(args.attemptID)
        if (!attempt) throw new Error('Attempt Not Found')
        let attempt_student = await attempt.$relatedQuery('student')
        if (attempt_student.usn != context.user.usn) throw new Error('Forbidden')
        let answer = await Answer.query().where({ 'question_id': args.questionID, 'attempt_id': attempt.id })
        if (answer[0]) {
            answer = answer[0]
            return await Answer.query().patchAndFetchById(answer.id, { data: args.data })
        }
        else return await Answer.query().insert({ 'question_id': args.questionID, 'attempt_id': attempt.id, data: args.data })
    },
    async evaluateAnswer(parent, args, context) {
        let userTests = await context.user.$relatedQuery('tests')
        if (userTests.find(g => g.id == args.id) || context.user.permissions.includes("MANAGE_APPLICATION")) {
            return await Answer.query().patchAndFetchById(args.answerID, { marks: args.marks })
        }
    }
}