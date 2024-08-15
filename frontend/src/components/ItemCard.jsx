import React from 'react';
import {
  Button, Card, Col,
} from 'react-bootstrap';

import createPathToImg from '../helpers/createPathToImg.js';

const ItemCard = ({ item }) => {
  const {
    id, image, title, price,
  } = item;
  const handleBuyClick = (id) => {
    // Логика для кнопки "Купить"
    alert(`Купить вышивку с ID ${id}`);
  };

  const handleViewClick = (id) => {
    // Логика для кнопки "Посмотреть"
    alert(`Посмотреть вышивку с ID ${id}`);
  };

  return (
    <Col md={4} key={id} className="mb-4">
      <Card>
        <Card.Img variant="top" src={createPathToImg(image)} />
        <Card.Body>
          <Card.Title className="text-center">{title}</Card.Title>
          <Card.Text className="text-center">
            Цена:
            {price}
          </Card.Text>
          <div className="text-center">
            <Button
              variant="primary"
              className="me-2"
              onClick={() => handleBuyClick(id)}
            >
              Купить
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleViewClick(id)}
            >
              Посмотреть
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ItemCard;
