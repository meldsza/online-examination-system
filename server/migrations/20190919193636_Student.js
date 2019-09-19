
exports.up = function (knex) {
    return knex.schema
        .createTable('students', function (table) {
            table.increments('id');
            table.string('name', 255).notNullable();
            table.string('username', 255).notNullable();
            table.string('usn', 50).notNullable().unique();
            table.string('email', 255).nullable().unique();
            table.string('password', 255).notNullable();
            table.date('dob').nullable();
            table.timestamps();
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable('students');
};
