
exports.up = function (knex) {
    return knex.schema
        .alterTable('attempts', function (table) {
            table.foreign('student_id').references('students.id').onDelete('CASCADE').onUpdate('CASCADE')
            table.foreign('test_id').references('tests.id').onDelete('CASCADE').onUpdate('CASCADE')
        });
};

exports.down = function (knex) {
    return knex.schema.alterTable('attempts', function (table) {
        table.dropForeign('student_id')
        table.dropForeign('test_id')
    });
};
