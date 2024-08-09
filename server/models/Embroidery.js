import knex from '../knex.js';

class Embroidery {
  static async create({
    filePath, isOnSale, salePrice, isNew,
  }, trx) {
    const [embroideryId] = await trx('embroidery').insert({
      file_path: filePath,
      is_on_sale: isOnSale,
      sale_price: salePrice,
      is_new: isNew,
    }).returning('id');
    return embroideryId;
  }

  static async findById(id, language = 'en') {
    return knex('embroidery')
      .leftJoin('embroidery_images', 'embroidery.id', 'embroidery_images.embroidery_id')
      .leftJoin('embroidery_translations', function () {
        this.on('embroidery.id', '=', 'embroidery_translations.embroidery_id')
          .andOn('embroidery_translations.language', '=', knex.raw('?', [language]));
      })
      .leftJoin('reviews_embroidery', 'embroidery.id', 'reviews_embroidery.embroidery_id')
      .select(
        'embroidery.id',
        'embroidery.file_path',
        'embroidery.is_on_sale',
        'embroidery.sale_price',
        'embroidery.is_new',
        'embroidery_images.image_path',
        'embroidery_translations.title',
        'embroidery_translations.description',
        'embroidery_translations.price',
        knex.raw('AVG(reviews_embroidery.rating) as average_rating'),
      )
      .where('embroidery.id', id)
      .groupBy(
        'embroidery.id',
        'embroidery.file_path',
        'embroidery.is_on_sale',
        'embroidery.sale_price',
        'embroidery.is_new',
        'embroidery_images.image_path',
        'embroidery_translations.title',
        'embroidery_translations.description',
        'embroidery_translations.price',
      )
      .first()
      .then(async (embroidery) => {
        if (embroidery) {
          // Get reviews separately to handle multiple reviews
          const reviews = await knex('reviews_embroidery')
            .select('rating', 'comment')
            .where('embroidery_id', id);

          embroidery.reviews = reviews;
        }

        return embroidery;
      });
  }

  static async getPopularEmbroidery(language = 'en', limit = 10) {
    try {
      return await knex('embroidery')
        .leftJoin('reviews_embroidery', 'embroidery.id', 'reviews_embroidery.embroidery_id')
        .join('embroidery_translations', function () {
          this.on('embroidery.id', 'embroidery_translations.embroidery_id')
            .andOn('embroidery_translations.language', '=', knex.raw('?', [language]));
        })
        .join('embroidery_images', 'embroidery.id', 'embroidery_images.embroidery_id')
        .select(
          'embroidery.id',
          'embroidery_images.image_path as image',
          'embroidery_translations.price',
          'embroidery_translations.title',
          'embroidery.is_on_sale',
          'embroidery.sale_price',
          knex.raw('COALESCE(AVG(reviews_embroidery.rating), 0) as avg_rating'),
          knex.raw('COALESCE(COUNT(reviews_embroidery.review_id), 0) as review_count'),
        )
        .groupBy(
          'embroidery.id',
          'embroidery_images.image_path',
          'embroidery_translations.price',
          'embroidery_translations.title',
          'embroidery.is_on_sale',
          'embroidery.sale_price',
        )
        .orderBy('avg_rating', 'desc')
        .limit(limit);
    } catch (err) {
      throw new Error(`Error fetching popular embroidery: ${err.message}`);
    }
  }

  static async findAll(language = 'en', page = 1, limit = 20) {
    try {
      // Рассчитать смещение для пагинации
      const offset = (page - 1) * limit;

      // Получить вышивки с пагинацией
      const embroideries = await knex('embroidery')
        .join('embroidery_translations', function () {
          this.on('embroidery.id', 'embroidery_translations.embroidery_id')
            .andOn('embroidery_translations.language', '=', language);
        })
        .select(
          'embroidery.id',
          'embroidery.file_path',
          'embroidery.is_on_sale',
          'embroidery.sale_price',
          'embroidery.is_new',
          'embroidery_translations.title',
          'embroidery_translations.price',
        )
        .limit(limit)
        .offset(offset);

      // Получить изображения для каждой вышивки
      for (const embroidery of embroideries) {
        embroidery.images = await knex('embroidery_images')
          .where('embroidery_id', embroidery.id)
          .select('image_path');
      }

      // Получить общее количество вышивок для пагинации
      const totalCount = await knex('embroidery')
        .count('* as count')
        .join('embroidery_translations', function () {
          this.on('embroidery.id', 'embroidery_translations.embroidery_id')
            .andOn('embroidery_translations.language', '=', language);
        })
        .first();

      return {
        total: totalCount.count,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        data: embroideries,
      };
    } catch (err) {
      throw new Error(`Ошибка получения вышивок: ${err.message}`);
    }
  }

  static async findByCategory(language = 'en', categoryId, page = 1, limit = 20) {
    try {
      // Рассчитать смещение для пагинации
      const offset = (page - 1) * limit;

      // Получить вышивки для данной категории с пагинацией
      const embroideries = await knex('embroidery')
        .join('embroidery_translations', function () {
          this.on('embroidery.id', 'embroidery_translations.embroidery_id')
            .andOn('embroidery_translations.language', '=', language);
        })
        .join('product_categories', 'embroidery.id', 'product_categories.embroidery_id')
        .select(
          'embroidery.id',
          'embroidery.file_path',
          'embroidery.is_on_sale',
          'embroidery.sale_price',
          'embroidery.is_new',
          'embroidery_translations.title',
          'embroidery_translations.price',
        )
        .where('product_categories.category_id', categoryId)
        .limit(limit)
        .offset(offset);

      // Получить общее количество вышивок для данной категории
      const totalCount = await knex('embroidery')
        .join('embroidery_translations', function () {
          this.on('embroidery.id', 'embroidery_translations.embroidery_id')
            .andOn('embroidery_translations.language', '=', language);
        })
        .join('product_categories', 'embroidery.id', 'product_categories.embroidery_id')
        .where('product_categories.category_id', categoryId)
        .count('* as count')
        .first();

      // Получить изображения для каждой вышивки
      for (const embroidery of embroideries) {
        embroidery.images = await knex('embroidery_images')
          .where('embroidery_id', embroidery.id)
          .select('image_path');
      }

      return {
        total: totalCount.count,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        data: embroideries,
      };
    } catch (err) {
      throw new Error(`Ошибка получения вышивок по категории: ${err.message}`);
    }
  }
}

export default Embroidery;
