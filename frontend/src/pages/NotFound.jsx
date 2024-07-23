import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-bootstrap';
import notFoundImage from '../images/notFoundImage.jpg';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 position-relative">
      <Image
        alt={t('notFound.notPage')}
        src={notFoundImage}
        className="position-absolute w-100 h-100 object-fit-cover"
      />

      <div className="position-absolute text-center text-white">
        <h1>404</h1>
        <h4>{t('notFound.notPage')}</h4>
        <p>
          {t('notFound.mainLink')}
          <a href="/" className="text-info">
            {t('notFound.textMuted')}
          </a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
