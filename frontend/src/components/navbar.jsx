import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Navbar, Nav, Container, Image, Row, Col,
} from 'react-bootstrap';
import routes from '../routes/routes.js';
import { UserIcon, SearchIcon, CartIcon } from './Icons.jsx';
import logo from '../assets/images/logo3.svg';

const Navigate = () => {
  const { t } = useTranslation();

  return (
    <Navbar variant="dark" expand="lg">
      <Container fluid>
        <Row className="w-100">
          <Col xs={5} className="d-flex align-items-center">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-start">
              <Nav>
                <Nav.Link href={routes.mainPage()}>{t('navBar.main')}</Nav.Link>
                <Nav.Link href={routes.shopPage()}>{t('navBar.embroidery')}</Nav.Link>
                <Nav.Link href={routes.catalogSvgPath()}>{t('navBar.svg')}</Nav.Link>
                <Nav.Link href={routes.discount()}>{t('navBar.discount')}</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Col>
          <Col xs={3} className="d-flex justify-content-center align-items-center">
            <Navbar.Brand href={routes.mainPage()}>
              <Image
                src={logo}
                alt={t('navBar.nameShop')}
                height="40"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
          </Col>
          <Col xs={4} className="d-flex justify-content-end align-items-center">
            <Nav>
              <Nav.Link href={routes.getUserData()} className="d-flex align-items-center">
                <SearchIcon className="me-2" />
              </Nav.Link>
              <Nav.Link href={routes.getUserData()} className="d-flex align-items-center">
                <UserIcon className="me-2" />
              </Nav.Link>
              <Nav.Link href={routes.getUserData()} className="d-flex align-items-center">
                <CartIcon className="me-2" />
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Navigate;
