const Model = require('./AbstractModel')
class Test extends Model {
    static get tableName() {
        return 'tests';
    }
    static get jsonAttributes() {
        return ['settings'];
    }

    static get relationMappings() {
        return {
            course: {
                relation: Model.BelongsToOneRelation,
                modelClass: 'Course',
                join: {
                    from: 'tests.course_id',
                    to: 'courses.id'
                }
            },
            questions: {
                relation: Model.HasManyRelation,
                modelClass: 'Question',
                join: {
                    from: 'tests.id',
                    to: 'questions.test_id'
                }
            },
            attempts: {
                relation: Model.HasManyRelation,
                modelClass: 'Attempt',
                join: {
                    from: 'tests.id',
                    to: 'attempts.test_id'
                }
            },
            groups: {
                relation: Model.ManyToManyRelation,
                modelClass: 'Group',
                join: {
                    from: 'tests.id',
                    through: {

                        from: 'group_test.test_id',
                        to: 'group_test.group_id'
                    },
                    to: 'groups.id'
                }
            },
            faculties: {
                relation: Model.ManyToManyRelation,
                modelClass: 'Faculty',
                join: {
                    from: 'tests.id',
                    through: {

                        from: 'faculty_test.test_id',
                        to: 'faculty_test.faculty_id'
                    },
                    to: 'faculties.id'
                }
            },
        };
    }
}
module.exports = Test