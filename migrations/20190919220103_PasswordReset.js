
exports.up = function (knex) {
    return knex.schema
        .createTable('password_resets', function (table) {
            table.string('email', 255).primary();
            table.string('token', 255).notNullable().unique()
            table.integer('owner_id').unsigned().notNullable()
            table.string('owner_type', 255)
            table.timestamps();
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable('password_resets');
};
