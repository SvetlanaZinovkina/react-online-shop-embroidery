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
        .returning('*'); // Получение ID нового пользователя

      // const { id: userId } = newUser;
      const token = app.jwt.sign({ user: newUser });
      reply.send({ token, message: 'User registered successfully' });
    } catch (err) {
      reply
        .status(500)
        .send({ error: 'Registration failed', details: err.message });
    }
  });
  app.post('/api/v1/login', async (req, reply) => {
    const { email, password } = req.body;
    try {
      const user = await knex('users').where({ email }).first();
      if (user && (await bcrypt.compare(password, user.password_hash))) {
        const token = app.jwt.sign({ user });
        reply.send({ token });
      } else {
        reply.status(401).send({ error: 'Invalid email or password' });
      }
    } catch (err) {
      reply.status(500).send({ error: 'Login failed', details: err.message });
    }
  });
  app.get(
    '/api/v1/purchases',
    { preValidation: [app.authenticate] },
    async (req, reply) => {
      const userId = req.user.user_id;
      try {
        const purchases = await knex('downloads')
          .join('products', 'downloads.product_id', 'products.product_id')
          .where('downloads.user_id', userId)
          .select('products.*');
        reply.send(purchases);
      } catch (err) {
        reply
          .status(500)
          .send({ error: 'Failed to fetch purchases', details: err.message });
      }
    },
  );
  app.get(
    '/api/v1/user',
    { preValidation: [app.authenticate] },
    async (req, reply) => {
      const userId = req.user.user_id;
      try {
        const userData = await knex('users')
          .select('*')
          .where('user_id', userId)
          .first();
        reply.send(userData);
      } catch (err) {
        reply
          .status(500)
          .send({ error: 'Failed to fetch purchases', details: err.message });
      }
    },
  );
  app.put(
    '/api/v1/user/username',
    { preValidation: [app.authenticate] },
    async (req, reply) => {
      const userId = req.user.user_id;
      const { username } = req.body;
      try {
        await knex('users').where('user_id', userId).update({ username });
        reply.send({ sucess: true });
      } catch (err) {
        reply
          .status(500)
          .send({ error: 'Failed to update username', details: err.message });
      }
    },
  );
  app.put(
    '/api/v1/user/email',
    { preValidation: [app.authenticate] },
    async (req, reply) => {
      const userId = req.user.user_id;
      const { email } = req.body;
      try {
        await knex('users').where('user_id', userId).update({ email });
        reply.send({ sucess: true });
      } catch (err) {
        reply
          .status(500)
          .send({ error: 'Failed to update email', details: err.message });
      }
    },
  );
  app.put(
    '/api/v1/user/password',
    { preValidation: [app.authenticate] },
    async (req, reply) => {
      const userId = req.user.user_id;
      const { oldPassword, newPassword } = req.body;

      try {
        const password = await knex('users')
          .select('password_hash')
          .where('user_id', userId);
        const isMatch = await bcrypt.compare(oldPassword, password);

        if (!isMatch) reply.status(400).send({ error: "Old pasword isn't correct" });

        const newHashedPassword = await bcrypt.hash(newPassword, 5);
        await knex('users')
          .where('user_id', userId)
          .update({ password_hash: newHashedPassword });

        reply.send({ sucess: true });
      } catch (err) {
        reply
          .status(500)
          .send({ error: 'Failed to update passwword', details: err.message });
      }
    },
  );
};
