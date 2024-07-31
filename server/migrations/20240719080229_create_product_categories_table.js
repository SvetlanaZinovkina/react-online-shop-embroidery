export const up = (knex) => (
		knex.schema.createTable('product_categories', (table) => {
				table.integer('product_id').notNullable();
				table.integer('category_id').notNullable();
				table.primary(['product_id', 'category_id']);
				table.foreign('product_id').references('products.product_id').onDelete('CASCADE');;
				table.foreign('category_id').references('categories.category_id').onDelete('CASCADE');;
		})
);

export const down = (knex) => knex.schema.dropTable('product_categories');
