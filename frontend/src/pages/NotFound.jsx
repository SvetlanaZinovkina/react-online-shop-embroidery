import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-bootstrap';
import notFoundImage from '../images/notFoundImage.jpg';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 position-relative bg-dark">
      <Image
        alt={t('notFound.notPage')}
        src={notFoundImage}
        className="position-absolute w-100 h-100 object-fit-cover"
        style={{ zIndex: -1, opacity: 0.7 }}
      />
      <div className="text-center text-white p-3" style={{ zIndex: 1 }}>
        <h1 className="display-1 fw-bold">404</h1>
        <h4 className="mb-3">{t('notFound.notPage')}</h4>
        <p className="lead">
          {t('notFound.mainLink')}{' '}
          <a href="/" className="text-info text-decoration-none fw-semibold">
            {t('notFound.textMuted')}
          </a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
