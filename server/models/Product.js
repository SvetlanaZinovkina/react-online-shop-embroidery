import knex from '../knex.js';
import EmbroideryImage from './EmbroideryImage.js';

class Product {
		static async create({ name, description, price, filePath }) {
				return knex('products').insert({ name, description, price, file_path: filePath }).returning('*');
		}

		static async findById(productId) {
				const product = await knex('products').where({ product_id: productId }).first();
				if (product) {
						product.images = await EmbroideryImage.findByEmbroideryId(productId);
				}
				return product;
		}

		static async findAll() {
				const products = await knex('products').select('*');
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
