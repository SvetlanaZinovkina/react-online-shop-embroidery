import Fastify from 'fastify';
import fastifyFormbody from '@fastify/formbody';
// import fastifyPassport from '@fastify/passport';
import fastifySensible from '@fastify/sensible';
import fastifyMethodOverride from 'fastify-method-override';
// import fastifyObjectionjs from 'fastify-objectionjs';
import fastifyStatic from '@fastify/static';
import fastifyJwt from '@fastify/jwt';
import fastifyAuth from '@fastify/auth';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import routes from './routes/index.js';

const __dirname = fileURLToPath(path.dirname(import.meta.url));
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
		logger: true
})
fastify.register(fastifySensible);
// fastify.register(fastifyFormbody, { parser: qs.parse });
// await fastify.register(fastifyMethodOverride);
// fastify.register(fastifyObjectionjs, {
// 		knexConfig: knexConfig[mode],
// 		models,
// });
fastify.register(fastifyStatic, {
		root: path.join(__dirname, '../frontend/build'),
		prefix: '/',
});

fastify.register(fastifyJwt, {
		secret: process.env.JWT_SECRET,
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
				await fastify.listen({ port: PORT })
		} catch (err) {
				fastify.log.error(err)
				process.exit(1)
		}
}
start();
