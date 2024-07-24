import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={6} className="contact-info text-center">
            <h5>{t('footer.contacts')}</h5>
            <p>{t('footer.phoneNumber')}</p>
            <p>{t('footer.email')}</p>
            <p>{t('footer.address')}</p>
          </Col>
          <Col md={6} className="footer-rights-image" />
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
