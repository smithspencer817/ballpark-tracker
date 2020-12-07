
exports.up = function(knex) {
  knex.schema.createTable('users', t => {
      
  })
  .then(res => {

  })
  .catch(err => {

  })
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('users')
};
