import path from 'path';
import pump from 'pump';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';
import fs from 'fs';
import knex from '../knex.js';
import Embroidery from '../models/Embroidery.js';
import processEmbroideryUpload from '../services/uploadEmbroidery.js';

export default (app) => {
  app.get('/api/v1/shop/popular-embroidery', async (req, reply) => {
    try {
      const popularEmbroidery = await Embroidery.getPopularEmbroidery();
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
    try {
      await processEmbroideryUpload(req);
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
