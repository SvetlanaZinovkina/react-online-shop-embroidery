import knex from '../knex.js';

class Order {
		static async create({ userId, totalPrice, status }) {
				return knex('Orders').insert({ user_id: userId, total_price: totalPrice, status }).returning('*');
		}

		static async findById(orderId) {
				return knex('Orders').where({ order_id: orderId }).first();
		}

		static async findAll() {
				return knex('Orders').select('*');
		}
}

export default Order;
