export const up = (knex) => (
		knex.schema.createTable('order_items', (table) => {
				table.increments('order_item_id').primary();
				table.integer('order_id').notNullable();
				table.integer('product_id').notNullable();
				table.integer('quantity').notNullable();
				table.decimal('price', 10, 2).notNullable();
				table.foreign('order_id').references('orders.order_id');
				table.foreign('product_id').references('products.product_id');
		})
);

export const down = (knex) => knex.schema.dropTable('order_items');
