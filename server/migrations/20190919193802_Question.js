
exports.up = function (knex) {
    return knex.schema
        .createTable('questions', function (table) {
            table.increments('id');
            table.integer('qno').unsigned().notNullable();
            table.integer('test_id').unsigned().notNullable();
            table.json('schema');
            table.timestamps();
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable('questions');
};
