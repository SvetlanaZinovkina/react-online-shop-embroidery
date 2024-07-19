export const up = (knex) => (
		knex.schema.createTable('reviews', (table) => {
				table.increments('review_id').primary();
				table.integer('product_id').notNullable();
				table.integer('user_id').notNullable();
				table.integer('rating').notNullable().checkBetween([1, 5]);
				table.text('comment');
				table.timestamps(true, true);
				table.foreign('product_id').references('products.product_id');
				table.foreign('user_id').references('users.user_id');
		})
);

export const down = (knex) => knex.schema.dropTable('reviews');
