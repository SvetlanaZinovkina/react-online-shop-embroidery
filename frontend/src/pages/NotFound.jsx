import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import Navigate from '../components/navbar.jsx';
import Footer from '../components/footer.jsx';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navigate />
      <Container
        fluid
        className="d-flex flex-column justify-content-center align-items-center flex-grow-1 bg-light p-0"
      >
        <Row className="text-center">
          <Col>
            <div>
              <h1 className="display-1 fw-bold">404</h1>
              <h4 className="mb-3">{t('notFound.notPage')}</h4>
              <p className="lead">
                {t('notFound.mainLink')}
                {' '}
                <a href="/" className="btn btn-link">
                  {t('notFound.textMuted')}
                </a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer className="bg-light" />
    </div>
  );
};

export default NotFound;
