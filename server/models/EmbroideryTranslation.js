import knex from '../knex.js';

class EmbroideryTranslation {
  static async create({
    embroideryId, language, title, description, price, categoryId,
  }, trx) {
    return trx('embroidery_translations').insert({
      embroidery_id: embroideryId,
      language,
      title,
      description,
      price,
      category_id: categoryId,
    });
  }

  static async findByEmbroideryId(embroideryId, language) {
    return knex('embroidery_translations')
      .where({ embroidery_id: embroideryId, language })
      .first();
  }

  // Добавьте другие методы по необходимости
}

export default EmbroideryTranslation;
