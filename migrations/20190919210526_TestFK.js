
exports.up = function (knex) {
    return knex.schema
        .alterTable('tests', function (table) {
            table.foreign('course_id').references('courses.id').onDelete('CASCADE').onUpdate('CASCADE')
        });
};

exports.down = function (knex) {
    return knex.schema.alterTable('tests', function (table) {
        table.dropForeign('course_id')
    });
};
