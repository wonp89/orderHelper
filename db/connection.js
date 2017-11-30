// ENV['RAILS_ENV']
// process.env.NODE_ENV
const knexConfig = require('../knexfile')[process.env.NODE_ENV || 'development']
const kx = require('knex')(knexConfig)

kx.on('query', query => {
})

module.exports = kx
