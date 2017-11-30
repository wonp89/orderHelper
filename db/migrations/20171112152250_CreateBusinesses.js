exports.up = function(knex, Promise) {
  return knex.schema.createTable('businesses', table => {
    table.increments('id')
    table.string('business_name')
    table.string('day')
    // table.integer('orderId').references('orders.id').onDelete('CASCADE')
    table.timestamps(false, true)
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('businesses')
};
