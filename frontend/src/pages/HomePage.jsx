import React from 'react';
import Navigate from '../components/navbar.jsx';
import Header from '../components/header.jsx';
import PopularItem from '../components/popularItem.jsx';

const MainPage = () => {
  return (
    <>
      <Header>
        <Navigate />
      </Header>
      <PopularItem />
    </>
  );
};

export default MainPage;
