import * as path from 'path';

const nextI18NextConfig = {
  i18n: {
    defaultLocale: 'ru',
    locales: ['en', 'ru'],
  },
  localePath: path.resolve('./public/locales'),
};

export default nextI18NextConfig;
