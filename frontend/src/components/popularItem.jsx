import React from 'react';
import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router';
import {
  Button, Card, Container, Row, Col,
} from 'react-bootstrap';
import { useGetPopularEmbroideryQuery } from '../store/api.js';

const PopularItem = () => {
  const { t } = useTranslation();
  // const navigate = useNavigate();

  const {
    data: embroideryItems,
    error,
    isLoading,
  } = useGetPopularEmbroideryQuery();
  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }

  const handleBuyClick = (id) => {
    // Логика для кнопки "Купить"
    alert(`Купить вышивку с ID ${id}`);
  };

  const handleViewClick = (id) => {
    // Логика для кнопки "Посмотреть"
    alert(`Посмотреть вышивку с ID ${id}`);
  };

  return (
    <Container>
      <h2 className="text-center my-4">{t('mainPage.popularEmbroidery')}</h2>
      <Row>
        {embroideryItems.map((item) => (
          <Col md={4} key={item.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title className="text-center">{item.title}</Card.Title>
                <Card.Text className="text-center">
                  Цена:
                  {item.price}
                </Card.Text>
                <div className="text-center">
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => handleBuyClick(item.id)}
                  >
                    Купить
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleViewClick(item.id)}
                  >
                    Посмотреть
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PopularItem;
