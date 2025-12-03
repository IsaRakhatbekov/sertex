// components/DarkGlassCard/AiChat.jsx
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import styles from './AIChat.module.scss'

gsap.registerPlugin(ScrollTrigger)

const AiChat = () => {
	const sectionRef = useRef(null)
	const aiChatRef = useRef(null) // контейнер который "рисуется"
	const innerStackRef = useRef(null) // вертикальный стек пузырьков
	const bubble1Ref = useRef(null) // первый AI (dots -> текст)
	const bubble1TextRef = useRef(null)
	const bubble2Ref = useRef(null) // второй AI (CTA текст)
	const playedRef = useRef(false)

	const messages = [
		{ id: 1, text: 'Привет — это твой ИИ-ассистент', isUser: false },
		{ id: 2, text: 'Как могу помочь?', isUser: false },
	]

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			if (!aiChatRef.current) return

			// Принудительный вертикальный стек через JS (не меняем SCSS файлы)
			gsap.set(innerStackRef.current, {
				display: 'flex',
				flexDirection: 'column',
				gap: 12,
				alignItems: 'flex-start',
				width: '100%',
				boxSizing: 'border-box',
			})

			// Убедимся, что пузырьки блочные (чтобы не в ряд)
			gsap.set([bubble1Ref.current, bubble2Ref.current], {
				display: 'block',
				width: 'auto',
				maxWidth: '75%',
				boxSizing: 'border-box',
			})

			// Начальные состояния (всё через GSAP)
			gsap.set(aiChatRef.current, {
				opacity: 1,
				transformOrigin: 'center center',
				scaleX: 0,
				scaleY: 0.05,
				height: 2,
				overflow: 'hidden',
				boxSizing: 'border-box',
				width: '100%',
			})

			// Скрываем пузырьки
			gsap.set([bubble1Ref.current, bubble2Ref.current], {
				opacity: 0,
				y: 20,
				pointerEvents: 'none',
			})

			gsap.set(bubble1TextRef.current, {
				autoAlpha: 0,
				y: 6,
				display: 'inline-block',
			})

			// Timeline (paused)
			const tl = gsap.timeline({ paused: true })

			// Рисуем линию в стороны
			tl.to(
				aiChatRef.current,
				{ scaleX: 1, duration: 0.6, ease: 'power2.inOut' },
				0
			)
			// Раскрываем вверх/вниз
			tl.to(
				aiChatRef.current,
				{ scaleY: 1, height: 'auto', duration: 0.7, ease: 'power3.out' },
				'+=0.12'
			)

			// Показываем первый пузырёк
			tl.to(
				bubble1Ref.current,
				{
					opacity: 1,
					y: 0,
					duration: 0.5,
					ease: 'back.out(1.5)',
					pointerEvents: 'auto',
				},
				'+=0.01'
			)

			// Показываем текст первого пузырька
			tl.to(
				bubble1TextRef.current,
				{ autoAlpha: 1, y: 0, duration: 0.36, ease: 'power2.out' },
				'-=0.05'
			)

			// Небольшая пауза, показываем второй пузырёк (CTA текст) — никаких кнопок
			tl.to(
				bubble2Ref.current,
				{
					opacity: 1,
					y: 0,
					duration: 0.5,
					ease: 'back.out(1.4)',
					pointerEvents: 'auto',
				},
				'+=0.10'
			)

			// ScrollTrigger: запуск при видимости >= 20% и скролл вниз
			const st = ScrollTrigger.create({
				trigger: sectionRef.current,
				start: 'top bottom',
				end: 'top bottom',
				onUpdate(self) {
					if (
						self.progress >= 0.2 &&
						self.direction === 1 &&
						!playedRef.current
					) {
						playedRef.current = true
						tl.play()
					}
				},
				// markers: true, // включи для отладки если нужно
			})

			return () => {
				tl.kill()
				st.kill()
			}
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section className={styles.aiChat} ref={sectionRef}>
			<div className={`${styles.container} container`}>
				<div className={styles.titleWrapper}>
					<h2 className={styles.title}>
						Еще не нашли <span>что ищете?</span>
					</h2>
					<h3 className={styles.subtitle}>
						Наш <span>ИИ</span>-ассистент может вам помочь!
					</h3>
				</div>

				<div className={styles.chatWrapper}>
					<div className={styles.blur}></div>

					<div className={styles.chatWindow}>
						<div ref={aiChatRef} style={{ width: '100%' }}>
							<div ref={innerStackRef}>
								<div
									ref={bubble1Ref}
									className={styles.aiMsg}
									aria-live='polite'
								>
									<div className={styles.inner}>
										<span
											className={styles.aiText}
											ref={bubble1TextRef}
											style={{ display: 'inline-block' }}
										>
											{messages[0].text}
										</span>
									</div>
								</div>
								<div
									ref={bubble2Ref}
									className={styles.aiMsg}
									style={{ marginTop: 6 }}
								>
									<div className={styles.inner}>{messages[1].text}</div>
								</div>
							</div>
						</div>
					</div>

					<div className={styles.inputWrapper}>
						<input
							className={styles.input}
							type='text'
							placeholder='Напишите сообщение...'
						/>
						<button className={styles.btn} aria-label='send'>
							<svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
								<path
									d='M22 2L11 13'
									stroke='#202020'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M22 2L15 22L11 13L2 9L22 2Z'
									stroke='#202020'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AiChat
