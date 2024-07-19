import knex from '../knex.js';

class EmbroideryImage {
		static async create({ embroideryId, imageUrl }) {
				return knex('EmbroideryImages').insert({ embroidery_id: embroideryId, image_url: imageUrl }).returning('*');
		}

		static async findByEmbroideryId(embroideryId) {
				return knex('EmbroideryImages').where({ embroidery_id: embroideryId }).select('*');
		}

		static async findAll() {
				return knex('EmbroideryImages').select('*');
		}
}

export default EmbroideryImage;
