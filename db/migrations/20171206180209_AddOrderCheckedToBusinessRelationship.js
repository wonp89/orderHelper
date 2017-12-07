
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('businessRelationship', table => {
    table.boolean('orderChecked')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('businessRelationship', table => {
    table.boolean('orderChecked')
  })
};
