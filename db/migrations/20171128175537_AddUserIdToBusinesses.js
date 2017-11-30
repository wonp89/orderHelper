
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('businesses', table => {
    table.integer('userId').references('users.id').onDelete('SET NULL')
  })
};


exports.down = function(knex, Promise) {
  return knex.schema.alterTable('businesses',  table => {
    table.dropColumn('userId')
  })
};
