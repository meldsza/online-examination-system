
exports.up = function (knex) {
    return knex.schema
        .createTable('faculties', function (table) {
            table.increments('id');
            table.string('name', 255).notNullable();
            table.string('username', 255).notNullable();
            table.string('email', 255).nullable().unique();
            table.string('password', 255).notNullable();
            table.json('permissions');
            table.string('designation', 255).nullable();
            table.timestamps();
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable('faculties');
};
