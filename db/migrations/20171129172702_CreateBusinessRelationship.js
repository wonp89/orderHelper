
exports.up = function(knex, Promise) {
  return knex.schema.createTable('businessRelationship', table => {
    table.increments('id')
    table.integer('businessId').references('users.id').onDelete('SET NULL')
    table.integer('supplierId').references('users.id').onDelete('SET NULL')
    table.string('day')
    table.timestamps(false, true)
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('businessRelationship')
};
