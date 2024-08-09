import Category from '../models/Category.js';
import knex from '../knex.js';

export default (app) => {
  app.get('/api/v1/shop/category', async (req, reply) => {
    const { language = 'en' } = req.query;
    try {
      const categories = await Category.findAll(language);
      reply.send(categories);
    } catch (err) {
      reply.status(500).send({ error: 'Ошибка получения категорий', message: err.message });
    }
  });
  app.post('/api/v1/shop/category', async (req, reply) => {
    const { name, language = 'en' } = req.body;
    try {
      await Category.create(name, language);
      reply.status(200).send({ success: true, message: 'Category uploaded successfully' });
    } catch (err) {
      console.error('Error uploading category:', err);
      reply.send({ success: false, message: 'Error uploading category' });
    }
  });
};
