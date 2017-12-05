
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('businessRelationship', table => {
    table.boolean('confirm')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('businessRelationship', table => {
    table.boolean('confirm')
  })
};
