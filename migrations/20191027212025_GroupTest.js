
exports.up = function (knex) {
    return knex.schema
        .createTable('group_test', function (table) {
            table.integer('group_id').unsigned().notNullable();
            table.integer('test_id').unsigned().notNullable();
            table.foreign('test_id').references('tests.id').onDelete('CASCADE').onUpdate('CASCADE')
            table.foreign('group_id').references('groups.id').onDelete('CASCADE').onUpdate('CASCADE')
            table.timestamps();
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable('group_test');
};
