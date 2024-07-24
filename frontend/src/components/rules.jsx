import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';

const Rules = () => {
		const { t } = useTranslation();

		return (
				<Container>
					<section className='d-flex my-4 justify-content-center'>
							<article className='text-center'>
									<p>{t('mainPage.rules1')}</p>
									<p>{t('mainPage.rules2')}</p>
									<p>{t('mainPage.rules3')}</p>
									<p>{t('mainPage.rules4')}</p>
									<p>{t('mainPage.rules5')}</p>
									<p>{t('mainPage.rules6')}</p>
									<p>{t('mainPage.rules7')}</p>
									<p>{t('mainPage.rules8')}</p>
							</article>
					</section>
				</Container>
		)

}
export default Rules;
