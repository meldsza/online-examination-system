
exports.up = function (knex) {
    return knex.schema
        .alterTable('groups', function (table) {
            table.foreign('parent_group').references('groups.id').onDelete('CASCADE').onUpdate('CASCADE')
        });
};

exports.down = function (knex) {
    return knex.schema.alterTable('groups', function (table) {
        table.dropForeign('parent_group')
    });
};
