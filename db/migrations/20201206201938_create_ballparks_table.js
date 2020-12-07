
exports.up = function(knex) {
    knex.schema.createTable('ballparks', t => {
        
    })
    .then(res => {
  
    })
    .catch(err => {
  
    })
  };
  
  exports.down = function(knex) {
    knex.schema.dropTableIfExists('ballparks')
  };
