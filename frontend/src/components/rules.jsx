import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../styles/components/rules.module.scss';

const Rules = () => {
  const { t } = useTranslation();

  return (
    <section>
      <h1 className={styles.title}>
        Правила сайта
      </h1>
      <article className={styles.container}>
        <span className={styles.text}>{t('mainPage.rules1')}</span>
        <span className={styles.text}>{t('mainPage.rules2')}</span>
        <span className={styles.text}>{t('mainPage.rules3')}</span>
        <span className={styles.text}>{t('mainPage.rules4')}</span>
        <span className={styles.text}>
          <span className={styles.bg}>{t('mainPage.rules5')}</span>
        </span>
        <span className={styles.text}>
          <span className={styles.bg}>{t('mainPage.rules6')}</span>
        </span>
        <span className={styles.text}>{t('mainPage.rules7')}</span>
        <span className={styles.text}>{t('mainPage.rules8')}</span>
      </article>
    </section>
  );
};
export default Rules;
