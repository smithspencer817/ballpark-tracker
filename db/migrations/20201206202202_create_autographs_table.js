
exports.up = function(knex) {
    knex.schema.createTable('autographs', t => {
      t.increments('id').primary().notNullable();
      t.integer('user_id').notNullable();
      t.integer('player_id').notNullable();
      t.binary('img');

      t.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
      t.foreign('player_id').references('id').inTable('players').onDelete('SET NULL');
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  };
  
exports.down = function(knex) {
  knex.schema.dropTableIfExists('autographs');
};