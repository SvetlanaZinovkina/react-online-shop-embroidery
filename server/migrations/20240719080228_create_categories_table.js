export const up = (knex) => (
		knex.schema.createTable('categories', (table) => {
				table.increments('category_id').primary();
				table.string('name', 50).notNullable().unique();
		})
);

export const down = (knex) => knex.schema.dropTable('categories');
