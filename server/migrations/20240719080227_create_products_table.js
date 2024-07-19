export const up = (knex) => (
		knex.schema.createTable('products', (table) => {
				table.increments('product_id').primary();
				table.string('name', 100).notNullable();
				table.text('description');
				table.decimal('price', 10, 2).notNullable();
				table.string('file_path', 255).notNullable();
				table.timestamps(true, true);
		})
);

export const down = (knex) => knex.schema.dropTable('products');
