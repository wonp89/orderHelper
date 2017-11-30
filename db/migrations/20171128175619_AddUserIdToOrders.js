
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('orders', table => {
    table.integer('userId').references('users.id').onDelete('SET NULL')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('orders',  table => {
    table.dropColumn('userId')
  })
};
