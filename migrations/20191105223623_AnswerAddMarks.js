
exports.up = function (knex) {
    return knex.schema
        .alterTable('answers', function (table) {
            table.float('marks').nullable()
        });
};

exports.down = function (knex) {
    return knex.schema.alterTable('answers', function (table) {
        table.dropColumn('marks')
    });
};
