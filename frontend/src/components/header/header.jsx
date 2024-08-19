import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../../routes/routes.js';
import styles from './header.module.scss';
import nike from '../../assets/images/bear.gif';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className={styles['hero-section']}>
      <div className={styles.container}>
        <section className={`${styles.col} ${styles['left-column']}`}>
          <h1>{t('mainPage.welcome')}</h1>
          <Link to={routes.shopPage()} className={styles.button}>
            {t('mainPage.catalog')}
          </Link>
        </section>
        <aside className={`${styles.col} ${styles['right-column']}`}>
          <img
            src={nike}
            alt={t('navBar.nameShop')}
          />
        </aside>
      </div>
    </header>
  );
};

export default Header;