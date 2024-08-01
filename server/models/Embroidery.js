import knex from '../knex.js';
import EmbroideryImage from './EmbroideryImage.js';

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

  static async getPopularEmbroidery(limit = 10) {
    try {
      return await knex('reviews_embroidery')
        .join('embroidery', 'reviews_embroidery.embroidery_id', 'embroidery.id')
        .select('embroidery.*')
        .avg('reviews_embroidery.rating as avg_rating')
        .count('reviews_embroidery.review_id as review_count')
        .groupBy('embroidery.id')
        .orderBy('avg_rating', 'desc')
        .limit(limit);
    } catch (err) {
      throw new Error(`Error fetching popular embroidery: ${err.message}`);
    }
  }

  // static async findAll() {
  //   const embroideries = await knex('embroidery').select('*');
  //   for (const embroidery of embroideries) {
  // 	    embroidery.images = await EmbroideryImage.findByEmbroideryId(embroidery.embroidery_id);
  //   }
  //   return embroideries;
  // }

  static async addImage(productId, imageUrl) {
    return EmbroideryImage.create({ embroideryId: productId, imageUrl });
  }
}

export default Embroidery;
