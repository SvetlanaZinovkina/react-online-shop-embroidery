import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import routes from '../routes/routes.js';

const Header = ({ children }) => {
  const { t } = useTranslation();

  return (
    <header className="hero-section">
      {children}
      <div className="overlay">
        <h1>{t('mainPage.welcome')}</h1>
        <Button variant="light" href={routes.shopPage()}>
          {t('mainPage.catalog')}
        </Button>
      </div>
    </header>
  );
};

export default Header;
