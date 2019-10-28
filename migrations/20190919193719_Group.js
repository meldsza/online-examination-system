
exports.up = function (knex) {
    return knex.schema
        .createTable('groups', function (table) {
            table.increments('id');
            table.string('name', 255).notNullable();
            table.integer('parent_group').unsigned().nullable();
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable('groups');
};
