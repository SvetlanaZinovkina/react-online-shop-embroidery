import knex from '../knex.js';

export default (app) => {
		app.get('/', { name: 'root' }, async (req, reply) => {
				try {
						const popularEmbroidery = await knex('products').select('*').limit(10);
						reply.send(popularEmbroidery);
				} catch (err) {
						reply.send(err);
				}
		});

		app.get('/protected', { name: 'protected', preValidation: app.authenticate }, async (req, reply) => {
				try {
						// const user = req.user; // предполагаем, что информация о пользователе добавлена в запрос после аутентификации
						const popularEmbroidery = await knex('products').select('*').limit(10);
						reply.send({ popularEmbroidery });
				} catch (err) {
						reply.send(err);
				}
		});
};
