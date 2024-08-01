export const up = (knex) => (
  knex.schema.createTable('downloads', (table) => {
    table.increments('download_id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.integer('product_id').unsigned().notNullable();
    table.string('product_type').notNullable();

    table.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE');
  })
);

export const down = (knex) => (
  knex.schema.dropTable('downloads')
);
