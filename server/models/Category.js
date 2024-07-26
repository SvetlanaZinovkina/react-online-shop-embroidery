import knex from '../knex.js';

class Category {
		static async create({ name, description }) {
				return knex('categories').insert({ name, description }).returning('*');
		}

		static async findById(categoryId) {
				return knex('categories').where({ category_id: categoryId }).first();
		}

		static async findAll() {
				return knex('categories').select('*');
		}
}

export default Category;
