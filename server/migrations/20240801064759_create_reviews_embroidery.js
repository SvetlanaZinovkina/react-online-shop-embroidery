export const up = (knex) => (
  knex.schema.createTable('reviews_embroidery', (table) => {
    table.increments('review_id').primary();
    table.integer('embroidery_id').unsigned().notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.integer('rating').notNullable();
    table.text('comment');

    table.foreign('embroidery_id').references('id').inTable('embroidery').onDelete('CASCADE');
    table.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE');
  })
);

export const down = (knex) => (
  knex.schema.dropTable('reviews_embroidery')
);
