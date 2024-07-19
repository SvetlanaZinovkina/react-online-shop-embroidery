import knex from '../knex.js';

class Download {
		static async create({ userId, productId }) {
				return knex('Downloads').insert({ user_id: userId, product_id: productId }).returning('*');
		}

		static async findByUserId(userId) {
				return knex('Downloads').where({ user_id: userId }).select('*');
		}
}

export default Download;
