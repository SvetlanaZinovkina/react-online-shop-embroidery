import knex from '../knex.js';

class OrderItem {
		static async create({ orderId, productId, quantity, price }) {
				return knex('OrderItems').insert({ order_id: orderId, product_id: productId, quantity, price }).returning('*');
		}

		static async findByOrderId(orderId) {
				return knex('OrderItems').where({ order_id: orderId }).select('*');
		}
}

export default OrderItem;
