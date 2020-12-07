
exports.up = function(knex) {
  knex.schema.createTable('ballparks', t => {
    t.increments('id').primary().notNullable();
    t.integer('home_team_id').notNullable();
    t.string('name', 50).notNullable();
    t.string('city', 50).notNullable();
    t.string('state', 2).notNullable();
    t.binary('img');

    t.foreign('home_team_id').references('id').inTable('teams').onDelete('CASCADE');
  })
  .then(res => console.log(res))
  .catch(err => console.log(err))
};
  
exports.down = function(knex) {
  knex.schema.dropTableIfExists('ballparks');
};
