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
	const heroRef = useRef<HTMLElement | null>(null)
	const aiChatRef = useRef<HTMLDivElement | null>(null)
	const chatBubble1Ref = useRef<HTMLDivElement | null>(null)
	const chatBubble2Ref = useRef<HTMLDivElement | null>(null)
	const chatInputRef = useRef<HTMLDivElement | null>(null)

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			// ============================
			// 1. АНИМАЦИЯ МИНИ-ЧАТА (ПЕРВЫМ!)
			// ============================

			// Начальное состояние - чат полностью скрыт
			gsap.set(aiChatRef.current, {
				opacity: 1,
				scaleX: 0,
				scaleY: 0.05,
				height: 2,
			})

			gsap.set(
				[chatBubble1Ref.current, chatBubble2Ref.current, chatInputRef.current],
				{
					opacity: 0,
					y: 20,
				}
			)

			// Главный timeline
			const mainTimeline = gsap.timeline()

			// 1. Рисуем линию от центра в стороны
			mainTimeline.to(aiChatRef.current, {
				scaleX: 1,
				duration: 0.6,
				ease: 'power2.inOut',
			})

			// 2. Расширяем вверх и вниз
			mainTimeline.to(
				aiChatRef.current,
				{
					scaleY: 1,
					height: 'auto',
					duration: 0.7,
					ease: 'power3.out',
				},
				'+=0.2'
			)

			// 3. Появление первого сообщения
			mainTimeline.to(
				chatBubble1Ref.current,
				{
					opacity: 1,
					y: 0,
					duration: 0.5,
					ease: 'back.out(1.5)',
				},
				'+=0.3'
			)

			// 4. Появление второго сообщения
			mainTimeline.to(
				chatBubble2Ref.current,
				{
					opacity: 1,
					y: 0,
					duration: 0.5,
					ease: 'back.out(1.5)',
				},
				'+=0.3'
			)

			// 5. Появление поля ввода
			mainTimeline.to(
				chatInputRef.current,
				{
					opacity: 1,
					y: 0,
					duration: 0.5,
					ease: 'back.out(1.5)',
				},
				'+=0.2'
			)

			// ============================
			// 2. АНИМАЦИЯ TITLE (через 0.5 сек после начала чата)
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

			// Title начинается через 0.5 секунды от начала (не от конца чата!)
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
				1 // Начинается на 0.5 секунде от начала timeline
			)

			// ============================
			// 3. SUBTITLE (после окончания title)
			// ============================
			// Вычисляем когда закончится title: 0.5 (delay) + 0.8 (duration) + (кол-во символов * 0.04 stagger)
			// Примерно на 2-3 секунде, поэтому используем '-=0' чтобы начать сразу после title
			mainTimeline.from(
				splitSubtitle.words,
				{
					duration: 1,
					opacity: 0,
					y: 30,
					stagger: 0.02,
					ease: 'power3.out',
				}
				// Без позиции - начнется сразу после предыдущей анимации
			)
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

						{/* Мини-чат */}
						<div className={styles.aiChat} ref={aiChatRef}>
							<div className={styles.chatMessages}>
								{/* Сообщение от AI */}
								<div className={styles.chatBubble} ref={chatBubble1Ref}>
									<div className={styles.bubbleContent}>
										<span className={styles.bubbleLabel}>AI Assistant</span>
										<p className={styles.bubbleText}>
											Привет! 👋 Чем могу помочь?
										</p>
									</div>
								</div>

								{/* Второе сообщение от AI */}
								<div className={styles.chatBubble} ref={chatBubble2Ref}>
									<div className={styles.bubbleContent}>
										<p className={styles.bubbleText}>
											Готов оптимизировать ваш бизнес с помощью AI! 🚀
										</p>
									</div>
								</div>
							</div>

							{/* Поле ввода */}
							<div className={styles.chatInput} ref={chatInputRef}>
								<input
									type='text'
									placeholder='Напишите ваш вопрос...'
									className={styles.input}
									// disabled — убери эту строку!
								/>
								<button className={styles.sendButton}>
									<svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
										<path
											d='M22 2L11 13'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
										<path
											d='M22 2L15 22L11 13L2 9L22 2Z'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</button>
							</div>
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
