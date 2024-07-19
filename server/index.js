import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifySecureSession from '@fastify/secure-session';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import routes from './routes/index.js';

const __dirname = fileURLToPath(path.dirname(import.meta.url));
dotenv.config();
const mode = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

const fastify = Fastify({
		logger: true
})

fastify.register(fastifyStatic, {
		root: path.join(__dirname, '../frontend/build'),
		prefix: '/',
});

// fastify.register(fastifySecureSession, {
// 		secret: process.env.SESSION_KEY,
// 		cookie: {
// 				path: '/',
// 		},
// });

routes(fastify);

const start = async () => {
		try {
				await fastify.listen({ port: PORT })
		} catch (err) {
				fastify.log.error(err)
				process.exit(1)
		}
}
start()
