import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Typography } from 'antd';
import notFoundImage from '../images/notFoundImage.jpg';

const { Title, Text } = Typography;

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div style={{ position: 'relative' }}>
      <Image
        alt={t('notFound.notPage')}
        src={notFoundImage}
        style={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Title level={1}>404</Title>
        <Title level={4}>{t('notFound.notPage')}</Title>
        <Text>
          {t('notFound.mainLink')}
          <a href="/" style={{ color: 'aqua' }}>
            {t('notFound.textMuted')}
          </a>
        </Text>
      </div>
    </div>
  );
};

export default NotFound;
