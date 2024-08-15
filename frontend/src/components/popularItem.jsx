import React from 'react';
import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router';
import {
  Button, Card, Container, Row, Col,
} from 'react-bootstrap';
import { useGetPopularEmbroideryQuery } from '../store/api.js';
import ItemCard from './ItemCard.jsx';

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

  return (
    <Container>
      <h2 className="text-center my-4">{t('mainPage.popularEmbroidery')}</h2>
      <Row>
        {embroideryItems.map((item) => (
          <ItemCard item={item} key={item.id} />
        ))}
      </Row>
    </Container>
  );
};

export default PopularItem;
