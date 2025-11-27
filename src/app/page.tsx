'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useLayoutEffect, useRef } from 'react'
import styles from './Home.module.scss'

gsap.registerPlugin(SplitText, ScrollTrigger)

export default function Home() {
	const titleRef = useRef<HTMLHeadingElement | null>(null)
	const subtitleRef = useRef<HTMLHeadingElement | null>(null)
	const rightTreeRef = useRef<SVGSVGElement | null>(null)
	const rightPulseRef = useRef<SVGSVGElement | null>(null)
	const leftTreeRef = useRef<SVGSVGElement | null>(null)
	const leftPulseRef = useRef<SVGSVGElement | null>(null)
	const heroRef = useRef<HTMLElement | null>(null)
	const verticalLineRef = useRef<SVGSVGElement | null>(null)

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			// ============================
			// 1. АНИМАЦИЯ ТЕКСТА
			// ============================
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

			tl.from(splitTitle.words, {
				duration: 1.2,
				opacity: 0,
				y: 50,
				rotationX: -90,
				transformOrigin: '50% 50% -50',
				stagger: 0.12,
				ease: 'back.out(1.4)',
			})

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

			// ============================
			// 2. ПРАВЫЕ ЛИНИИ (rightTree)
			//    ОДНОРАЗОВАЯ ОТРИСОВКА
			//    СПРАВА → НАЛЕВО
			// ============================
			if (rightTreeRef.current) {
				const staticPaths = rightTreeRef.current.querySelectorAll('path')
				const drawTl = gsap.timeline()
				const baseDelay = 0.3

				staticPaths.forEach((p: SVGPathElement, index: number) => {
					const length = p.getTotalLength()

					// линия спрятана справа
					gsap.set(p, {
						strokeDasharray: length,
						strokeDashoffset: -length,
					})

					drawTl.to(
						p,
						{
							strokeDashoffset: 0,
							duration: 2.2,
							ease: 'power2.inOut',
						},
						baseDelay + index * 0.5
					)
				})

				// после линий — логотипы справа прилетают справа
				drawTl.from(
					`.${styles.rightSideLogos}`,
					{
						x: 80,
						opacity: 0,
						duration: 0.8,
						stagger: 0.2,
						ease: 'power2.out',
					},
					'>-1'
				)
			}

			// ============================
			// 3. ПРАВЫЕ ПУЛЬСЫ (rightPulseRef)
			//    СПРАВА → НАЛЕВО + ШЛЕЙФ
			// ============================
			if (rightPulseRef.current) {
				const pulsePaths = rightPulseRef.current.querySelectorAll('path')

				pulsePaths.forEach((p: SVGPathElement, index: number) => {
					const length = p.getTotalLength()
					const beamLength = 50

					const clonesCount = 10 // сколько «кадров» в хвосте
					const trailDelay = 0.03 // задержка между ними
					const baseDelay = 1.5 + index * 0.9

					for (let i = 0; i < clonesCount; i++) {
						// первый — оригинальный path, дальше клоны
						const clone = i === 0 ? p : (p.cloneNode(true) as SVGPathElement)

						if (i > 0 && rightPulseRef.current) {
							rightPulseRef.current.appendChild(clone)
						}

						const opacity = 1 - i * 0.11 // 1, 0.78, 0.56, 0.34
						const strokeWidth = i === 0 ? 1.4 : 1 // голова чуть толще

						gsap.set(clone, {
							strokeDasharray: `${beamLength} ${length}`,
							strokeDashoffset: -length,
							opacity,
							strokeWidth,
						})

						gsap.fromTo(
							clone,
							{ strokeDashoffset: -length },
							{
								strokeDashoffset: 0,
								duration: 3.2,
								repeat: -1,
								ease: 'none',
								delay: baseDelay + i * trailDelay,
							}
						)
					}
				})
			}

			// ============================
			// 4. ЛЕВЫЕ ЛИНИИ (leftTree)
			//    ОДНОРАЗОВАЯ ОТРИСОВКА
			//    СЛЕВА → НАПРАВО
			// ============================
			if (leftTreeRef.current) {
				const leftPaths = leftTreeRef.current.querySelectorAll('path')
				const leftDrawTl = gsap.timeline()
				const baseDelayLeft = 0.3

				leftPaths.forEach((p: SVGPathElement, index: number) => {
					const length = p.getTotalLength()

					// линия спрятана слева
					gsap.set(p, {
						strokeDasharray: length,
						strokeDashoffset: length,
					})

					leftDrawTl.to(
						p,
						{
							strokeDashoffset: 0,
							duration: 2.2,
							ease: 'power2.inOut',
						},
						baseDelayLeft + index * 0.5
					)
				})

				// после линий — логотипы слева прилетают слева
				leftDrawTl.from(
					`.${styles.leftSideLogos}`,
					{
						x: -70,
						opacity: 0,
						duration: 0.9,
						stagger: 0.4,
						ease: 'power5.out',
					},
					'>-1'
				)
			}

			// ============================
			// 5. ЛЕВЫЕ ПУЛЬСЫ (leftPulseRef)
			//    СЛЕВА → НАПРАВО + ШЛЕЙФ
			// ============================
			if (leftPulseRef.current) {
				const leftPulsePaths = leftPulseRef.current.querySelectorAll('path')

				leftPulsePaths.forEach((p: SVGPathElement, index: number) => {
					const length = p.getTotalLength()
					const beamLength = 60
					const startOffset = length + beamLength

					const clonesCount = 4
					const trailDelay = 0.06
					const baseDelay = 1.5 + index * 0.9

					for (let i = 0; i < clonesCount; i++) {
						const clone = i === 0 ? p : (p.cloneNode(true) as SVGPathElement)

						if (i > 0 && leftPulseRef.current) {
							leftPulseRef.current.appendChild(clone)
						}

						const opacity = 1 - i * 0.22
						const strokeWidth = i === 0 ? 1.4 : 1

						gsap.set(clone, {
							strokeDasharray: `${beamLength} ${length}`,
							strokeDashoffset: startOffset,
							opacity,
							strokeWidth,
						})

						gsap.fromTo(
							clone,
							{ strokeDashoffset: startOffset },
							{
								strokeDashoffset: 0,
								duration: 3.2,
								repeat: -1,
								ease: 'none',
								delay: baseDelay + i * trailDelay,
							}
						)
					}
				})
			}

			// ============================
			// 6. ВЕРТИКАЛЬНАЯ ЛИНИЯ ПО СКРОЛЛУ
			//    СНИЗУ ВВЕРХ / ВВЕРХ ВНИЗ
			// ============================
			if (verticalLineRef.current && heroRef.current) {
				const line = verticalLineRef.current.querySelector('path')
				if (line) {
					const length = line.getTotalLength()

					// прячем линию полностью
					gsap.set(line, {
						strokeDasharray: length,
						strokeDashoffset: length,
					})

					gsap.to(line, {
						strokeDashoffset: 0,
						ease: 'none',
						scrollTrigger: {
							trigger: heroRef.current,
							start: 'top top',
							end: '+=300', // линия полностью дорисуется уже через ~300px скролла
							scrub: true, // всё ещё привязано к скроллу и обратно откатывается
						},
					})
				}
			}
		})

		return () => ctx.revert()
	}, [])

	return (
		<>
			<section className={styles.Hero} ref={heroRef}>
				<div className='container'>
					{/*  ЛЕВАЯ СХЕМА */}
					<span className={styles.leftTree}>
						<svg
							ref={leftTreeRef}
							xmlns='http://www.w3.org/2000/svg'
							width='900'
							height='600'
							viewBox='0 0 600 400'
							fill='none'
						>
							{/* верхняя основная линия */}
							<path
								d='M 0 120 H 180 Q 220 160 260 200 H 380'
								stroke='#D5D9E5'
								strokeWidth='1'
								strokeLinecap='round'
							/>

							{/* средняя линия */}
							<path
								d='M 0 200 H 260 H 380'
								stroke='#D5D9E5'
								strokeWidth='1'
								strokeLinecap='round'
							/>

							{/* нижняя основная линия */}
							<path
								d='M 0 280 H 180 Q 220 240 260 200 H 380'
								stroke='#D5D9E5'
								strokeWidth='1'
								strokeLinecap='round'
							/>

							{/* ДОП. ВЕРХНЯЯ ЛИНИЯ: сверху → прямо → под углом в верхнюю основную */}
							<path
								d='M 0 60 H 120 L 180 120'
								stroke='#D5D9E5'
								strokeWidth='1'
								strokeLinecap='round'
							/>

							{/* ДОП. НИЖНЯЯ ЛИНИЯ: снизу → прямо → под углом в нижнюю основную */}
							<path
								d='M 0 340 H 120 L 180 280'
								stroke='#D5D9E5'
								strokeWidth='1'
								strokeLinecap='round'
							/>
						</svg>

						{/* Верхний слой слева — пульсирующие лучи по тем же линиям */}
						<svg
							ref={leftPulseRef}
							xmlns='http://www.w3.org/2000/svg'
							width='900'
							height='600'
							viewBox='0 0 600 400'
							fill='none'
							className={styles.pulseLayer}
						>
							<path
								d='M 0 120 H 180 Q 220 160 260 200 H 380'
								stroke='green'
								strokeWidth='1'
								strokeLinecap='round'
							/>

							<path
								d='M 0 200 H 260 H 380'
								stroke='green'
								strokeWidth='1'
								strokeLinecap='round'
							/>

							<path
								d='M 0 280 H 180 Q 220 240 260 200 H 380'
								stroke='green'
								strokeWidth='1'
								strokeLinecap='round'
							/>

							{/* пульсы по верхней доп. линии */}
							<path
								d='M 0 60 H 120 L 180 120'
								stroke='green'
								strokeWidth='1'
								strokeLinecap='round'
							/>

							{/* пульсы по нижней доп. линии */}
							<path
								d='M 0 340 H 120 L 180 280'
								stroke='green'
								strokeWidth='1'
								strokeLinecap='round'
							/>
						</svg>
					</span>

					<div className={styles.leftSideLogosWrapper}>
						<div className={styles.leftSideLogos}></div>
						<div className={styles.leftSideLogos}></div>
						<div className={styles.leftSideLogos}></div>
						<div className={styles.leftSideLogos}></div>
					</div>

					<div className={styles.titleWrapper}>
						<h1 ref={titleRef} className={`${styles.title} split`}>
							<span>AI</span>-автоматизация, серверные решения, веб-разработка и
							ИТ-аутсорсинг
						</h1>
						<h2 ref={subtitleRef} className={styles.subtitle}>
							Мы берём на себя ИТ-инфраструктуру, сервера и поддержку, а также
							внедряем ИИ-решения, чтобы ваш бизнес работал быстрее, стабильнее
							и дешевле.
						</h2>
					</div>

					<div className={styles.rightSideLogosWrapper}>
						<div className={styles.rightSideLogos}></div>
						<div className={styles.rightSideLogos}></div>
						<div className={styles.rightSideLogos}></div>
						<div className={styles.rightSideLogos}></div>
					</div>

					{/* ПРАВАЯ СХЕМА */}
					<span className={styles.rightTree}>
						<svg
							ref={rightTreeRef}
							xmlns='http://www.w3.org/2000/svg'
							width='600'
							height='420'
							viewBox='0 0 600 420'
							fill='none'
						>
							<path
								d='M 100 210 H 140 C 220 210 220 30 320 30 H 600'
								stroke='#D5D9E5'
								strokeWidth='1'
								strokeLinecap='round'
							/>
							<path
								d='M 0 210 H 140 C 220 210 220 150 320 150 H 600'
								stroke='#D5D9E5'
								strokeWidth='1'
								strokeLinecap='round'
							/>
							<path
								d='M 0 210 H 140 C 220 210 220 270 320 270 H 600'
								stroke='#D5D9E5'
								strokeWidth='1'
								strokeLinecap='round'
							/>
							<path
								d='M 0 210 H 140 C 220 210 220 390 320 390 H 600'
								stroke='#D5D9E5'
								strokeWidth='1'
								strokeLinecap='round'
							/>
						</svg>

						{/* Верхний слой */}
						<svg
							ref={rightPulseRef}
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
								strokeWidth='1'
								strokeLinecap='round'
							/>
							<path
								d='M 0 210 H 140 C 220 210 220 150 320 150 H 600'
								stroke='green'
								strokeWidth='1'
								strokeLinecap='round'
							/>
							<path
								d='M 0 210 H 140 C 220 210 220 270 320 270 H 600'
								stroke='green'
								strokeWidth='1'
								strokeLinecap='round'
							/>
							<path
								d='M 0 210 H 140 C 220 210 220 390 320 390 H 600'
								stroke='green'
								strokeWidth='1'
								strokeLinecap='round'
							/>
						</svg>
					</span>

					{/* ВЕРТИКАЛЬНАЯ ЛИНИЯ */}
					<span className={styles.verticalLine}>
						<svg
							ref={verticalLineRef}
							xmlns='http://www.w3.org/2000/svg'
							width='2'
							height='250'
							viewBox='0 0 2 400'
							fill='none'
						>
							<path
								d='M 1 0 V 400'
								stroke='#D5D9E5'
								strokeWidth='3'
								strokeLinecap='round'
							/>
						</svg>
					</span>
				</div>
			</section>

			<section className={styles.WhatWeDo}>
				<div className='container'>
					<h2>Наши решения</h2>

					<ul className={styles.list}>
						<li className={styles.item}>
							<div className={styles.iconWrapper}></div>
							<h3>🌐 Веб-разработка</h3>
							<p className={styles.text}>
								Создаём современные корпоративные сайты и онлайн-сервисы.
							</p>
						</li>
						<li className={styles.item}>
							<div className={styles.iconWrapper}></div>
							<h3>🤖 AI-решения</h3>
							<p className={styles.text}>
								Внедряем автоматизацию процессов и умных помощников.
							</p>
						</li>
						<li className={styles.item}>
							<div className={styles.iconWrapper}></div>
							<h3>🏢 Корпоративные системы</h3>
							<p className={styles.text}>
								Разрабатываем внутренние порталы, заявки, документы, процессы.
							</p>
						</li>
						<li className={styles.item}>
							<div className={styles.iconWrapper}></div>
							<h3>Облачные решения (SaaS/PaaS)</h3>
							<p className={styles.text}>
								Запускаем корпоративные сервисы, доступные сотрудникам и
								клиентам онлайн
							</p>
						</li>
						<li className={styles.item}>
							<div className={styles.iconWrapper}></div>
							<h3>🖥️ Серверная инфраструктура</h3>
							<p className={styles.text}>
								Размещаем, настраиваем и обслуживаем серверы и хостинг.
							</p>
						</li>
						<li className={styles.item}>
							<div className={styles.iconWrapper}></div>
							<h3>Корпоративное ПО</h3>
							<p className={styles.text}>
								Создаём ПО под задачи компании: учёт, отчёты, процессы.
							</p>
						</li>
						<li className={styles.item}>
							<div className={styles.iconWrapper}></div>
							<h3>DevOps и интеграции</h3>
							<p className={styles.text}>
								Настраиваем автоматические обновления, связки и сценарии n8n.
							</p>
						</li>
						<li className={styles.item}>
							<div className={styles.iconWrapper}></div>
							<h3>Backup & Storage</h3>
							<p className={styles.text}>
								Обеспечиваем надёжное хранение данных и резервные копии.
							</p>
						</li>
						<li className={styles.item}>
							<div className={styles.iconWrapper}></div>
							<h3>Техподдержка 24/7</h3>
							<p className={styles.text}>
								Помогаем сотрудникам и следим за стабильностью систем.
							</p>
						</li>
					</ul>

					<button>Посмотреть детально</button>
				</div>
			</section>

			{/* ========================================================== */}
			<section className={styles.Solutions}>
				<div className='container'>
					<h2>Solutions</h2>
					<h3>problems -- solutions</h3>
				</div>
			</section>
			<section className={styles.Details}>
				<div className='container'>
					<h2>Details</h2>
				</div>
			</section>
		</>
	)
}
