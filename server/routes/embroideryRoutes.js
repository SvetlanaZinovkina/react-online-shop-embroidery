import knex from '../knex.js';
import Embroidery from '../models/Embroidery.js';
import processEmbroideryUpload from '../services/uploadEmbroidery.js';

export default (app) => {
  app.get('/api/v1/shop/popular-embroidery', async (req, reply) => {
    try {
      const { language } = req.query;
      const popularEmbroidery = await Embroidery.getPopularEmbroidery(language);
      reply.send(popularEmbroidery);
    } catch (err) {
      reply.status(500).send({ error: err.message });
    }
  });

  app.get('/api/v1/shop/embroidery/:id', async (req, reply) => {
    try {
      const { id } = req.params;
      const { language } = req.query;
      const embroidery = await Embroidery.findById(id, language);
      reply.send(embroidery);
    } catch (err) {
      reply.send(err);
    }
  });

  app.get('/api/v1/shop/embroidery', async (req, reply) => {
    try {
      const { page = 1, limit = 20, language = 'en' } = req.query;

      const result = await Embroidery.findAll(language, parseInt(page, 10), parseInt(limit, 10));

      reply.send(result);
    } catch (err) {
      reply.status(500).send({ error: `Ошибка: ${err.message}` });
    }
  });
  app.get('/api/v1/shop/category/:categoryId', async (req, reply) => {
    try {
      const { page = 1, limit = 20, language = 'en' } = req.query;
      const { categoryId } = req.params;

      const result = await Embroidery.findByCategory(language, categoryId, page, limit);

      reply.send(result);
    } catch (err) {
      reply.status(500).send(err);
    }
  });
  app.post('/api/v1/shop/embroidery', async (req, reply) => {
    try {
      await processEmbroideryUpload(req);
      reply.send({ success: true, message: 'Embroidery uploaded successfully' });
    } catch (err) {
      console.error('Error uploading embroidery:', err);
      reply.send({ success: false, message: 'Error uploading embroidery' });
    }
  });
};
