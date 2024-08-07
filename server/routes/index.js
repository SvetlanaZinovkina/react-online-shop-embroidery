import main from './main.js';
import embroidery from './embroideryRoutes.js';
import category from './categoriesRoutes.js';
import users from './users.js';

const controllers = [
  main,
  embroidery,
  users,
  category,
];

export default (app) => controllers.forEach((f) => f(app));
