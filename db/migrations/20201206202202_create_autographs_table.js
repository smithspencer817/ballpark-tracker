
exports.up = function(knex) {
    knex.schema.createTable('autographs', t => {
        
    })
    .then(res => {
  
    })
    .catch(err => {
  
    })
  };
  
  exports.down = function(knex) {
    knex.schema.dropTableIfExists('autographs')
  };
