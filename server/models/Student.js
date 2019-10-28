
const Model = require('./AbstractModel')
class Student extends Model {
    static get tableName() {
        return 'students';
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
}

module.exports = Student