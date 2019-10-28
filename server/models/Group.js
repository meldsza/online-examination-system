
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
                        to: 'group_faculty.faulty_id'
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
            children: {
                relation: Model.HasManyRelation,
                modelClass: 'Group',
                join: {
                    from: 'groups.id',
                    to: 'groups.parent_id'
                }
            },
            test: {
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
            parent: {
                relation: Model.BelongsToOneRelation,
                modelClass: 'Group',
                join: {
                    from: 'groups.parent_id',
                    to: 'groups.id'
                }
            }
        };
    }
}

module.exports = Group