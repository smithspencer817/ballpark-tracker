
exports.up = function(knex) {
  knex.schema.createTable('teams', t => {
    t.increments('id').primary().notNullable();
    t.string('name', 50).notNullable();
    t.string('league', 50).notNullable();
    t.binary('img');
  })
  .then(res => console.log(res))
  .catch(err => console.log(err))
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('teams');
};
