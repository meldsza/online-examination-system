
const Model = require('./AbstractModel')
class Group extends Model {
    static get tableName() {
        return 'groups';
    }
    static get relationMappings() {
        return {
            faculties: {
                relation: Model.ManyToManyRelation,
                modelClass: 'Faculty',
                join: {
                    from: 'groups.id',
                    through: {

                        from: 'group_faculty.group_id',
                        to: 'group_faculty.faculty_id'
                    },
                    to: 'faculties.id',
                }
            },
            students: {
                relation: Model.ManyToManyRelation,
                modelClass: 'Student',
                join: {
                    from: 'groups.id',
                    through: {

                        from: 'group_student.group_id',
                        to: 'group_student.student_id'
                    },
                    to: 'students.id',
                }
            },

            tests: {
                relation: Model.ManyToManyRelation,
                modelClass: 'Test',
                join: {
                    from: 'groups.id',
                    through: {

                        from: 'group_test.group_id',
                        to: 'group_test.test_id'
                    },
                    to: 'tests.id'
                }
            },

        };
    }
}

module.exports = Group