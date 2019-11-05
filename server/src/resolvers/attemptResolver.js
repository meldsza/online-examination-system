const Attempt = require('../../models/Attempt')
const moment = require('moment')
module.exports = {
    async get(obj, args) {
        let d = Attempt.query().findById(args.id);
        //console.log(d)
        return await d;
    },
    async getTest(obj) {
        return await obj.$relatedQuery('test')
    },
    async getAnswers(obj) {
        return await obj.$relatedQuery('answers')
    },
    async getStudent(obj) {
        return await obj.$relatedQuery('student')
    },
    async getMarks(obj) {
        if (!obj.submitted_at) return
        let now = new Date()
        now = moment(now.toISOString().slice(0, 19).replace('T', ' '));
        if (now.diff(obj.submitted_at, 'seconds') > 0) {
            let marks = await obj.$relatedQuery('answers').sum('marks as m')
            return marks[0].m
        }
    },
}