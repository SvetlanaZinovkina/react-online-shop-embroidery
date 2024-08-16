import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Image, Container, Row, Col,
} from 'react-bootstrap';
import routes from '../../routes/routes.js';
import { useGetPopularEmbroideryQuery } from '../../store/api.js';
import nike from '../../assets/images/bear.gif';
import styles from './header.module.scss';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="hero-section">
      <Container fluid>
        <Row className="align-items-center justify-content-center">
          <Col md={6} xs={12} className="d-flex align-items-start justify-content-sm-around flex-column">
            <h1>{t('mainPage.welcome')}</h1>
            <Button variant="light" href={routes.shopPage()} className="mt-3">
              {t('mainPage.catalog')}
            </Button>
          </Col>
          <Col md={6} xs={12} className="d-flex">
            <Image
              src={nike}
              alt={t('navBar.nameShop')}
              height="450"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
