export const up = (knex) => (
  knex.schema.createTable('reviews_svg', (table) => {
    table.increments('review_id').primary();
    table.integer('svg_id').unsigned().notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.integer('rating').notNullable();
    table.text('comment');

    table.foreign('svg_id').references('id').inTable('svg').onDelete('CASCADE');
    table.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE');
  })
);

export const down = (knex) => (
  knex.schema.dropTable('reviews_svg')
);
