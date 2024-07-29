import knex from '../knex.js';

export default (app) => {
	app.get('/api/v1/shop/popular-embroidery', async (req, reply) => {
		try {
			const popularEmbroidery = await knex('products').select('*').limit(10);
			reply.send(popularEmbroidery);
		} catch (err) {
			reply.send(err);
		}
	});

	app.get('/api/v1/shop/embroidery/:id', async (req, reply) => {
		try {
			const { id } = req.params;
			const embroidery = await knex('products').where('product_id', id).first();
			reply.send(embroidery);
		} catch (err) {
			reply.send(err);
		}
	});

	app.get('/api/v1/shop/embroidery', async (req, reply) => {
		try {
			const { page = 1, limit = 20 } = req.query;
			const offset = (page - 1) * limit;

			const embroideries = await knex('products')
				.select('*')
				.limit(limit)
				.offset(offset);

			const totalCount = await knex('products').count('* as count').first();

			reply.send({
				total: totalCount.count,
				page: parseInt(page, 10),
				limit: parseInt(limit, 10),
				data: embroideries,
			});
		} catch (err) {
			reply.status(500).send(err);
		}
	});
	app.get('/api/v1/shop/category/:categoryId', async (req, reply) => {
		try {
			const { page = 1, limit = 20 } = req.query;
			const offset = (page - 1) * limit;
			const { categoryId } = req.params;

			// Получаем вышивки для данной категории
			const embroideries = await knex('products')
				.join('product_categories', 'products.product_id', 'product_categories.product_id')
				.select('products.*')
				.where('product_categories.category_id', categoryId)
				.limit(limit)
				.offset(offset);

			// Получаем общее количество вышивок для данной категории
			const totalCount = await knex('products')
				.join('product_categories', 'products.product_id', 'product_categories.product_id')
				.where('product_categories.category_id', categoryId)
				.count('* as count')
				.first();

			reply.send({
				total: totalCount.count,
				page: parseInt(page, 10),
				limit: parseInt(limit, 10),
				data: embroideries,
			});
		} catch (err) {
			reply.status(500).send(err);
		}
	});
	app.get('/api/v1/shop/category', async (req, reply) => {
		try {
			const embroideriesCategory = await knex('categories').select('*');

			reply.send(embroideriesCategory);
		} catch (err) {
			reply.status(500).send(err);
		}
	});
	app.post('/api/v1/shop/embroidery', async (req, reply) => {
		const { title, description, price, category } = req.body;
		const file = req.files['file'][0];
		const image = req.files['image'][0];

		try {
			const [productId] = await knex('products').insert({
				name: title,
				description,
				price,
				file_path: file.path,
				created_at: knex.fn.now(),
				updated_at: knex.fn.now(),
			}).returning('product_id');

			await knex('product_images').insert({
				product_id: productId,
				image_path: image.path,
			});

			await knex('product_categories').insert({
				product_id: productId,
				category_id: category,
			});

			reply.send({ success: true, message: 'Embroidery uploaded successfully' });
		} catch (err) {
			console.error('Error uploading embroidery:', err);
			reply.send({ success: false, message: 'Error uploading embroidery' });
		}
	});
	app.post('/api/v1/shop/category', async (req, reply) => {
		const { category } = req.body;
		try {
			await knex('categories').insert({ name: category });
			reply.status(200).send({ success: true, message: 'Category uploaded successfully' });
		} catch (err) {
			console.error('Error uploading category:', err);
			reply.send({ success: false, message: 'Error uploading category' });
		}
	});
};
