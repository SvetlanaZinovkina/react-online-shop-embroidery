// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { Container, Row, Col } from 'react-bootstrap';
// import routes from '../../routes/routes.js';
// import styles from './Footer.module.scss';
//
// const Footer = () => {
//   const { t } = useTranslation();
//   return (
//     <footer className={styles.footer}>
//       <Container>
//         <Row>
//           <Col md={6} xs={12} className={styles.contact}>
//             <h5>{t('footer.contacts')}</h5>
//             <p>{t('footer.phoneNumber')}</p>
//             <p>{t('footer.email')}</p>
//             <p>{t('footer.address')}</p>
//             <a href={routes.policy()} className="link-dark">{t('footer.policy')}</a>
//           </Col>
//           <Col md={6} xs={12} className={styles['footer-rights-image']} />
//         </Row>
//       </Container>
//     </footer>
//   );
// };
//
// export default Footer;

import React from 'react';
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
              <a href={routes.policy()} className={styles.link}>{t('footer.policy')}</a>
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
