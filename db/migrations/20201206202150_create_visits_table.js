
exports.up = function(knex) {
    knex.schema.createTable('visits', t => {
        
    })
    .then(res => {
  
    })
    .catch(err => {
  
    })
  };
  
  exports.down = function(knex) {
    knex.schema.dropTableIfExists('visits')
  };
