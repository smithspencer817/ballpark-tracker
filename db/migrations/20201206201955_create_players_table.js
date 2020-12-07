
exports.up = function(knex) {
    knex.schema.createTable('players', t => {
        
    })
    .then(res => {
  
    })
    .catch(err => {
  
    })
  };
  
  exports.down = function(knex) {
    knex.schema.dropTableIfExists('players')
  };
