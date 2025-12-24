'use client'

import { useTranslations } from 'next-intl'
import styles from './WhatWeDo.module.scss'
import WhatWeDoAnimation from './WhatWeDoAnimation'

const WhatWeDo = () => {
	const t = useTranslations('WhatWeDo')

	return (
		<section className={styles.WhatWeDo} id='WhatWeDo'>
			<div className='container'>
				<h2 className={styles.title}>
					{t('title')} <span>{t('titleAccentColor')}</span>
				</h2>
				<div className={styles.bgGlow1}></div>
				<div className={styles.bgGlow2}></div>

				<div className={styles.listWrapper}>
					<WhatWeDoAnimation>
						<ul className={styles.list}>
							<li className={styles.item}>
								<div className={styles.titleWrapper}>
									<h3 className={styles.itemTitle}>
										{t('cards.corpSoft.title')}
									</h3>
								</div>
								<div className={styles.textWrapper}>
									<p className={styles.text}>{t('cards.corpSoft.text')}</p>
								</div>
							</li>
							<li className={styles.item}>
								<div className={styles.titleWrapper}>
									<h3 className={styles.itemTitle}>
										{t('cards.aiSolutions.title')}
									</h3>
								</div>
								<div className={styles.textWrapper}>
									<p className={styles.text}>{t('cards.aiSolutions.text')}</p>
								</div>
							</li>
							<li className={styles.item}>
								<div className={styles.titleWrapper}>
									<h3 className={styles.itemTitle}>
										{t('cards.corpSystems.title')}
									</h3>
								</div>
								<div className={styles.textWrapper}>
									<p className={styles.text}>{t('cards.corpSystems.text')}</p>
								</div>
							</li>
							<li className={styles.item}>
								<div className={styles.titleWrapper}>
									<h3 className={styles.itemTitle}>
										{t('cards.cloud.title')}
										<span>(SaaS/PaaS)</span>
									</h3>
								</div>
								<div className={styles.textWrapper}>
									<p className={styles.text}>{t('cards.cloud.text')}</p>
								</div>
							</li>
							<li className={styles.item}>
								<div className={styles.titleWrapper}>
									<h3 className={styles.itemTitle}>{t('cards.infra.title')}</h3>
								</div>
								<div className={styles.textWrapper}>
									<p className={styles.text}>{t('cards.infra.text')}</p>
								</div>
							</li>
							<li className={styles.item}>
								<div className={styles.titleWrapper}>
									<h3 className={styles.itemTitle}>
										{t('cards.webDev.title')}
									</h3>
								</div>
								<div className={styles.textWrapper}>
									<p className={styles.text}>{t('cards.webDev.text')}</p>
								</div>
							</li>
							<li className={styles.item}>
								<div className={styles.titleWrapper}>
									<h3 className={styles.itemTitle}>
										{t('cards.devOps.title')}
									</h3>
								</div>
								<div className={styles.textWrapper}>
									<p className={styles.text}>{t('cards.devOps.text')}</p>
								</div>
							</li>
							<li className={styles.item}>
								<div className={styles.titleWrapper}>
									<h3 className={styles.itemTitle}>
										{t('cards.backup.title')}
									</h3>
								</div>
								<div className={styles.textWrapper}>
									<p className={styles.text}>{t('cards.backup.text')}</p>
								</div>
							</li>
							<li className={styles.item}>
								<div className={styles.titleWrapper}>
									<h3 className={styles.itemTitle}>
										{t('cards.support.title')}
									</h3>
								</div>
								<div className={styles.textWrapper}>
									<p className={styles.text}>{t('cards.support.text')}</p>
								</div>
							</li>
						</ul>
					</WhatWeDoAnimation>
				</div>
				<button className={styles.btn}>{t('moreBtn')}</button>
			</div>
		</section>
	)
}

export default WhatWeDo
