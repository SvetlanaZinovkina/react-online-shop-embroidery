import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';
import routes from '../routes/routes.js';

const Header = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <header className="hero-section">
      {children}
      <div className="overlay">
        <h1>{t('mainPage.welcome')}</h1>
        <Button variant="light">{t('mainPage.catalog')}</Button>
      </div>
    </header>
  );
};

export default Header;
