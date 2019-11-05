const Attempt = require('../../models/Attempt')
const Answer = require('../../models/Answer')
const Question = require('../../models/Question')
const Test = require('../../models/Test')
module.exports = {
    async finishAttempt(parent, args) {
        let submitted_at = new Date().toISOString().slice(0, 19).replace('T', ' ')
        return await Attempt.query().patchAndFetchById(args.id, { submitted_at: submitted_at })
    },
    async attemptTest(parent, args, context) {
        let test = await Test.query().findById(args.id)
        let submitted_at = null
        if (test.settings.duration)
            submitted_at = (new Date(Date.now() + 60 * 1000 * test.settings.duration)).toISOString().slice(0, 19).replace('T', ' ');
        return await Attempt.query().insert({ test_id: args.id, student_id: context.user.id, submitted_at: submitted_at })
    },
    async answerQuestion(parent, args, context) {
        let attempt = await Attempt.query().findById(args.attemptID)
        if (!attempt) throw new Error('Attempt Not Found')
        let attempt_student = await attempt.$relatedQuery('student')
        if (attempt_student.usn != context.user.usn) throw new Error('Forbidden')
        let question = await Question.query().findById(args.questionID)
        if (question.schema.type == 'mcq')
            args.marks = (question.schema.correct_option == args.data) ? question.schema.marks : 0
        else
            args.marks = null
        let answer = await Answer.query().where({ 'question_id': args.questionID, 'attempt_id': attempt.id })
        if (answer[0]) {
            answer = answer[0]
            return await Answer.query().patchAndFetchById(answer.id, { data: args.data, marks: args.marks })
        }
        else return await Answer.query().insert({ 'question_id': args.questionID, 'attempt_id': attempt.id, data: args.data, marks: args.marks })
    },
    async evaluateAnswer(parent, args) {

        return await Answer.query().patchAndFetchById(args.id, { marks: args.marks })

    }
}