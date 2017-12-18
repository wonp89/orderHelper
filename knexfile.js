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
    connection: 'postgres://gzoddbmqvdtawa:b0943e976a7083f11ba591fc3a9e904ff75b6e064d41d25cecedd28b64187ae6@ec2-107-21-201-57.compute-1.amaz
onaws.com:5432/d5cnl9ai2tsfkj'
  }

};
