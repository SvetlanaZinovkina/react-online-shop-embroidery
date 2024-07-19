export const up = (knex) => (
		knex.schema.createTable('downloads', (table) => {
				table.increments('download_id').primary();
				table.integer('user_id').notNullable();
				table.integer('product_id').notNullable();
				table.timestamp('download_timestamp').defaultTo(knex.fn.now());
				table.foreign('user_id').references('users.user_id');
				table.foreign('product_id').references('products.product_id');

		})
);

export const down = (knex) => knex.schema.dropTable('downloads');
