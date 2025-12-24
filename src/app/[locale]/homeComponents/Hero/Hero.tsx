'use client'

import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import styles from './Hero.module.scss'
import { HeroAnimation } from './HeroAnimation'

const Hero = () => {
	const heroRef = useRef<HTMLDivElement | null>(null)
	const titleRef = useRef<HTMLHeadingElement | null>(null)
	const btnWrapperRef = useRef<HTMLDivElement | null>(null)
	HeroAnimation(heroRef, titleRef, btnWrapperRef)
	const t = useTranslations('Hero')

	return (
		<section className={styles.Hero} ref={heroRef}>
			<div className={styles.bgGlow1}></div>
			<div className={styles.bgGlow2}></div>

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

			<div className={`container ${styles.container}`}>
				<div className={styles.badgeWrapper}>
					<div className={styles.badge}>
						<span className={styles.badgeIcon}>★</span> {t('leaders')}
					</div>
				</div>

				<h1 className={styles.title} ref={titleRef}>
					{t('mainTitle')}
					<br />
					<span className={styles.accent}>AI</span>
					{t('mainTitleSecond')}
				</h1>

				<p className={styles.subtitle}>{t('subtitle')}</p>

				<div className={styles.btnWrapper} ref={btnWrapperRef}>
					<a href='#chat' className={`${styles.btn} ${styles.btnPrimary}`}>
						<span>{t('aiChatBtn')}</span>
					</a>
					<a
						href='#WhatWeDo'
						className={`${styles.btn} ${styles.btnSecondary}`}
					>
						<span>{t('ourServicesBtn')}</span>
					</a>
				</div>

				<div className={styles.trustedWrapper}>
					<p className={styles.trustedTitle}>{t('trustUs')}</p>
					<div className={styles.logosGrid}>
						<span className={styles.logoItem}>Lenovo</span>
						<span className={styles.logoItem}>DELLEMC</span>
						<span className={styles.logoItem}>Microsoft</span>
						<span className={styles.logoItem}>Hewlett Packard Enterprise</span>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero
