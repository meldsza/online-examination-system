
exports.up = function (knex) {
    return knex.schema
        .alterTable('questions', function (table) {
            table.foreign('test_id').references('tests.id').onDelete('CASCADE').onUpdate('CASCADE')
        });
};

exports.down = function (knex) {
    return knex.schema.alterTable('questions', function (table) {
        table.dropForeign('test_id')
    });
};
