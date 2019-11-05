const studentResolver = require('./resolvers/studentResolver')
const facultyResolver = require('./resolvers/facultyResolver')
const testResolver = require('./resolvers/testResolver')
const courseResolver = require('./resolvers/courseResolver')
const groupResolver = require('./resolvers/groupResolver')
const questionResolver = require('./resolvers/questionResolver')
const answerResolver = require('./resolvers/answerResolver')
const attemptResolver = require('./resolvers/attemptResolver')
const facultyMutators = require('./mutators/facultyMutator')
const studentMutators = require('./mutators/studentMutator')
const groupMutators = require('./mutators/groupMutator')
const testMutators = require('./mutators/testMutator')
const attemptMutators = require('./mutators/attemptMutator')

const countResolvers = require('./resolvers/countResolvers')

module.exports = {
    Query: {
        faculties: facultyResolver.all,
        students: studentResolver.all,
        faculty: facultyResolver.get,
        student: studentResolver.get,
        tests: testResolver.all,
        test: testResolver.get,
        courses: courseResolver.all,
        course: courseResolver.get,
        group: groupResolver.get,
        groups: groupResolver.all,
        question: questionResolver.get,
        attempt: attemptResolver.get,
        ...countResolvers,
        me: (_, __, context) => { return context.user }
    },
    User: {
        __resolveType(obj) {
            if (obj.type == 'FACULTY') {
                return 'Faculty';
            }
            else if (obj.type == 'STUDENT') {
                return 'Student';
            }
            return null;
        },
    },
    Faculty: {
        groups: facultyResolver.getGroups,
        tests: facultyResolver.getTests
    },
    Student: {
        groups: studentResolver.getGroups,
        attempts: studentResolver.getAttempts
    },
    Test: {
        groups: testResolver.getGroups,
        questions: testResolver.getQuestions,
        attempts: testResolver.getAttempts,
        faculties: testResolver.getFaculties,
        course: testResolver.getCourse
    },
    Answer: {
        attempt: answerResolver.getAttempt,
        question: answerResolver.getQuestion
    },
    Course: {
        tests: courseResolver.getTests
    },
    Group: {
        students: groupResolver.getStudents,
        faculties: groupResolver.getFaculties,
        tests: groupResolver.getTests
    },
    Question: {
        test: questionResolver.getTest,
        student_answers: questionResolver.getStudentAnswers
    },
    Attempt: {
        student: attemptResolver.getStudent,
        answers: attemptResolver.getAnswers,
        test: attemptResolver.getTest,
        marks: attemptResolver.getMarks
    },
    Mutation: {
        ...facultyMutators,
        ...studentMutators,
        ...groupMutators,
        ...testMutators,
        ...attemptMutators
    }
}