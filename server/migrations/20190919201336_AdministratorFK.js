
exports.up = function (knex) {
    return knex.schema
        .alterTable('administrators', function (table) {
            table.foreign('faculty_id').references('faculties.id').onDelete('CASCADE').onUpdate('CASCADE')
            table.foreign('permission_id').references('permissions.id').onDelete('CASCADE').onUpdate('CASCADE')
        });
};

exports.down = function (knex) {
    return knex.schema.alterTable('administrators', function (table) {
        table.dropForeign('faculty_id')
        table.dropForeign('permission_id')
    });
};
