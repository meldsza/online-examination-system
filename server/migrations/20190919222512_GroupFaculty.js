
exports.up = function (knex) {
    return knex.schema
        .createTable('group_faculty', function (table) {
            table.integer('group_id').unsigned().notNullable();
            table.integer('faculty_id').unsigned().notNullable();
            table.foreign('faculty_id').references('faculties.id').onDelete('CASCADE').onUpdate('CASCADE')
            table.foreign('group_id').references('groups.id').onDelete('CASCADE').onUpdate('CASCADE')
            table.timestamps();
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable('group_faculty');
};
