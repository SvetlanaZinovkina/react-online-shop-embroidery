export const up = (knex) => (
		knex.schema.createTable('embroidery_images', (table) => {
				table.increments('image_id').primary();
				table.integer('embroidery_id').notNullable();
				table.string('image_url', 255).notNullable();
				table.foreign('embroidery_id').references('products.product_id').onDelete('CASCADE');
		})
);

export const down = (knex) => knex.schema.dropTable('embroidery_images');
