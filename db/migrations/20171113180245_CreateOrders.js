
exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', table => {
  table.increments('id')
  table.string('order_name')
  table.string('quantity')
  table.text('message')
  table.timestamps(false, true)
})
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('orders')
};
