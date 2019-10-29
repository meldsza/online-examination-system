
const Model = require('./AbstractModel')
class Student extends Model {
    static get tableName() {
        return 'students';
    }
    static get $secureFields() {
        return ['password'];
    }
    static get relationMappings() {
        return {
            groups: {
                relation: Model.ManyToManyRelation,
                modelClass: 'Group',
                join: {
                    from: 'students.id',
                    through: {
                        from: 'group_student.student_id',
                        to: 'group_student.group_id'
                    },
                    to: 'groups.id'
                }
            },
            attempts: {
                relation: Model.HasManyRelation,
                modelClass: 'Attempt',
                join: {
                    from: 'students.id',
                    to: 'attempts.student_id'
                }
            }
        };
    }
    // omit stuff when creating json response from model
    $formatJson(json, options) {
        json = super.$formatJson(json, options);
        this.$secureFields.map(field => delete json[field])
        return json
    }
}

module.exports = Student