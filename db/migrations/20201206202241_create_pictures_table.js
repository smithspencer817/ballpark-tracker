
exports.up = function(knex) {
  knex.schema.createTable('pictures', t => {
    t.increments('id').primary().notNullable();
    t.integer('user_id').notNullable();
    t.integer('visit_id').notNullable();
    t.string('title', 50);
    t.text('description');
    t.binary('img');
    t.timestamp('created_at').defaultTo(knex.fn.now());

    t.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    t.foreign('visit_id').references('id').inTable('visits').onDelete('CASCADE');
  })
  .then(res => console.log(res))
  .catch(err => console.log(err))
};
  
exports.down = function(knex) {
  knex.schema.dropTableIfExists('pictures')
};