'use client'

import WhyChooseUs from '@/components/whyChooseUs/whyChooseUs'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useLayoutEffect, useRef } from 'react'
import styles from './Home.module.scss'

gsap.registerPlugin(SplitText)

export default function Home() {
	const titleRef = useRef<HTMLHeadingElement | null>(null)
	const subtitleRef = useRef<HTMLHeadingElement | null>(null)

	// SVG с основными линиями (D5D9E5)
	const treeRef = useRef<SVGSVGElement | null>(null)
	// SVG-слой поверх — для пульсирующих лучей
	const pulseRef = useRef<SVGSVGElement | null>(null)

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			// ======= АНИМАЦИЯ ТЕКСТА =======
			const splitTitle = new SplitText(titleRef.current, {
				type: 'words,chars',
				wordsClass: styles.word,
				charsClass: styles.char,
			})

			const splitSubtitle = new SplitText(subtitleRef.current, {
				type: 'words',
				wordsClass: styles.word,
			})

			const tl = gsap.timeline()

			// h1 появление
			tl.from(splitTitle.words, {
				duration: 1.2,
				opacity: 0,
				y: 50,
				rotationX: -90,
				transformOrigin: '50% 50% -50',
				stagger: 0.12,
				ease: 'back.out(1.4)',
			})

			// h2 появление
			tl.from(
				splitSubtitle.words,
				{
					duration: 1,
					opacity: 0,
					y: 30,
					stagger: 0.12,
					ease: 'power3.out',
				},
				'-=0.4'
			)

			// ======= ОДНОРАЗОВАЯ ОТРИСОВКА СЕРЫХ ЛИНИЙ (treeRef) СПРАВА → НАЛЕВО =======
			if (treeRef.current) {
				const staticPaths = treeRef.current.querySelectorAll('path')

				const baseDelay = 0.3 // задержка перед стартом первой линии

				staticPaths.forEach((p: SVGPathElement, index) => {
					const length = p.getTotalLength()

					// Линия полностью спрятана и "стоит" справа
					gsap.set(p, {
						strokeDasharray: length,
						strokeDashoffset: -length,
					})

					// Прорисовка справа → налево
					gsap.to(p, {
						strokeDashoffset: 0,
						duration: 2.2,
						ease: 'power2.inOut',
						delay: baseDelay + index * 0.5, // асинхронно: одна за другой
					})
				})
			}

			// ======= ПУЛЬСЫ НА ВЕРХНЕМ СЛОЕ (pulseRef) — КАК БЫЛО, НО С ЛЁГКОЙ ЗАДЕРЖКОЙ =======
			if (pulseRef.current) {
				const pulsePaths = pulseRef.current.querySelectorAll('path')

				pulsePaths.forEach((p: SVGPathElement, index) => {
					const length = p.getTotalLength()
					const beamLength = 80 // длина "сигнала"

					// Одна короткая "черта" + длинный пробел
					gsap.set(p, {
						strokeDasharray: `${beamLength} ${length}`,
						strokeDashoffset: 0,
					})

					// Луч едет СПРАВА → НАЛЕВО
					gsap.fromTo(
						p,
						{ strokeDashoffset: -length }, // старт справа
						{
							strokeDashoffset: 0, // уезжает к левому концу
							duration: 6,
							repeat: -1,
							ease: 'none',
							delay: 2.5 + index * 0.9, // чтобы пошли после первоначальной отрисовки
						}
					)
				})
			}
		})

		return () => ctx.revert()
	}, [])

	return (
		<>
			<section className={styles.Hero}>
				<div className='container'>
					<div className={styles.titleWrapper}>
						<h1 ref={titleRef} className={`${styles.title} split`}>
							AI-автоматизация, серверные решения, веб-разработка и
							ИТ-аутсорсинг
						</h1>
						<h2 ref={subtitleRef} className={styles.subtitle}>
							Мы берём на себя ИТ-инфраструктуру, сервера и поддержку, а также
							внедряем ИИ-решения, чтобы ваш бизнес работал быстрее, стабильнее
							и дешевле.
						</h2>
					</div>

					

					<span className={styles.rightTree}>
						{/* Базовые линии (D5D9E5), которые один раз "рисуются" справа налево */}
						<svg
							ref={treeRef}
							xmlns='http://www.w3.org/2000/svg'
							width='600'
							height='420'
							viewBox='0 0 600 420'
							fill='none'
						>
							<path
								d='M 100 210 H 140 C 220 210 220 30 320 30 H 600'
								stroke='#D5D9E5'
								strokeWidth='2'
								strokeLinecap='round'
							/>
							<path
								d='M 0 210 H 140 C 220 210 220 150 320 150 H 600'
								stroke='#D5D9E5'
								strokeWidth='2'
								strokeLinecap='round'
							/>
							<path
								d='M 0 210 H 140 C 220 210 220 270 320 270 H 600'
								stroke='#D5D9E5'
								strokeWidth='2'
								strokeLinecap='round'
							/>
							<path
								d='M 0 210 H 140 C 220 210 220 390 320 390 H 600'
								stroke='#D5D9E5'
								strokeWidth='2'
								strokeLinecap='round'
							/>
						</svg>

						{/* Верхний слой — пульсирующие лучи */}
						<svg
							ref={pulseRef}
							xmlns='http://www.w3.org/2000/svg'
							width='600'
							height='420'
							viewBox='0 0 600 420'
							fill='none'
							className={styles.pulseLayer}
						>
							<path
								d='M 100 210 H 140 C 220 210 220 30 320 30 H 600'
								stroke='green'
								strokeWidth='2'
								strokeLinecap='round'
							/>
							<path
								d='M 0 210 H 140 C 220 210 220 150 320 150 H 600'
								stroke='green'
								strokeWidth='2'
								strokeLinecap='round'
							/>
							<path
								d='M 0 210 H 140 C 220 210 220 270 320 270 H 600'
								stroke='green'
								strokeWidth='2'
								strokeLinecap='round'
							/>
							<path
								d='M 0 210 H 140 C 220 210 220 390 320 390 H 600'
								stroke='green'
								strokeWidth='2'
								strokeLinecap='round'
							/>
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
