
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('businessRelationship', table => {
    table.boolean('userType')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('businessRelationship', table => {
    table.boolean('userType')
  })
};
