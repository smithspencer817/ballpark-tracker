
exports.up = function(knex) {
    knex.schema.createTable('pictures', t => {
        
    })
    .then(res => {
  
    })
    .catch(err => {
  
    })
  };
  
  exports.down = function(knex) {
    knex.schema.dropTableIfExists('pictures')
  };
