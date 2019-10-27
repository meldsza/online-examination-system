
exports.up = function (knex) {
    return knex.schema
        .createTable('group_student', function (table) {
            table.integer('group_id').unsigned().notNullable();
            table.integer('student_id').unsigned().notNullable();
            table.foreign('group_id').references('groups.id').onDelete('CASCADE').onUpdate('CASCADE')
            table.foreign('student_id').references('students.id').onDelete('CASCADE').onUpdate('CASCADE')
            table.primary(['group_id', 'student_id'])
            table.timestamps();
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable('group_student');
};
