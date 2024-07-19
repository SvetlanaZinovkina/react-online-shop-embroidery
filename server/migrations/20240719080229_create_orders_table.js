export const up = (knex) => (
		knex.schema.createTable('orders', (table) => {
				table.increments('order_id').primary();
				table.integer('user_id').notNullable();
				table.decimal('total_price', 10, 2).notNullable();
				table.string('status', 50).notNullable();
				table.timestamps(true, true);
				table.foreign('user_id').references('users.user_id');
		})
);

export const down = (knex) => knex.schema.dropTable('orders');
