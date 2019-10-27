
exports.up = function (knex) {
    return knex.schema
        .createTable('courses', function (table) {
            table.increments('id');
            table.string('name', 255).notNullable();
            table.string('code', 50);
            table.timestamps();
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable('courses');
};
