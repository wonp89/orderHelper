
exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', table => {
  table.increments('id')
  table.string('order_name')
  table.string('quantity')
  table.text('message')
  table.string('photo_path')
  table.integer('businessId').references('businesses.id').onDelete('CASCADE')
  table.timestamps(false, true)
})
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('orders')
};
