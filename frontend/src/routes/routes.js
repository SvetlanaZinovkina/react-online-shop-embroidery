const routes = {
  defaultApiPath: () => '/api/v1',
  notFoundPage: () => '*',
  mainPage: () => '/',
  loginPage: () => '/login',
  signUpPage: () => '/signup',
  cart: () => '/cart',
  catalogPath: () => '/catalog',
  getEmbroidery: (id) => `/catalog/${id}`,
  getUserData: (userId) => `/user/${userId}`,
  editUserData: (userId) => `/user/${userId}/edit`,
  uploadEmbroidery: () => '/upload',
  editEmbroidery: (id) => `/edit/${id}`,
  discount: () => '/discount',
};

export default routes;
