
exports.up = function (knex) {
    return knex.schema
        .createTable('administrators', function (table) {
            table.integer('faculty_id').unsigned().notNullable();
            table.integer('permission_id').unsigned().notNullable();
            table.timestamps();
            table.primary(['faculty_id', 'permission_id'])
        });
};

exports.down = function (knex) {
    return knex.schema.dropTable('administrators');
};
