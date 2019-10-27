
exports.up = function (knex) {
    return knex.schema
        .alterTable('answers', function (table) {
            table.foreign('question_id').references('questions.id').onDelete('CASCADE').onUpdate('CASCADE')
            table.foreign('attempt_id').references('attempts.id').onDelete('CASCADE').onUpdate('CASCADE')
        });
};

exports.down = function (knex) {
    return knex.schema.alterTable('answers', function (table) {
        table.dropForeign('question_id')
        table.dropForeign('attempt_id')
    });
};
