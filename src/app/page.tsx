'use client'

import AIChat from '@/components/AiChat/AiChat'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useLayoutEffect, useRef } from 'react'
import styles from './Home.module.scss'

gsap.registerPlugin(SplitText, ScrollTrigger)

export default function Home() {
	const titleRef = useRef<HTMLHeadingElement | null>(null)
	const subtitleRef = useRef<HTMLHeadingElement | null>(null)
	const heroRef = useRef<HTMLElement | null>(null)

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			const mainTimeline = gsap.timeline()

			// Анимация заголовка (начинает сразу)
			if (titleRef.current) {
				const splitTitle = new SplitText(titleRef.current, {
					type: 'words,chars',
					wordsClass: styles.word,
					charsClass: styles.char,
				})

				mainTimeline.from(
					splitTitle.chars,
					{
						duration: 0.8,
						opacity: 0,
						y: 50,
						rotationX: -50,
						transformOrigin: '-100% -100% -10',
						stagger: 0.04,
						ease: 'back.out(0.4)',
					},
					1
				)
			}

			// Анимация подзаголовка
			if (subtitleRef.current) {
				const splitSubtitle = new SplitText(subtitleRef.current, {
					type: 'words',
					wordsClass: styles.word,
				})

				mainTimeline.from(splitSubtitle.words, {
					duration: 1,
					opacity: 0,
					y: 30,
					stagger: 0.02,
					ease: 'power3.out',
				})
			}
		})

		return () => ctx.revert()
	}, [])

	return (
		<>
			<section className={styles.Hero} ref={heroRef}>
				<div className={`${styles.container} container`}>
					<div className={styles.dotesWrapper}>
						<svg
							style={{
								position: 'absolute',
								width: '100%',
								height: '100%',
								zIndex: 0,
							}}
							xmlns='http://www.w3.org/2000/svg'
						>
							<defs>
								<pattern
									id='dottedGrid'
									width='30'
									height='30'
									patternUnits='userSpaceOnUse'
								>
									<circle cx='2' cy='2' r='1' fill='rgba(0,0,0,0.10)' />
								</pattern>
							</defs>
							<rect width='100%' height='100%' fill='url(#dottedGrid)' />
						</svg>
					</div>
					<div className={styles.titleWrapper}>
						<h1 ref={titleRef} className={`${styles.title} split`}>
							<span>AI</span>-автоматизация <br /> серверные
							<span> решения</span>
							<br />
							<span>ИТ</span>-аутсорсинг, веб-разработка
						</h1>
						<h2 ref={subtitleRef} className={styles.subtitle}>
							Мы берём на себя ИТ-инфраструктуру, сервера и поддержку, а также
							внедряем ИИ-решения, чтобы ваш бизнес работал быстрее, стабильнее
							и дешевле.
						</h2>
						<div className={styles.btnWrapper}>
							<button className={styles.btn}>
								Выберите услуги с помощью ИИ
							</button>
							<button className={styles.btn}>Наши решения</button>
						</div>
					</div>
				</div>
			</section>

			<section className={styles.WhatWeDo}>
				<div className='container'>
					<h2 className={styles.title}>Наши решения</h2>
					<ul className={styles.list}>
						<li className={styles.item}>
							<div className={styles.textWrapper}>
								<h3>Корпоративное ПО</h3>
								<p className={styles.text}>
									Создаём ПО под задачи компании: учёт, отчёты, процессы.
								</p>
							</div>
						</li>
						<li className={styles.item}>
							<div className={styles.textWrapper}>
								<h3>AI-решения</h3>
								<p className={styles.text}>
									Внедряем автоматизацию процессов и умных помощников.
								</p>
							</div>
						</li>
						<li className={styles.item}>
							<div className={styles.textWrapper}>
								<h3>Корпоративные системы</h3>
								<p className={styles.text}>
									Разрабатываем внутренние порталы, заявки, документы, процессы.
								</p>
							</div>
						</li>
						<li className={styles.item}>
							<div className={styles.textWrapper}>
								<h3>Облачные решения (SaaS/PaaS)</h3>
								<p className={styles.text}>
									Запускаем корпоративные сервисы, доступные сотрудникам и
									клиентам онлайн
								</p>
							</div>
						</li>
						<li className={styles.item}>
							<div className={styles.textWrapper}>
								<h3>Серверная инфраструктура</h3>
								<p className={styles.text}>
									Размещаем, настраиваем и обслуживаем серверы и хостинг.
								</p>
							</div>
						</li>

						<li className={styles.item}>
							<div className={styles.textWrapper}>
								<h3>Веб-разработка</h3>
								<p className={styles.text}>
									Создаём современные корпоративные сайты и онлайн-сервисы.
								</p>
							</div>
						</li>
						<li className={styles.item}>
							<div className={styles.textWrapper}>
								<h3>DevOps и интеграции</h3>
								<p className={styles.text}>
									Настраиваем автоматические обновления, связки и сценарии n8n.
								</p>
							</div>
						</li>
						<li className={styles.item}>
							<div className={styles.textWrapper}>
								<h3>Backup & Storage</h3>
								<p className={styles.text}>
									Обеспечиваем надёжное хранение данных и резервные копии.
								</p>
							</div>
						</li>
						<li className={styles.item}>
							<div className={styles.textWrapper}>
								<h3>Техподдержка 24/7</h3>
								<p className={styles.text}>
									Помогаем сотрудникам и следим за стабильностью систем.
								</p>
							</div>
						</li>
					</ul>

					<button className={styles.btn}>Узнайте больше об услугах </button>
				</div>
			</section>

			<section className={styles.aiSection}>
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						background: "url('../../public/test2.png') no-repeat center/cover",
						zIndex: -1, // ЗА ВСЕМ!
					}}
				/>
				<svg
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						zIndex: 0,
					}}
					xmlns='http://www.w3.org/2000/svg'
				>
					<defs>
						<pattern
							id='dottedGrid'
							width='30'
							height='30'
							patternUnits='userSpaceOnUse'
						>
							<circle cx='2' cy='2' r='1' fill='rgba(0,0,0,0.15)' />
						</pattern>
					</defs>
					<rect width='100%' height='100%' fill='url(#dottedGrid)' />
				</svg>

				<div className={styles.orb1} />
				<div className={styles.orb2} />
				<div className={styles.orb3} />
				<div className={styles.wrapper}>
					<div className={styles.titlesWrapper}>
						<h2 className={styles.title}>
							Еще не нашли <span>что ищете?</span>
						</h2>

						<h3 className={styles.subtitle}>
							Наш <span>ИИ</span>-ассистент может вам помочь!
						</h3>
					</div>
					<div className={styles.chatWrapper}>
						<AIChat />
					</div>
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
