import React from 'react';
import Navigate from '../components/navbar.jsx';
import Header from '../components/header/header.jsx';
import PopularItem from '../components/popularEmbroidery/popularItem.jsx';
import Rules from '../components/rules.jsx';
import Footer from '../components/footer/Footer.jsx';

const MainPage = () => (
  <>
    <Navigate />
    <Header />
    <main>
      {/* <Rules /> */}
      <PopularItem />
    </main>
    <Footer />
  </>
);

export default MainPage;
