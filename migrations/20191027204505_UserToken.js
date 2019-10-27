
exports.up = function (knex) {
    return knex.schema
        .createTable('user_tokens', function (table) {
            table.increments('id');
            table.string('token', 255).notNullable();
            table.integer('user_id').unsigned().notNullable();
            table.string('user_type', 255).notNullable();
            table.timestamps();
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable('user_tokens');
};
