
exports.up = function (knex) {
    return knex.schema
        .createTable('administrators', function (table) {
            table.integer('faculty_id').unsigned().notNullable();
            table.integer('permission_id').unsigned().notNullable();
            table.timestamps();
        });
};

exports.down = function (knex) {
    return knex.schema.dropTable('administrators');
};
