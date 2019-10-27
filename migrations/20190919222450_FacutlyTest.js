
exports.up = function (knex) {
    return knex.schema
        .createTable('faculty_test', function (table) {
            table.integer('faculty_id').unsigned().notNullable();
            table.integer('test_id').unsigned().notNullable();
            table.foreign('test_id').references('tests.id').onDelete('CASCADE').onUpdate('CASCADE')
            table.foreign('faculty_id').references('faculties.id').onDelete('CASCADE').onUpdate('CASCADE')
            table.timestamps();
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable('faculty_test');
};
