'use client'

import WhyChooseUs from '@/components/whyChooseUs/whyChooseUs'
import { SplitText } from '@/lib/SplitText'
import { gsap } from 'gsap'
import { useEffect } from 'react'
import styles from './Home.module.scss'

export default function Home() {
	useEffect(() => {
		gsap.registerPlugin(SplitText)

		// ===== ТЕКСТ =====
		const el = document.querySelector('.split')
		if (el) {
			const split = new SplitText(el, {
				type: 'words',
				wordsClass: 'word',
			})

			gsap.from(split.words, {
				y: 50,
				opacity: 0,
				stagger: 0.1,
				ease: 'back.out(1.7)',
				duration: 1.2,
			})
		}

		// ===== ПРАВЫЕ ЛОГО (едут справа -> центр) =====
		const rightLogoSelectors = [
			`.${styles.firstLogo}`,
			`.${styles.secondLogo}`,
			`.${styles.thirdLogo}`,
			`.${styles.fourthLogo}`,
		]

		const rightLogos = rightLogoSelectors
			.map(sel => document.querySelector(sel))
			.filter((el): el is HTMLElement => el !== null)

		if (rightLogos.length) {
			gsap.from(rightLogos, {
				x: 200, // старт правее
				opacity: 0, // из прозрачности
				duration: 1.2,
				ease: 'power2.out',
				stagger: 0.2, // по очереди, с небольшим интервалом
				delay: 1.2, // чтобы линии уже отрисовались
			})
		}

		// ===== ЛЕВЫЕ ЛОГО (едут слева -> центр) =====
		const leftLogoSelectors = [
			`.${styles.leftFirstLogo}`,
			`.${styles.leftSecondLogo}`,
			`.${styles.leftThirdLogo}`,
			`.${styles.leftFourthLogo}`,
		]

		const leftLogos = leftLogoSelectors
			.map(sel => document.querySelector(sel))
			.filter((el): el is HTMLElement => el !== null)

		if (leftLogos.length) {
			gsap.from(leftLogos, {
				x: -200, // старт левее
				opacity: 0,
				duration: 1.2,
				ease: 'power2.out',
				stagger: 0.2,
				delay: 1.2,
			})
		}
	}, [])

	return (
		<>
			<section className={styles.Hero}>
				<div className='container'>
					<span className={styles.leftLine}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='367'
							height='285'
							viewBox='0 0 367 285'
							fill='none'
						>
							<path
								className={styles.svgLine}
								opacity='0.4'
								d='M366.5 -64.5V228C366.5 258.928 341.428 284 310.5 284H-33'
								stroke='url(#paint0_linear_325_5163)'
								strokeLinecap='round'
							></path>
							<defs>
								<linearGradient
									id='paint0_linear_325_5163'
									x1='340'
									y1='307'
									x2='363.183'
									y2='-17.9561'
									gradientUnits='userSpaceOnUse'
								>
									<stop stopColor='#08072B'></stop>
									<stop
										offset='0.575586'
										stopColor='#08072B'
										stopOpacity='0.38'
									></stop>
								</linearGradient>
							</defs>
						</svg>
					</span>

					<div className={styles.titleWrapper}>
						<span className={styles.leftTree}>
							<svg
								width='600'
								height='400'
								viewBox='0 0 600 400'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								{/* отзеркаливание по оси X */}
								<g transform='translate(600, 0) scale(-1, 1)'>
									<path
										className={styles.treeMain}
										d='M140 200 H200'
										stroke='#ccc'
										strokeWidth='2'
										strokeLinecap='round'
									/>
									<path
										className={styles.treeTop}
										d='M200 200 C 260 200, 260 80, 320 80 H 560'
										stroke='#ccc'
										strokeWidth='2'
										strokeLinecap='round'
										fill='none'
									/>
									<path
										className={styles.treeThird}
										d='M200 200 C 260 200, 260 260, 320 260 H 560'
										stroke='#ccc'
										strokeWidth='2'
										strokeLinecap='round'
										fill='none'
									/>
									<path
										className={styles.treeSecond}
										d='M200 200 C 260 200, 260 140, 320 140 H 560'
										stroke='#ccc'
										strokeWidth='2'
										strokeLinecap='round'
										fill='none'
									/>
									<path
										className={styles.treeBottom}
										d='M200 200 C 260 200, 260 320, 320 320 H 560'
										stroke='#ccc'
										strokeWidth='2'
										strokeLinecap='round'
										fill='none'
									/>
								</g>
							</svg>
						</span>

						<div className={styles.leftFirstLogo}></div>
						<div className={styles.leftSecondLogo}></div>
						<div className={styles.leftThirdLogo}></div>
						<div className={styles.leftFourthLogo}></div>

						<h1 className={`${styles.title} split`}>
							AI-автоматизация, серверные решения, веб-разработка и
							ИТ-аутсорсинг
						</h1>
						<h2 className={styles.subtitle}>
							Мы берём на себя ИТ-инфраструктуру, сервера и поддержку, а также
							внедряем ИИ-решения, чтобы ваш бизнес работал быстрее, стабильнее
							и дешевле.
						</h2>

						<div className={styles.firstLogo}></div>
						<div className={styles.secondLogo}></div>
						<div className={styles.thirdLogo}></div>
						<div className={styles.fourthLogo}></div>

						<span className={styles.rightTree}>
							<svg
								width='600'
								height='400'
								viewBox='0 0 600 400'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									className={styles.treeMain}
									d='M140 200 H200'
									stroke='#ccc'
									strokeWidth='2'
									strokeLinecap='round'
								/>
								<path
									className={styles.treeTop}
									d='M200 200 C 260 200, 260 80, 320 80 H 560'
									stroke='#ccc'
									strokeWidth='2'
									strokeLinecap='round'
									fill='none'
								/>
								<path
									className={styles.treeThird}
									d='M200 200 C 260 200, 260 260, 320 260 H 560'
									stroke='#ccc'
									strokeWidth='2'
									strokeLinecap='round'
									fill='none'
								/>
								<path
									className={styles.treeSecond}
									d='M200 200 C 260 200, 260 140, 320 140 H 560'
									stroke='#ccc'
									strokeWidth='2'
									strokeLinecap='round'
									fill='none'
								/>
								<path
									className={styles.treeBottom}
									d='M200 200 C 260 200, 260 320, 320 320 H 560'
									stroke='#ccc'
									strokeWidth='2'
									strokeLinecap='round'
									fill='none'
								/>
							</svg>
						</span>
					</div>

					<span className={styles.rightLine}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='600'
							height='306'
							viewBox='0 0 600 306'
							fill='none'
						>
							<path
								className={styles.svgLine}
								opacity='0.5'
								d='M790 305H465C434.072 305 409 279.928 409 249V203C409 172.072 383.928 147 353 147H57C26.0721 147 1 121.928 1 91V-184'
								stroke='url(#paint0_linear_325_5164)'
								strokeLinecap='round'
							></path>
							<defs>
								<linearGradient
									id='paint0_linear_325_5164'
									x1='902.121'
									y1='327.483'
									x2='125.199'
									y2='-406.155'
									gradientUnits='userSpaceOnUse'
								>
									<stop stopColor='#08072B'></stop>
									<stop
										offset='0.805696'
										stopColor='#08072B'
										stopOpacity='0.38'
									></stop>
								</linearGradient>
							</defs>
						</svg>
					</span>
				</div>
			</section>

			<section className={styles.whyChooseUs}>
				<div className={`${styles.container} container`}>
					<h3>Шаг 1 — Глубокая диагностика процессов</h3>
					<p>
						Понимаем, как работает ваш бизнес, где теряются ресурсы и что можно
						усилить технологиями.
					</p>
					<h3>Шаг 2 — Создание устойчивой ИТ-архитектуры</h3>
					<p>
						Выстраиваем надёжные сервера, безопасность, доступы и резервирование
						— фундамент для роста.
					</p>
					<h3>Шаг 3 — Интеллектуальная автоматизация и AI-ускорение</h3>
					<p>
						Внедряем ИИ-модули, автоматизируем рутину, соединяем сервисы в
						единую экосистему.
					</p>
					<h3>Шаг 4 — Непрерывная поддержка и развитие 24/7</h3>
					<p>
						Гарантируем стабильность, мониторинг, улучшения и масштабируемость
						инфраструктуры.
					</p>
				</div>
			</section>

			<WhyChooseUs />
		</>
	)
}
