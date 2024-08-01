export const up = (knex) => (
  knex.schema.createTable('svg_translations', (table) => {
    table.integer('svg_id').unsigned().notNullable();
    table.string('language', 2).notNullable();
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.integer('category_id').unsigned().notNullable();

    table.primary(['svg_id', 'language']);
    table.foreign('svg_id').references('id').inTable('svg').onDelete('CASCADE');
    table.foreign('category_id').references('category_id').inTable('categories').onDelete('CASCADE');
  })
);

export const down = (knex) => (
  knex.schema.dropTable('svg_translations')
);
