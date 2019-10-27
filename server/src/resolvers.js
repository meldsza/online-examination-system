const studentResolver = require('./resolvers/studentResolver')
const facultyResolver = require('./resolvers/facultyResolver')
module.exports = {
    Query: {
        faculties: facultyResolver.all,
        students: studentResolver.all,
        faculty: facultyResolver.get,
        student: studentResolver.get,
    }
}