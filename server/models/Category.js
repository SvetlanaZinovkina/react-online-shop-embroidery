import knex from '../knex.js';

class Category {
  static async create(name, language) {
    try {
      const [categoryId] = await knex('categories').insert({}).returning('category_id as id');
      const { id } = categoryId;
      await knex('category_translations').insert({
        category_id: id,
        language,
        name,
      });

      return { success: true, message: 'Категория успешно добавлена' };
    } catch (err) {
      throw new Error(`Ошибка при добавлении категории: ${err.message}`);
    }
  }

  static async findAll(language) {
    try {
      return await knex('categories')
        .join('category_translations', 'categories.category_id', 'category_translations.category_id')
        .select('categories.category_id', 'category_translations.name')
        .where('category_translations.language', language);
    } catch (err) {
      throw new Error(`Ошибка получения категорий: ${err.message}`);
    }
  }
}

export default Category;
