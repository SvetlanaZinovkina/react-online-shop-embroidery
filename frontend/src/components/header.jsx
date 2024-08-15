import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Image, Container,
} from 'react-bootstrap';
import routes from '../routes/routes.js';
import { useGetPopularEmbroideryQuery } from '../store/api.js';
import nike from '../images/bear.gif';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="hero-section">
      <Container fluid>
        <section className="left-side">
          <h1>{t('mainPage.welcome')}</h1>
          <Button variant="light" href={routes.shopPage()}>
            {t('mainPage.catalog')}
          </Button>
        </section>
        <section className="d-flex">
          <Image
            src={nike}
            alt={t('navBar.nameShop')}
            height="450"
            className="mb-2"
          />
        </section>
      </Container>
    </header>
  );
};

export default Header;
