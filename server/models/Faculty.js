const Model = require('./AbstractModel')
class Faculty extends Model {
    static get tableName() {
        return 'faculties';
    }
    static get relationMappings() {
        return {
            groups: {
                relation: Model.ManyToManyRelation,
                modelClass: 'Group',
                join: {
                    from: 'faculties.id',
                    through: {
                        from: 'group_faculty.faulty_id',
                        to: 'group_faculty.group_id'
                    },
                    to: 'groups.id'
                }
            },
            tests: {
                relation: Model.ManyToManyRelation,
                modelClass: 'Test',
                join: {
                    from: 'faculties.id',
                    through: {

                        from: 'faculty_test.faculty_id',
                        to: 'faculty_test.test_id'
                    },
                    to: 'tests.id'
                }
            },
        };
    }
}

module.exports = Faculty