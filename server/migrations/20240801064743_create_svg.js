export const up = (knex) => (
  knex.schema.createTable('svg', (table) => {
    table.increments('id').primary();
    table.string('file_path').notNullable();
    table.boolean('is_on_sale').defaultTo(false);
    table.decimal('sale_price', 10, 2);
    table.boolean('is_new').defaultTo(true);
  })
);

export const down = (knex) => (
  knex.schema.dropTable('svg')
);
