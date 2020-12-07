
exports.up = function(knex) {
  knex.schema.createTable('teams', t => {
      
  })
  .then(res => {

  })
  .catch(err => {

  })
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('teams')
};
