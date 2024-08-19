// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import {
//   Navbar, Nav, Container, Image, Row, Col,
// } from 'react-bootstrap';
// import routes from '../routes/routes.js';
// import { UserIcon, SearchIcon, CartIcon } from './Icons.jsx';
// import logo from '../assets/images/logo3.svg';

// const Navigate = () => {
//   const { t } = useTranslation();

//   return (
//     <Navbar variant="dark" expand="lg">
//       <Container fluid>
//         <Row className="w-100">
//           <Col xs={5} className="d-flex align-items-center">
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav" className="justify-content-start">
//               <Nav>
//                 <Nav.Link href={routes.mainPage()}>{t('navBar.main')}</Nav.Link>
//                 <Nav.Link href={routes.shopPage()}>{t('navBar.embroidery')}</Nav.Link>
//                 <Nav.Link href={routes.catalogSvgPath()}>{t('navBar.svg')}</Nav.Link>
//                 <Nav.Link href={routes.discount()}>{t('navBar.discount')}</Nav.Link>
//               </Nav>
//             </Navbar.Collapse>
//           </Col>
//           <Col xs={3} className="d-flex justify-content-center align-items-center">
//             <Navbar.Brand href={routes.mainPage()}>
//               <Image
//                 src={logo}
//                 alt={t('navBar.nameShop')}
//                 height="40"
//                 className="d-inline-block align-top"
//               />
//             </Navbar.Brand>
//           </Col>
//           <Col xs={4} className="d-flex justify-content-end align-items-center">
//             <Nav>
//               <Nav.Link href={routes.getUserData()} className="d-flex align-items-center">
//                 <SearchIcon className="me-2" />
//               </Nav.Link>
//               <Nav.Link href={routes.getUserData()} className="d-flex align-items-center">
//                 <UserIcon className="me-2" />
//               </Nav.Link>
//               <Nav.Link href={routes.getUserData()} className="d-flex align-items-center">
//                 <CartIcon className="me-2" />
//               </Nav.Link>
//             </Nav>
//           </Col>
//         </Row>
//       </Container>
//     </Navbar>
//   );
// };

// export default Navigate;

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import routes from '../../routes/routes.js';
import { UserIcon, SearchIcon, CartIcon } from '../Icons.jsx';
import logo from '../../assets/images/logo3.svg';
import styles from './navbar.module.scss';

const Navigate = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <nav className={styles.navbarRow}>
          <section className={styles.navbarLeft}>
            <button
              className={styles.navbarToggle}
              aria-controls="navbar-menu"
              aria-expanded={isMenuOpen}
              onClick={handleMenuToggle}
            >
              ☰
            </button>
            <div id="navbar-menu" className={`${styles.navbarCollapse1} ${isMenuOpen ? styles.open : ''}`}>
              <a href={routes.mainPage()} className={styles.navLink}>{t('navBar.main')}</a>
              <a href={routes.shopPage()} className={styles.navLink}>{t('navBar.embroidery')}</a>
              <a href={routes.catalogSvgPath()} className={styles.navLink}>{t('navBar.svg')}</a>
              <a href={routes.discount()} className={styles.navLink}>{t('navBar.discount')}</a>
            </div>
          </section>
          <section className={styles.navbarCenter}>
            <a href={routes.mainPage()} className={styles.navbarBrand}>
              <img src={logo} alt={t('navBar.nameShop')} height="40" />
            </a>
          </section>
          <section className={styles.navbarRight}>
            <a href={routes.getUserData()} className={styles.navIcon} aria-label="Search">
              <SearchIcon />
            </a>
            <a href={routes.getUserData()} className={styles.navIcon} aria-label="User">
              <UserIcon />
            </a>
            <a href={routes.getUserData()} className={styles.navIcon} aria-label="Cart">
              <CartIcon />
            </a>
          </section>
        </nav>
        <div className={`${styles.menuBackdrop} ${isMenuOpen ? styles.open : ''}`} onClick={handleCloseMenu} />
        <div className={`${styles.navbarCollapse} ${isMenuOpen ? styles.open : ''}`}>
          <span
            className={`${styles.navbarClose} ${isMenuOpen ? styles.open : ''}`}
            onClick={handleCloseMenu}
          >
            &times;
          </span>
          <a href={routes.mainPage()} onClick={handleCloseMenu}>{t('navBar.main')}</a>
          <a href={routes.shopPage()} onClick={handleCloseMenu}>{t('navBar.embroidery')}</a>
          <a href={routes.catalogSvgPath()} onClick={handleCloseMenu}>{t('navBar.svg')}</a>
          <a href={routes.discount()} onClick={handleCloseMenu}>{t('navBar.discount')}</a>
        </div>
      </div>
    </header>
  );
};

export default Navigate;