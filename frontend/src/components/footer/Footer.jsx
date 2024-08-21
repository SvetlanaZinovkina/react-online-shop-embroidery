import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/components/Footer.module.scss';
import routes from '../../routes/routes.js';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          <section className={styles.col}>
            <div className={styles.contact}>
              <h3>{t('footer.contacts')}</h3>
              <p>{t('footer.phoneNumber')}</p>
              <p>{t('footer.email')}</p>
              <p>{t('footer.address')}</p>
              <Link href={routes.policy()} className={styles.link}>
                {t('footer.policy')}
              </Link>
            </div>
          </section>
          {/* <aside className={styles.col}> */}
          {/*  <div className={styles['footer-rights-image']} /> */}
          {/* </aside> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
