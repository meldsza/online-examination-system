const Faculty = require('../../models/Faculty')
const Student = require('../../models/Student')
const Test = require('../../models/Test')
module.exports = {
    async testCount() {
        let res = await Test.query().count("id as c")
        return res[0].c
    },
    async facultyCount() {
        let res = await Faculty.query().count("id as c")
        return res[0].c
    },
    async studentCount() {
        let res = await Student.query().count("id as c")
        return res[0].c
    }
}