export const up = (knex) => (
  knex.schema.createTable('order_items', (table) => {
    table.increments('order_item_id').primary();
    table.integer('order_id').unsigned().notNullable();
    table.integer('product_id').unsigned().notNullable();
    table.string('product_type').notNullable(); // 'embroidery' или 'svg'
    table.integer('quantity').notNullable();
    table.decimal('price', 10, 2).notNullable();

    table.foreign('order_id').references('order_id').inTable('orders').onDelete('CASCADE');
  })
);

export const down = (knex) => (
  knex.schema.dropTable('order_items')
);
