export const up = (knex) => (
  knex.schema.createTable('svg_images', (table) => {
    table.increments('image_id').primary();
    table.integer('svg_id').unsigned().notNullable();
    table.string('image_path').notNullable();

    table.foreign('svg_id').references('id').inTable('svg').onDelete('CASCADE');
  })
);

export const down = (knex) => (
  knex.schema.dropTable('svg_images')
);
