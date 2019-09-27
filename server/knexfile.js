// Update with your config settings.

module.exports = {
  client: 'mysql',
  connection: {
    database: 'oes',
    user: 'root',
    host: 'localhost'
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
