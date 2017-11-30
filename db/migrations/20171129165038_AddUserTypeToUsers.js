
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', table => {
    table.string('userType')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users',  table => {
    table.dropColumn('userType')
  })
};
