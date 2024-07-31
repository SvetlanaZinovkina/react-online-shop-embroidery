import path from 'path';
import pump from 'pump';
import { fileURLToPath } from 'url';
import fs from 'fs';
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
    const {
      title, description, price, category,
    } = req.body;
    const { file } = req.body;
    const { image } = req.body;
    const __dirname = fileURLToPath(path.dirname(import.meta.url));

    try {
      // Начинаем транзакцию
      await knex.transaction(async (trx) => {
        // Проверка на наличие всех необходимых данных и файлов
        if (!title || !description || !price || !category || !file || !image) {
          throw new Error('Missing required fields');
        }

        // Определяем пути для сохранения файлов
        const uploadDir = path.join(__dirname, '..', 'embroidery', `${title.value}`);
        await fs.promises.mkdir(uploadDir, { recursive: true }); // Создаем директорию, если она не существует

        const filePath = path.join(uploadDir, file.filename);
        const imagePath = path.join(uploadDir, image.filename);

        // Чтение и запись файлов
        // await pump(file.file, fs.createWriteStream(filePath));
        // await pump(image.file, fs.createWriteStream(imagePath));
        try {
          await new Promise((resolve, reject) => {
            pump(file.file, fs.createWriteStream(filePath), (err) => {
              if (err) return reject(err);
              resolve();
            });
          });

          await new Promise((resolve, reject) => {
            pump(image.file, fs.createWriteStream(imagePath), (err) => {
              if (err) return reject(err);
              resolve();
            });
          });
        } catch (err) {
          throw new Error(`Failed to save files: ${err.message}`);
        }
        // Вставка данных о продукте в таблицу products
        const [productId] = await trx('products').insert({
          name: title.value,
          description: description.value,
          price: price.value,
          file_path: filePath,
          created_at: trx.fn.now(),
          updated_at: trx.fn.now(),
        }).returning('product_id');

        const id = productId.product_id;
        // Вставка данных об изображении в таблицу embroidery_images
        await trx('embroidery_images').insert({
          embroidery_id: id,
          image_path: imagePath,
        });

        // Вставка данных о категории в таблицу product_categories
        await trx('product_categories').insert({
          product_id: id,
          category_id: category.value,
        });

        // Фиксируем транзакцию
        await trx.commit();
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
