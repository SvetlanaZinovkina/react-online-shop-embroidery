export const up = (knex) => (
  knex.schema.createTable('category_translations', (table) => {
    table.integer('category_id').unsigned().notNullable();
    table.string('language', 2).notNullable(); // Код языка (например, 'ru', 'en')
    table.string('name').notNullable();
    table.primary(['category_id', 'language']);

    table.foreign('category_id').references('category_id').inTable('categories').onDelete('CASCADE');
  })
);

export const down = (knex) => (
  knex.schema.dropTable('category_translations')
);
