import knex from '../knex.js';
import EmbroideryImage from './EmbroideryImage.js';

class Product {
		static async create({ name, description, price, filePath }) {
				return knex('Products').insert({ name, description, price, file_path: filePath }).returning('*');
		}

		static async findById(productId) {
				const product = await knex('Products').where({ product_id: productId }).first();
				if (product) {
						product.images = await EmbroideryImage.findByEmbroideryId(productId);
				}
				return product;
		}

		static async findAll() {
				const products = await knex('Products').select('*');
				for (const product of products) {
						product.images = await EmbroideryImage.findByEmbroideryId(product.product_id);
				}
				return products;
		}

		static async addImage(productId, imageUrl) {
				return EmbroideryImage.create({ embroideryId: productId, imageUrl });
		}
}

export default Product;
