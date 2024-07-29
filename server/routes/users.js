import bcrypt from 'bcrypt';
import knex from '../knex.js';

export default (app) => {
	app.post('/api/v1/signup', async (req, reply) => {
		const { username, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);

		try {
			const [newUser] = await knex('users')
				.insert({
					username,
					email,
					password_hash: hashedPassword,
				})
				.returning('*');  // Получение ID нового пользователя

			// const { id: userId } = newUser;
			const token = app.jwt.sign({ user: newUser });
			reply.send({ token, message: 'User registered successfully' });
		} catch (err) {
			reply.status(500).send({ error: 'Registration failed', details: err.message });
		}
	});
	app.post('/api/v1/login', async (req, reply) => {
		const { email, password } = req.body;
		try {
			const user = await knex('users').where({ email }).first();
			if (user && await bcrypt.compare(password, user.password_hash)) {
				const token = app.jwt.sign({ user });
				reply.send({ token });
			} else {
				reply.status(401).send({ error: 'Invalid email or password' });
			}
		} catch (err) {
			reply.status(500).send({ error: 'Login failed', details: err.message });
		}
	});
	app.get('/api/v1/purchases', { preValidation: [app.authenticate] }, async (req, reply) => {
		const userId = req.user.user_id;
		try {
			const purchases = await knex('downloads')
				.join('products', 'downloads.product_id', 'products.product_id')
				.where('downloads.user_id', userId)
				.select('products.*');
			reply.send(purchases);
		} catch (err) {
			reply.status(500).send({ error: 'Failed to fetch purchases', details: err.message });
		}
	});
	app.get('/api/v1/user', { preValidation: [app.authenticate] }, async (req, reply) => {
		const userId = req.user.user_id;
		try {
			const userData = await knex('users')
				.where('user_id', userId)
				.select('*');
			reply.send(userData);
		} catch (err) {
			reply.status(500).send({ error: 'Failed to fetch purchases', details: err.message });
		}
	});

};

