import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';
import routes from '../routes/routes';
import Navigate from '../components/navbar/navbar.jsx';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
      <Navigate />
      <footer className="footer">
        <Container>
          <Row>
            <Col md={6} className="contact-info text-center">
              <h5>{t('footer.contacts')}</h5>
              <p>{t('footer.phoneNumber')}</p>
              <p>{t('footer.email')}</p>
              <p>{t('footer.address')}</p>
              <a href={routes.policy()} className="link-dark">{t('footer.policy')}</a>
            </Col>
            <Col md={6} className="footer-rights-image" />
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
