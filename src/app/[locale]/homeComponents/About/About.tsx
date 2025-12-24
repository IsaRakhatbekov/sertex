'use client'

import { useTranslations } from 'next-intl'
import styles from './About.module.scss'
import AboutAnimation from './AboutAnimation'

const About = () => {
	const t = useTranslations('AboutUs')

	return (
		<section className={styles.about} id='about'>
			<div className='container'>
				<div className={styles.secondLine}>
					<svg
						className={styles.signalTrackSVG}
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 600 450'
						fill='none'
					>
						<path
							className={styles.trackBase}
							d='M366.5 -64.5V228C366.5 258.928 341.428 284 310.5 284H-33'
							transform='translate(100, 100)'
						/>
						<path
							className={styles.trackSignal}
							d='M366.5 -64.5V228C366.5 258.928 341.428 284 310.5 284H-33'
							transform='translate(100, 100)'
						/>
					</svg>
				</div>
				<div className={styles.dataPulseSphere}></div>
				<h2 className={styles.title}>{t('title')}</h2>

				<AboutAnimation>
					<div className={styles.topWrapper}>
						<div className={styles.topLeft}>
							<h3 className={styles.subTitle}>{t('experience')}</h3>
							<h3 className={styles.subTitle}>{t('growth')}</h3>
							<h3 className={styles.subTitle}>{t('quality')}</h3>
						</div>
						<div className={styles.topRight}>
							<p className={styles.text}>
								{t('text1Part1')} <span>{t('text1Accent')}</span>{' '}
								{t('text1Part2')}
							</p>
							<p className={styles.text}>
								{t('text2Part1')} <span>{t('text2Accent')}</span>{' '}
								{t('text2Part2')}
							</p>
							<p className={styles.text}>
								{t('text3Part1')} <span>{t('text3Accent')}</span>{' '}
								{t('text3Part2')}
							</p>
						</div>
					</div>
				</AboutAnimation>
			</div>
		</section>
	)
}

export default About
