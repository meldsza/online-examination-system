
exports.up = function (knex) {
    return knex.schema
        .createTable('answers', function (table) {
            table.increments('id');
            table.integer('question_id').unsigned().notNullable();
            table.integer('attempt_id').unsigned().notNullable();
            table.json('data');
            table.unique('question_id', 'attempt_id');
            table.timestamps();
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable('answers');
};
