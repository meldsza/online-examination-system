
exports.up = function (knex) {
    return knex.schema
        .alterTable('groups', function (table) {
            table.timestamps();
        });
};

exports.down = function (knex) {
    return knex.schema.alterTable('groups', function (table) {
        table.dropTimestamps()
    });
};
