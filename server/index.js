import Fastify from 'fastify';
import fastifyFormbody from '@fastify/formbody';
import fastifyCors from '@fastify/cors';
// import fastifyPassport from '@fastify/passport';
import fastifySensible from '@fastify/sensible';
import fastifyMethodOverride from 'fastify-method-override';
import fastifyMultipart from 'fastify-multipart';
import fastifyStatic from '@fastify/static';
import fastifyJwt from '@fastify/jwt';
import fastifyAuth from '@fastify/auth';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import routes from './routes/index.js';

const __dirname = fileURLToPath(path.dirname(import.meta.url));
const imagesDir = path.join(__dirname, 'embroidery');
dotenv.config();
const mode = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5001;

const addHooks = (app) => {
  app.addHook('preHandler', async (req, reply) => {
    reply.locals = {
      isAuthenticated: () => req.isAuthenticated(),
    };
  });
};

const fastify = Fastify({
  logger: true,
});
fastify.register(fastifySensible);
fastify.register(fastifyFormbody);
fastify.register(fastifyMultipart);
fastify.register(fastifyCors, {
  origin: true, // Разрешает все источники, можно указать конкретные домены, если нужно
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешенные методы
  allowedHeaders: ['Authorization', 'Content-Type'], // Разрешенные заголовки
});
fastify.register(fastifyStatic, {
  root: imagesDir, // Укажите путь к директории с изображениями
  prefix: '/embroidery/', // Префикс URL для доступа к изображениям
});

fastify.register(fastifyAuth);

fastify.decorate('authenticate', async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

routes(fastify);

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
