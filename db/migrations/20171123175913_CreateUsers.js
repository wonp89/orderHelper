exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('email').unique().notNull()
    table.string('businessName').unique().notNull()
    table.string('passwordDigest').notNull()
    table.string('street')
    table.string('city')
    table.string('province')
    table.string('postal')
    table.string('country')
    table.timestamps(false, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
