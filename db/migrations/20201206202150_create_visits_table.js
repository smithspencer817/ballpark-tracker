
exports.up = function(knex) {
  knex.schema.createTable('visits', t => {
    t.increments('id').primary().notNullable();
    t.integer('user_id').notNullable();
    t.integer('ballpark_id').notNullable();
    t.integer('away_team_id').notNullable();
    t.date('start_date');
    t.date('end_date');
    t.time('game_time');

    t.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    t.foreign('ballpark_id').references('id').inTable('ballparks').onDelete('SET NULL');
    t.foreign('away_team_id').references('id').inTable('teams').onDelete('SET NULL');
  })
  .then(res => console.log(res))
  .catch(err => console.log(err))
};
  
exports.down = function(knex) {
  knex.schema.dropTableIfExists('visits');
};