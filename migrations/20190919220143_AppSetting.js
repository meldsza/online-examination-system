
exports.up = function (knex) {
    return knex.schema
        .createTable('app_settings', function (table) {
            table.increments('id');
            table.string('name', 255);
            table.json('value');
            table.timestamps();
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable('app_settings');
};
