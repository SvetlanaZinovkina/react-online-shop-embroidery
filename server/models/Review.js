import knex from '../knex.js';

class Review {
		static async create({ productId, userId, rating, comment }) {
				return knex('Reviews').insert({ product_id: productId, user_id: userId, rating, comment }).returning('*');
		}

		static async findByProductId(productId) {
				return knex('Reviews').where({ product_id: productId }).select('*');
		}
}

export default Review;
