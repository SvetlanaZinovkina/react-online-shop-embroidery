import React from 'react';
import Navigate from '../components/navbar/navbar.jsx';
import Header from '../components/header/header.jsx';
import PopularItem from '../components/popularEmbroidery/popularItem.jsx';
import Footer from '../components/footer/Footer.jsx';

const MainPage = () => (
  <>
    <Navigate />
    <Header />
    <PopularItem />
    <Footer />
  </>
);

export default MainPage;
