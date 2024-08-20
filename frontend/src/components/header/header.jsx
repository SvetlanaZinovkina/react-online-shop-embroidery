import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import routes from '../../routes/routes.js';
import styles from '../../styles/components/header.module.scss';
import gifBearEmbroidery from '../../assets/images/bear.gif';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className={styles['hero-section']}>
      <div className={styles.container}>
        <section className={`${styles.col} ${styles['left-column']}`}>
          <h1>{t('mainPage.welcome')}</h1>
          <Link href={routes.shopPage()} className={styles.button}>
            {t('mainPage.catalog')}
          </Link>
        </section>
        <aside className={`${styles.col} ${styles['right-column']}`}>
          <img
            src={gifBearEmbroidery.src}
            alt={t('navBar.nameShop')}
            loading="lazy"
          />
        </aside>
      </div>
    </header>
  );
};

export default Header;
