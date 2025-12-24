'use client'

import { useTranslations } from 'next-intl'
import styles from './WhyChooseUs.module.scss'
import WhyChooseUsAnimation from './WhyChooseUsAnimation'

const WhyChooseUs = () => {
	const t = useTranslations('WhyChooseUs')

	const items = ['item1', 'item2', 'item3', 'item4']

	return (
		<section className={styles.WhyChooseUs}>
			<div className={styles.bgGlow1}></div>
			<div className={styles.bgGlow2}></div>

			<div className={`${styles.container} container`}>
				<WhyChooseUsAnimation>
					<div className={styles.head}>
						<span className={styles.badge}>Benefits</span>
						<h2 className={styles.whyTitle}>{t('title')}</h2>
					</div>

					<ul className={styles.list}>
						{items.map(key => (
							<li key={key} className={styles.item}>
								<div className={styles.cardContent}>
									<div className={styles.iconBox}>
										<span className={styles.number}>0{key.slice(-1)}</span>
									</div>
									<h4 className={styles.innerTitle}>{t(`${key}.title`)}</h4>
									<div className={styles.innerText}>
										<p className={styles.accentText}>{t(`${key}.accent`)}</p>
										<p className={styles.description}>
											{key === 'item1' || key === 'item4'
												? t(`${key}.text`)
												: `${t(`${key}.textPart1`)} ${t(`${key}.textPart2`)}`}
										</p>
									</div>
								</div>
								<div className={styles.bottomLine}></div>
							</li>
						))}
					</ul>
				</WhyChooseUsAnimation>
			</div>
		</section>
	)
}

export default WhyChooseUs
