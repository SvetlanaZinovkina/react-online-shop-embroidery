import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Navbar, Nav, Container, NavDropdown, Button,
} from 'react-bootstrap';
import routes from '../routes/routes.js';

const Navigate = () => {
  const { t } = useTranslation();

  return (
    <Navbar variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href={routes.mainPage()}>
          {t('navBar.nameShop')}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ms-auto">
            <Nav.Link href={routes.mainPage()}>{t('navBar.main')}</Nav.Link>
            <Nav.Link href={routes.catalogPath()}>
              {t('navBar.embroidery')}
            </Nav.Link>
            <Nav.Link href={routes.catalogSvgPath()}>
              {t('navBar.svg')}
            </Nav.Link>
            <Nav.Link href={routes.discount()}>{t('navBar.discount')}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigate;
