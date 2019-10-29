const Model = require('./AbstractModel')
class Faculty extends Model {
    static get tableName() {
        return 'faculties';
    }
    get $secureFields() {
        return ['password'];
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
    // omit stuff when creating json response from model
    $formatJson(json, options) {
        json = super.$formatJson(json, options);
        this.$secureFields.map(field => delete json[field])
        return json
    }
}

module.exports = Faculty