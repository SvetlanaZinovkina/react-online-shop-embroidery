import main from './main.js';
import embroidery from './embroidery.js';
import users from './users.js';


const controllers = [
		main,
		embroidery,
		users,
];

export default (app) => controllers.forEach((f) => f(app));
