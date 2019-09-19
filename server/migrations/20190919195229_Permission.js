
exports.up = function (knex) {
    return knex.schema
        .createTable('permissions', function (table) {
            table.increments('id');
            table.string('name', 255);
            table.timestamps();
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable('permissions');
};
