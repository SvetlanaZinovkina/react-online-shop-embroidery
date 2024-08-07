import knex from '../knex.js';

export default (app) => {
  app.get('/api/v1/', async (req, reply) => {
    try {
      reply.send('neijij');
    } catch (err) {
      reply.send(err);
    }
  });
};
