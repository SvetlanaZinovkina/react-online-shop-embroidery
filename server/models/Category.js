import knex from '../knex.js';

class Category {
		static async create({ name, description }) {
				return knex('Categories').insert({ name, description }).returning('*');
		}

		static async findById(categoryId) {
				return knex('Categories').where({ category_id: categoryId }).first();
		}

		static async findAll() {
				return knex('Categories').select('*');
		}
}

export default Category;
