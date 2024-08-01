export const up = (knex) => (
  knex.schema.createTable('embroidery_images', (table) => {
    table.increments('image_id').primary();
    table.integer('embroidery_id').unsigned().notNullable();
    table.string('image_path').notNullable();

    table.foreign('embroidery_id').references('id').inTable('embroidery').onDelete('CASCADE');
  })
);

export const down = (knex) => (
  knex.schema.dropTable('embroidery_images')
);
