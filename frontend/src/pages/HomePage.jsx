import React from 'react';
import Navigate from '../components/navbar.jsx';
import Header from '../components/header.jsx';
import PopularItem from '../components/popularItem.jsx';
import Rules from '../components/rules.jsx';
import Footer from '../components/footer.jsx';

const MainPage = () => (
  <>
    <Header>
      <Navigate />
    </Header>
    <main>
      <Rules />
      <PopularItem />
    </main>
    <Footer />
  </>
);

export default MainPage;
