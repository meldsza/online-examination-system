
exports.up = function (knex) {
    return knex.schema
        .createTable('tests', function (table) {
            table.increments('id');
            table.integer('course_id').unsigned().notNullable();
            table.string('name', 255);
            table.json('settings');
            table.timestamps();
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable('tests');
};
