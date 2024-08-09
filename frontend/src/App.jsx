import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import { Provider, useDispatch } from 'react-redux';
import AdminUploadPage from './components/AdminUploadPage.jsx';
import NotFound from './pages/NotFound.jsx';
import MainPage from './pages/HomePage.jsx';
import routes from './routes/routes.js';
import translationRU from './locales/ru.js';
import translationEN from './locales/en.js';
import store from './store/store.js';

const App = () => {
  const resources = {
    ru: { translation: translationRU },
    en: { translation: translationEN },
  };

  const options = {
    resources,
    lng: 'ru',
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  };

  const i18n = i18next.createInstance();
  i18n.use(initReactI18next).init(options);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Router>
          <Routes>
            <Route
              path={routes.uploadEmbroideryAdmin()}
              element={<AdminUploadPage />}
            />
            <Route path={routes.notFoundPage()} element={<NotFound />} />
            <Route path={routes.mainPage()} element={<MainPage />} />
          </Routes>
        </Router>
      </I18nextProvider>
    </Provider>
  );
};

export default App;
