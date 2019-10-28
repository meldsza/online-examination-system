const studentResolver = require('./resolvers/studentResolver')
const facultyResolver = require('./resolvers/facultyResolver')
const testResolver = require('./resolvers/testResolver')
const courseResolver = require('./resolvers/courseResolver')
module.exports = {
    Query: {
        faculties: facultyResolver.all,
        students: studentResolver.all,
        faculty: facultyResolver.get,
        student: studentResolver.get,
        tests: testResolver.all,
        test: testResolver.get,
        courses: courseResolver.all,
        course: courseResolver.get
    },
    Faculty: {
        groups: facultyResolver.getGroups,
        permissions: facultyResolver.getPermissions
    },
    Student: {
        groups: studentResolver.getGroups,
        attempts: studentResolver.getAttempts
    },
    Test: {
        groups: testResolver.getGroups,
        attempts: testResolver.getAttempts,
        faculties: testResolver.getFaculties,
        courses: testResolver.getCourse
    },
    Course: {
        tests: courseResolver.getTests
    }
}