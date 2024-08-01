export const up = (knex) => (
  knex.schema.createTable('orders', (table) => {
    table.increments('order_id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.decimal('total_price', 10, 2).notNullable();
    table.string('status').notNullable();
    table.string('yoo_payment_id').unique();

    table.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE');
  })
);

export const down = (knex) => (
  knex.schema.dropTable('orders')
);
