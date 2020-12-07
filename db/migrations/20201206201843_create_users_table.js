
exports.up = function(knex) {
  knex.schema.createTable('users', t => {
    t.increments('id').primary().notNullable();
    t.integer('favorite_team_id').notNullable();
    t.string('username', 20).unique().notNullable();
    t.string('password').notNullable();
    t.string('first_name', 50).notNullable();
    t.string('last_name', 50).notNullable();
    t.string('email', 50).unique().notNullable();
    t.integer('age').notNullable();
    t.binary('img');

    t.foreign('favorite_team_id').references('id').inTable('teams').onDelete('SET NULL');
  })
  .then(res => console.log(res))
  .catch(err => console.log(err))
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('users');
};
