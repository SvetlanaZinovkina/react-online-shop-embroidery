import React from 'react';
import { useTranslation } from 'react-i18next';
import routes from '../routes/routes';
import Navigate from '../components/navbar/navbar.jsx';
import Rules from '../components/rules.jsx';
import Footer from '../components/footer/Footer.jsx';

const Policy = () => {
  const { t } = useTranslation();
  return (
    <>
      <Navigate />
      <Rules />
      <Footer />
    </>
  );
};

export default Policy;
