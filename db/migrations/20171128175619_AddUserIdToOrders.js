
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('orders', table => {
    table.integer('businessId').references('users.id').onDelete('SET NULL')
    table.integer('supplierId').references('users.id').onDelete('SET NULL')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('orders',  table => {
    table.dropColumn('businessId')
    table.dropColumn('supplierId')
  })
};
