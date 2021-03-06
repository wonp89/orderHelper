// Update with your config settings.
const sharedConfig = {
  client: 'postgresql',
  migrations: {
    tableName: 'knex_migrations',
    directory: './db/migrations'
  }
}

module.exports = {
  development: {
    ...sharedConfig,
    connection: {
      database: 'order_dev'
    }
  },

  staging: {
    ...sharedConfig,
    connection: {
      database: 'order_sta'
    }
  },

  production: {
    ...sharedConfig,
    connection: {
      database: 'order_pro'
    }
  }

};
