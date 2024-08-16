import React from 'react';
import {
  Button, Card, Col,
} from 'react-bootstrap';
import styles from './itemCard.module.scss';
import createPathToImg from '../../helpers/createPathToImg.js';

const ItemCard = ({ item }) => {
  const {
    id, image, title, price,
  } = item;
  const currents = '$';
  const handleBuyClick = (id) => {
    // Логика для кнопки "Купить"
    alert(`Купить вышивку с ID ${id}`);
  };

  const handleViewClick = (id) => {
    // Логика для кнопки "Посмотреть"
    alert(`Посмотреть вышивку с ID ${id}`);
  };
  return (
    <div className={styles.card}>
      <img className={styles.cardImage} src={createPathToImg(image)} alt={title} />
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardText}>
          {currents}
          {price}
        </p>
        <div className={styles.buttonGroup}>
          <button
            className={styles.primaryButton}
            onClick={() => handleBuyClick(id)}
          >
            Купить
          </button>
          <button
            className={styles.secondaryButton}
            onClick={() => handleViewClick(id)}
          >
            Посмотреть
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
