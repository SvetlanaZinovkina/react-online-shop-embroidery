import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Menu } from 'antd';
import Link from 'antd/es/typography/Link';
import routes from './routes/routes.js';

const Navigate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <div>
        <Link href={routes.mainPage()} style={{ fontFamily: 'Montesserat' }}>
          {t('navBar.embroidery')}
        </Link>
      </div>
      <Menu mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item onClick={() => navigate(routes.mainPage())}>
          {t('navBar.main')}
        </Menu.Item>
        <Menu.Item onClick={() => navigate(routes.embroidery())}>
          {t('navBar.embroidery')}
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate(routes.svg())}
          disabled={t('navBar.svg')}
        >
          {t('navBar.svg')}
        </Menu.Item>
        <Menu.Item onClick={() => navigate(routes.discount())}>
          {t('navBar.discount')}
        </Menu.Item>
      </Menu>
    </>
  );
};
