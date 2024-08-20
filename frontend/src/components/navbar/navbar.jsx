import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import routes from '../../routes/routes.js';
import { UserIcon, SearchIcon, CartIcon } from '../Icons.jsx';
import logo from '../../assets/images/logo3.svg';
import styles from '../../styles/components/navbar.module.scss';

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
    <div className={styles.navbar}>
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
              <Link href={routes.mainPage()} className={styles.navLink}>{t('navBar.main')}</Link>
              <Link href={routes.shopPage()} className={styles.navLink}>{t('navBar.embroidery')}</Link>
              <Link href={routes.catalogSvgPath()} className={styles.navLink}>{t('navBar.svg')}</Link>
              <Link href={routes.discount()} className={styles.navLink}>{t('navBar.discount')}</Link>
            </div>
          </section>
          <section className={styles.navbarCenter}>
            <Link href={routes.mainPage()} className={styles.navbarBrand}>
              <img src={logo.src} alt={t('navBar.nameShop')} height="40" loading="lazy" />
            </Link>
          </section>
          <section className={styles.navbarRight}>
            <Link href={routes.getUserData()} className={styles.navIcon} aria-label="Search">
              <SearchIcon />
            </Link>
            <Link href={routes.getUserData()} className={styles.navIcon} aria-label="User">
              <UserIcon />
            </Link>
            <Link href={routes.getUserData()} className={styles.navIcon} aria-label="Cart">
              <CartIcon />
            </Link>
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
          <Link href={routes.mainPage()} onClick={handleCloseMenu}>{t('navBar.main')}</Link>
          <Link href={routes.shopPage()} onClick={handleCloseMenu}>{t('navBar.embroidery')}</Link>
          <Link href={routes.catalogSvgPath()} onClick={handleCloseMenu}>{t('navBar.svg')}</Link>
          <Link href={routes.discount()} onClick={handleCloseMenu}>{t('navBar.discount')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Navigate;
