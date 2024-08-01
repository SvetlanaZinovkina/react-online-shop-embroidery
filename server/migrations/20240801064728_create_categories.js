export const up = (knex) => (
  knex.schema.createTable('categories', (table) => {
    table.increments('category_id').primary();
    table.timestamps(true, true); // created_at и updated_at
  })
);

export const down = (knex) => (
  knex.schema.dropTable('categories')
);
