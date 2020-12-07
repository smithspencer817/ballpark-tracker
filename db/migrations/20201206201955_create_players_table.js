
exports.up = function(knex) {
  knex.schema.createTable('players', t => {
    t.increments('id').primary().notNullable();
    t.integer('team_id').notNullable();
    t.string('first_name', 50).notNullable();
    t.string('last_name', 50).notNullable();
    t.string('position', 2).notNullable();
    t.binary('img');

    t.foreign('team_id').references('id').inTable('teams').onDelete('SET NULL');
  })
  .then(res => console.log(res))
  .catch(err => console.log(err))
};
  
exports.down = function(knex) {
  knex.schema.dropTableIfExists('players');
};