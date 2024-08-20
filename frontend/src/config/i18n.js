// src/config/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import nextI18NextConfig from '../../next-i18next.config';
import translationRU from '../../public/locales/ru/common.json';
import translationEN from '../../public/locales/en/common.json';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: nextI18NextConfig.i18n.defaultLocale,
    lng: nextI18NextConfig.i18n.defaultLocale,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: translationEN,
      },
      ru: {
        translation: translationRU,
      },
    },
  });

export default i18n;
