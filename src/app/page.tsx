'use client'

import AiChat from '@/components/AIChat/AIChat'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useLayoutEffect, useRef } from 'react'
import styles from './Home.module.scss'
gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger)

export default function Home() {
	const titleRef = useRef<HTMLHeadingElement | null>(null)
	const subtitleRef = useRef<HTMLHeadingElement | null>(null)
	const heroRef = useRef<HTMLElement | null>(null)
	const aboutRef = useRef<HTMLElement | null>(null)
	const topLeftRef = useRef<HTMLDivElement | null>(null)
	const whyRef = useRef<HTMLDivElement>(null)

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
					0.2 // Запуск через 0.2с после старта таймлайна (вместо '1')
				)
			}

			// Анимация подзаголовка
			if (subtitleRef.current) {
				const splitSubtitle = new SplitText(subtitleRef.current, {
					type: 'words',
					wordsClass: styles.word,
				})

				mainTimeline.from(
					splitSubtitle.words,
					{
						duration: 1,
						opacity: 0,
						y: 30,
						stagger: 0.02,
						ease: 'power3.out',
					},
					// Начинаем за 0.5 секунды до окончания анимации заголовка
					'-=0.5'
				)
			}

			// ---   АНИМАЦИИ ДЛЯ КНОПОК с clip-path ---
			const btnWrapper = document.querySelector(`.${styles.btnWrapper}`)
			if (btnWrapper) {
				const buttons = btnWrapper.querySelectorAll(`.${styles.btn}`)
				const btn1 = buttons[0]
				const btn2 = buttons[1]

				if (btn1 && btn2) {
					const btn1Text = btn1.querySelector('span')
					const btn2Text = btn2.querySelector('span')

					if (btn1Text && btn2Text) {
						gsap.set([btn1Text, btn2Text], { opacity: 0 })
					}

					gsap.set(buttons, { opacity: 1 })

					// 2. Анимация первой кнопки (раскрытие через clip-path)
					mainTimeline.to(
						btn1,
						{
							clipPath: 'inset(0% 0% 0% 0%)',
							duration: 1,
							ease: 'power3.out',
						},
						// Начинаем за 0.6 секунды до окончания анимации подзаголовка
						'-=0.6'
					)

					// 3. Анимация второй кнопки (раскрытие) И текста первой кнопки (появление) - одновременно
					mainTimeline.to(
						btn2,
						{
							clipPath: 'inset(0% 0% 0% 0%)',
							duration: 1,
							ease: 'power3.out',
						},
						// Начинаем за 0.3 секунды до окончания анимации первой кнопки
						'-=0.3'
					)

					if (btn1Text) {
						mainTimeline.to(
							btn1Text,
							{
								opacity: 1,
								duration: 0.5,
								ease: 'power1.inOut',
							},
							// Запускаем текст одновременно с началом анимации второй кнопки
							'<'
						)
					}

					// 4. Анимация текста второй кнопки (появление)
					if (btn2Text) {
						mainTimeline.to(
							btn2Text,
							{
								opacity: 1,
								duration: 0.5,
								ease: 'power1.inOut',
							},
							// Запускаем текст второй кнопки, когда ее раскрытие почти закончено
							'>-0.5'
						)
					}
				}
			}

			// --- ДРУГИЕ АНИМАЦИИ (ОСТАЮТСЯ БЕЗ ИЗМЕНЕНИЙ) ---
			if (topLeftRef.current) {
				const subTitles = topLeftRef.current.querySelectorAll(
					`.${styles.subTitle}`
				)
				const topWrapper = topLeftRef.current.parentElement

				if (topWrapper) {
					gsap.fromTo(
						subTitles,
						{ x: -1500 },
						{
							x: 0,
							stagger: 0.2,
							duration: 0.8,
							ease: 'power3.out',
							scrollTrigger: {
								trigger: topWrapper,
								start: 'top 80%',
								end: 'bottom 90%',
								scrub: true,
							},
						}
					)
				}
			}

			if (topLeftRef.current) {
				const topWrapper = topLeftRef.current.parentElement
				const topRight = topWrapper?.querySelector(`.${styles.topRight}`)

				if (topRight) {
					const paragraphs = topRight.querySelectorAll(`.${styles.text}`)

					gsap.set(paragraphs, { x: 200, opacity: 0 })

					ScrollTrigger.create({
						trigger: topWrapper,
						start: 'top 80%',
						onEnter: () => {
							gsap.to(paragraphs, {
								x: 0,
								opacity: 1,
								stagger: 0.2,
								duration: 0.8,
								ease: 'power3.out',
							})
						},
						once: true,
					})
				}
			}

			// Анимация для why items с stagger эффектом и анимацией внутренних элементов
			if (whyRef.current) {
				const whyItems = whyRef.current.querySelectorAll(`.${styles.item}`)

				// Установки начального состояния (без изменений)
				gsap.set(whyItems, {
					y: 100,
					opacity: 0,
				})

				whyItems.forEach(item => {
					const innerTitle = item.querySelector(`.${styles.innerTitle}`)
					const innerText = item.querySelector(`.${styles.innerText}`)

					if (innerTitle) {
						gsap.set(innerTitle, {
							y: 30,
							opacity: 0,
						})
					}

					if (innerText) {
						// !!! УСТАНОВКА НАЧАЛЬНОГО СОСТОЯНИЯ ДЛЯ ТЕКСТА !!!
						// Теперь мы будем анимировать строки, а не весь блок innerText.
						// SplitText еще не запущен, поэтому пока устанавливаем opacity: 0
						// и уберем y: 30, так как будем анимировать строки.
						gsap.set(innerText, {
							opacity: 0,
						})
					}
				})

				// Создаем главную timeline (без изменений)
				const mainWhyTimeline = gsap.timeline({
					scrollTrigger: {
						trigger: whyRef.current,
						start: 'top 70%',
						end: 'top 35%',
						scrub: true,
						toggleActions: 'play reverse play reverse',
					},
				})

				// Анимация для каждого блока
				whyItems.forEach((item, index) => {
					const innerTitle = item.querySelector(`.${styles.innerTitle}`)
					const innerText = item.querySelector(`.${styles.innerText}`)

					const position = index * 0.5

					// Блок (без изменений)
					mainWhyTimeline.to(
						item,
						{
							y: 0,
							opacity: 1,
							duration: 1,
							ease: 'power2.out',
						},
						position
					)

					// Заголовок (без изменений)
					if (innerTitle) {
						mainWhyTimeline.to(
							innerTitle,
							{
								y: 0,
								opacity: 1,
								duration: 0.7,
								ease: 'power3.out',
							},
							position + 0.8
						)
					}

					// Текст (ПОСТРОЧНАЯ АНИМАЦИЯ)
					if (innerText) {
						// 1. Делаем контейнер текста видимым (потому что его строки будут анимированы)
						mainWhyTimeline.to(
							innerText,
							{ opacity: 1, duration: 0.1 },
							position + 1.4 // Время начала анимации текста
						)

						// 2. Инициализируем SplitText для построчной анимации
						const splitText = new SplitText(innerText, {
							type: 'lines',
							linesClass: styles.line, // Используем класс для обрезки
						})

						// 3. Анимируем каждую строку
						mainWhyTimeline.from(
							splitText.lines,
							{
								y: 30, // Небольшое смещение снизу
								opacity: 0,
								stagger: 0.4, // Пауза между появлением строк
								duration: 1, // Продолжительность анимации для каждой строки
								ease: 'power2.out',
							},
							'<+0.1' // Начинаем почти сразу после того, как innerText стал видимым (с небольшим смещением)
						)
					}
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
							<a className={styles.btn} href='#aiSection'>
								Решите проблему с помощью ИИ
							</a>
							<a href='#WhatWeDo' className={styles.btn}>
								Наши услуги
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className={styles.WhatWeDo} id='WhatWeDo'>
				<div className='container'>
					<h2 className={styles.title}>Наши услуги</h2>
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

					<button className={styles.btn}>Еще</button>
				</div>
			</section>

			<AiChat />

			<section className={styles.about} ref={aboutRef}>
				<div className='container'>
					<h2 className={styles.title}>О нас</h2>

					<div className={styles.topWrapper}>
						<div className={styles.topLeft} ref={topLeftRef}>
							<h3 className={styles.subTitle}>Опыт</h3>
							<h3 className={styles.subTitle}>Рост</h3>
							<h3 className={styles.subTitle}>Качество</h3>
						</div>
						<div className={styles.topRight}>
							<p className={styles.text}>
								С 2005 года мы зарекомендовали себя как <span>надёжный </span>
								партнёр
							</p>
							<p className={styles.text}>
								Который мастерски сочетает глубокий опыт в
								<span> автоматизации</span> и проектировании сетей с
								предоставлением полного спектра IT-услуг.
							</p>
							<p className={styles.text}>
								Мы — растущая компания, для которой <span>качество</span> — это
								не опция, а стандарт!
							</p>
						</div>
					</div>
					<div className={styles.why} ref={whyRef}>
						<h2 className={styles.whyTitle}>Почему выбирают нас?</h2>
						<ul className={styles.list}>
							<li className={styles.item}>
								<h4 className={styles.innerTitle}>
									Интеллектуальная Автоматизация
								</h4>
								<p className={styles.innerText}>
									<span>Мы превращаем затраты в инвестиции.</span>
									<br />
									Внедряем системы ИИ и автоматизации, которые быстро окупаются.
									Вы получаете работу 24/7/365 без человеческого фактора,
									мгновенную четкость процессов и стабильный экспоненциальный
									рост.
								</p>
							</li>
							<li className={styles.item}>
								<h4 className={styles.innerTitle}>Гарантия Безопасности</h4>
								<p className={styles.innerText}>
									<span>
										Мы обеспечиваем бесперебойную защиту ваших активов.
									</span>
									<br />
									Используем проактивный подход (SSL-сертификаты, 24/7
									сканирование уязвимостей).
									<br /> Вы получаете полное спокойствие, подкреплённое
									постоянным мониторингом.
								</p>
							</li>
							<li className={styles.item}>
								<h4 className={styles.innerTitle}>Фокус на Бизнес-Целях</h4>
								<p className={styles.innerText}>
									<span>Мы делаем сложное простым.</span> <br />
									Полностью берем на себя всю техническую рутину (ПО,
									обслуживание, администрирование). <br />
									Наша задача — обеспечить чистую, понятную работу IT, чтобы вы
									могли без отвлечений достигать стратегических целей.
								</p>
							</li>
						</ul>
					</div>
				</div>
			</section>
		</>
	)
}
