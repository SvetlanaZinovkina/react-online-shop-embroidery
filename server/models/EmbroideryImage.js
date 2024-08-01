import knex from '../knex.js';

class EmbroideryImage {
  static async create({ embroideryId, imageUrl }, trx) {
    return trx('embroidery_images').insert({
      embroidery_id: embroideryId,
      image_path: imageUrl,
    });
  }

  static async findByEmbroideryId(embroideryId) {
    return knex('embroidery_images').where({ embroidery_id: embroideryId }).select('*');
  }

  static async findAll() {
    return knex('embroidery_images').select('*');
  }
}

export default EmbroideryImage;
