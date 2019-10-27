
exports.up = function (knex) {
    return knex.schema
        .createTable('attempts', function (table) {
            table.increments('id');
            table.integer('student_id').unsigned().notNullable();
            table.integer('test_id').unsigned().notNullable();
            table.timestamps();
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable('attempts');
};
