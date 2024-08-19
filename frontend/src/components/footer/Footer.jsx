import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';
import routes from '../../routes/routes.js';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          <section className={styles.col}>
            <div className={styles.contact}>
              <h5>{t('footer.contacts')}</h5>
              <p>{t('footer.phoneNumber')}</p>
              <p>{t('footer.email')}</p>
              <p>{t('footer.address')}</p>
              <Link to={routes.policy()} className={styles.link}>{t('footer.policy')}</Link>
            </div>
          </section>
          <figure className={styles.col}>
            <div className={styles['footer-rights-image']} />
          </figure>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
