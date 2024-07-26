import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router';
import {
  Button, Card, Container, Row, Col,
} from 'react-bootstrap';
import axios from 'axios';
import { useGetPopularEmbroideryQuery } from '../store/api.js';

const PopularItem = async () => {
  const { t } = useTranslation();
  // const navigate = useNavigate();

  const handleBuyClick = (id) => {
    // Логика для кнопки "Купить"
    alert(`Купить вышивку с ID ${id}`);
  };

  const handleViewClick = (id) => {
    // Логика для кнопки "Посмотреть"
    alert(`Посмотреть вышивку с ID ${id}`);
  };

  // const embroideryItems = [
  //   {
  //     id: 1,
  //     name: 'Вышивка 1',
  //     image: '/images/embroidery1.jpg',
  //     price: '$50',
  //   },
  //   {
  //     id: 2,
  //     name: 'Вышивка 2',
  //     image: '/images/embroidery2.jpg',
  //     price: '$60',
  //   },
  //   {
  //     id: 3,
  //     name: 'Вышивка 3',
  //     image: '/images/embroidery3.jpg',
  //     price: '$70',
  //   },
  //   {
  //     id: 4,
  //     name: 'Вышивка 4',
  //     image: '/images/embroidery4.jpg',
  //     price: '$80',
  //   },
  //   {
  //     id: 5,
  //     name: 'Вышивка 5',
  //     image: '/images/embroidery5.jpg',
  //     price: '$90',
  //   },
  //   {
  //     id: 6,
  //     name: 'Вышивка 6',
  //     image: '/images/embroidery6.jpg',
  //     price: '$100',
  //   },
  //   {
  //     id: 7,
  //     name: 'Вышивка 7',
  //     image: '/images/embroidery7.jpg',
  //     price: '$110',
  //   },
  //   {
  //     id: 8,
  //     name: 'Вышивка 8',
  //     image: '/images/embroidery8.jpg',
  //     price: '$120',
  //   },
  //   {
  //     id: 9,
  //     name: 'Вышивка 9',
  //     image: '/images/embroidery9.jpg',
  //     price: '$130',
  //   },
  // ];

  const { data: embroideryItems, error, isLoading } = useGetPopularEmbroideryQuery();
  console.log(useGetPopularEmbroideryQuery());
  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }
  // useEffect(() => {
  //   const embroideryItems = data;
  //
  // }, [data]);

  return (
    <Container>
      <h2 className="text-center my-4">{t('mainPage.popularEmbroidery')}</h2>
      <Row>
        {embroideryItems.map((item) => (
          <Col md={4} key={item.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title className="text-center">{item.name}</Card.Title>
                <Card.Text className="text-center">
                  Цена:
                  {item.price}
                </Card.Text>
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
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PopularItem;
