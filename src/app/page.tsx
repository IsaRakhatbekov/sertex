'use client'

import AIChat, { AIChatRef } from '@/components/AIChat/AIChat'
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
	const aiChatComponentRef = useRef<AIChatRef>(null)

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			// Получаем refs из компонента AIChat
			const aiChatRef = aiChatComponentRef.current?.aiChatRef
			const chatBubble1Ref = aiChatComponentRef.current?.chatBubble1Ref
			const chatBubble2Ref = aiChatComponentRef.current?.chatBubble2Ref
			const chatInputRef = aiChatComponentRef.current?.chatInputRef

			// Проверяем что все элементы существуют
			if (!aiChatRef || !chatBubble1Ref || !chatBubble2Ref || !chatInputRef) {
				return
			}

			// Устанавливаем начальное состояние
			gsap.set([chatBubble1Ref, chatBubble2Ref, chatInputRef], {
				opacity: 0,
				y: 20,
			})

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

			// Первый пузырек - начинается вместе с title
			mainTimeline.to(
				chatBubble1Ref,
				{
					opacity: 1,
					y: 0,
					duration: 0.5,
					ease: 'back.out(1.5)',
				},
				2 // Начинается с 0 секунды (вместе с title)
			)

			// Второй пузырек - с небольшой задержкой
			mainTimeline.to(
				chatBubble2Ref,
				{
					opacity: 1,
					y: 0,
					duration: 0.5,
					ease: 'back.out(1.5)',
				},
				2.4 // Начинается через 0.3 сек после начала
			)

			// Input - еще чуть позже
			mainTimeline.to(
				chatInputRef,
				{
					opacity: 1,
					y: 0,
					duration: 0.5,
					ease: 'back.out(1.5)',
				},
				0 // Начинается через 0.6 сек после начала
			)

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
					<div className={styles.titleWrapper}>
						<h1 ref={titleRef} className={`${styles.title} split`}>
							<span>AI</span>-автоматизация <br /> серверные{' '}
							<span>решения</span>
							<br />
							<span>ИТ</span>-аутсорсинг, веб-разработка
						</h1>
						<h2 ref={subtitleRef} className={styles.subtitle}>
							Мы берём на себя ИТ-инфраструктуру, сервера и поддержку, а также
							внедряем ИИ-решения, чтобы ваш бизнес работал быстрее, стабильнее
							и дешевле.
						</h2>

						<div className={styles.chatWrapper}>
							<AIChat ref={aiChatComponentRef} variant='default' />
						</div>
					</div>
				</div>
			</section>

			<section className={styles.WhatWeDo}>
				<div className='container'>
					<h2>Наши решения</h2>
					<ul className={styles.list}>
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
								<h3>Корпоративное ПО</h3>
								<p className={styles.text}>
									Создаём ПО под задачи компании: учёт, отчёты, процессы.
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

					<button>Посмотреть другие решения</button>
				</div>
			</section>

			{/* ========================================================== */}
			<section className={styles.Solutions}>
				<div className='container'>
					<div className={styles.wrapper}>
						<div className={styles.content}>
							<h2 className={styles.title}>Еще не нашли решение?</h2>
							{/* Изменен подзаголовок для выделения ИИ */}
							<h3 className={styles.subtitle}>
								Попробуйте воспользоваться нашим{' '}
								<span className={styles.aiAccent}>ИИ</span> помощником!
							</h3>
						</div>

						<div className={styles.chatWrapper}>
							<AIChat variant='solutions' />
						</div>
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
