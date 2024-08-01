export const up = (knex) => (
  knex.schema.createTable('embroidery', (table) => {
    table.increments('id').primary();
    table.string('file_path').notNullable();
    table.boolean('is_on_sale').defaultTo(false);
    table.decimal('sale_price', 10, 2);
    table.boolean('is_new').defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now()).alter();
  })
);

export const down = (knex) => (
  knex.schema.dropTable('embroidery')
);
