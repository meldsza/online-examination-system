const studentResolver = require('./resolvers/studentResolver')
const facultyResolver = require('./resolvers/facultyResolver')
const testResolver = require('./resolvers/testResolver')
module.exports = {
    Query: {
        faculties: facultyResolver.all,
        students: studentResolver.all,
        faculty: facultyResolver.get,
        student: studentResolver.get,
        tests: testResolver.all,
        test: testResolver.get
    },
    Faculty: {
        groups: facultyResolver.getGroups,
        permissions: facultyResolver.getPermissions
    },
    Student: {
        groups: studentResolver.getGroups,
        attempts: studentResolver.getAttempts
    }
}