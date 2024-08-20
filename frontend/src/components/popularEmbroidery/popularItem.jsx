import React from 'react';
import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router';
import styles from '../../styles/components/popularItem.module.scss';
import { useGetPopularEmbroideryQuery } from '../../store/api.js';
import ItemCard from '../card/ItemCard.jsx';

const PopularItem = () => {
  const { t } = useTranslation();
  // const navigate = useNavigate();

  const {
    data: embroideryItems,
    error,
    isLoading,
  } = useGetPopularEmbroideryQuery();
  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (error) {
    return (
      <div className={styles.error}>
        Error:
        {' '}
        {error.message}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('mainPage.popularEmbroidery')}</h2>
      <div className={styles.row}>
        {embroideryItems.map((item) => (
          <ItemCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default PopularItem;
