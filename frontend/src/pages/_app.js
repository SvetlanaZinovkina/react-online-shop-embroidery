import { Provider } from 'react-redux';
import { appWithTranslation } from 'next-i18next';
import store from '../store/store.js';
import '../styles/globals.scss';
import '../config/i18n.js';
// import nextI18NextConfig from '../../next-i18next.config.js';

const MyApp = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);

export default appWithTranslation(MyApp);
