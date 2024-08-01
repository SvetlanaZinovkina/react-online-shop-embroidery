export const up = (knex) => (
  knex.schema.createTable('embroidery_translations', (table) => {
    table.integer('embroidery_id').unsigned().notNullable();
    table.string('language', 2).notNullable();
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.integer('category_id').unsigned().notNullable();

    table.primary(['embroidery_id', 'language']);
    table.foreign('embroidery_id').references('id').inTable('embroidery').onDelete('CASCADE');
    table.foreign('category_id').references('category_id').inTable('categories').onDelete('CASCADE');
  })
);

export const down = (knex) => (
  knex.schema.dropTable('embroidery_translations')
);
