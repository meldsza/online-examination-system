
exports.up = function (knex) {
    return knex.schema
        .alterTable('attempts', function (table) {
            table.datetime('submitted_at').nullable()
        });
};

exports.down = function (knex) {
    return knex.schema.alterTable('attempts', function (table) {
        table.dropColumn('submitted_at')
    });
};
