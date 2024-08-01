import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import knex from '../knex.js';
import Embroidery from '../models/Embroidery.js';
import EmbroideryImage from '../models/EmbroideryImage.js';
import EmbroideryTranslation from '../models/EmbroideryTranslation.js';

export default async (req) => {
  await knex.transaction(async (trx) => {
    const parts = req.parts();
    let dirName;
    let translations;
    let file;
    let image;

    const __dirname = fileURLToPath(path.dirname(import.meta.url));
    const baseUploadDir = path.join(__dirname, '..', 'embroidery');

    for await (const part of parts) {
      if (part.file) {
        const fileName = part.filename;
        const filePath = path.join(baseUploadDir, dirName || '', fileName);

        // Create write stream
        const writeStream = fs.createWriteStream(filePath);
        part.file.pipe(writeStream);

        // Determine if the file is an image or ZIP archive
        if (fileName.endsWith('.zip')) {
          file = filePath;
        } else if (fileName.endsWith('.jpg') || fileName.endsWith('.png')) {
          image = filePath;
        }
      } else if (part.fieldname === 'dirName') {
        dirName = part.value;

        // Create directory if it doesn't exist
        const dirPath = path.join(baseUploadDir, dirName);
        await fs.promises.mkdir(dirPath, { recursive: true });
      } else if (part.fieldname === 'translations') {
        translations = part.value;
      }
    }

    if (!file || !translations) {
      throw new Error('Missing required fields');
    }

    // Insert embroidery record

    const embroidery = await Embroidery.create({
      filePath: file,
      isOnSale: false,
      salePrice: null,
      isNew: true,
    }, trx);

    const embroideryId = embroidery.id;
    const translationsData = JSON.parse(translations);

    // Insert translations
    for (const translation of translationsData) {
      await EmbroideryTranslation.create({
        embroideryId,
        language: translation.language,
        title: translation.title,
        description: translation.description,
        price: translation.price,
        categoryId: translation.category,
      }, trx);
    }

    // Insert image if exists
    if (image) {
      await EmbroideryImage.create({ embroideryId, imageUrl: image }, trx);
    }

    // Commit transaction
    await trx.commit();
  });
};
