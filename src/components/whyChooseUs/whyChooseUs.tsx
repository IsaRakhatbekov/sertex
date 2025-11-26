'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import styles from './whyChooseUs.module.scss'

gsap.registerPlugin(ScrollTrigger)

const WhyChooseUs = () => {
	const sectionRef = useRef<HTMLDivElement | null>(null)
	const circlesLayerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!sectionRef.current || !circlesLayerRef.current) return

		const ctx = gsap.context(() => {
			const circlesContainer = circlesLayerRef.current
			if (!circlesContainer) return

			// ---------- Генерация кружков ----------
			const circles: HTMLDivElement[] = []
			const AMOUNT = 120 // можно увеличить/уменьшить

			for (let i = 0; i < AMOUNT; i++) {
				const circle = document.createElement('div')
				circle.classList.add(styles.circle)

				// рандомное позиционирование по секции
				const x = Math.random() * 100
				const y = Math.random() * 100
				const scale = 0.5 + Math.random() * 1.8

				circle.style.left = `${x}%`
				circle.style.top = `${y}%`
				circle.style.transform = `translate(-50%, -50%) scale(${scale})`

				// чуть разный цвет/яркость
				const hue = 210 + Math.random() * 60 // сине-фиолетовая зона
				const alpha = 0.1 + Math.random() * 0.25
				circle.style.boxShadow = `0 0 0 1px hsla(${hue}, 70%, 70%, ${alpha})`

				circlesContainer.appendChild(circle)
				circles.push(circle)
			}

			// ---------- Анимация кружков к скроллу ----------
			gsap.fromTo(
				circles,
				{
					opacity: 0,
					y: 40,
				},
				{
					opacity: 1,
					y: -40,
					stagger: { amount: 1.2, from: 'random' },
					ease: 'power2.out',
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top 80%',
						end: 'bottom 20%',
						scrub: 0.7,
					},
				}
			)

			// ---------- Появление шагов по одному ----------
			const stepBlocks = gsap.utils.toArray<HTMLElement>(`.${styles.step}`)
			stepBlocks.forEach(el => {
				gsap.fromTo(
					el,
					{ y: 40, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 0.8,
						ease: 'power3.out',
						scrollTrigger: {
							trigger: el,
							start: 'top 85%',
							toggleActions: 'play none none reverse',
						},
					}
				)
			})
		}, sectionRef)

		return () => {
			ctx.revert()
		}
	}, [])

	return (
		<section className={styles.whyChooseUs} ref={sectionRef}>
			{/* Слой с кружками */}
			<div className={styles.circlesLayer} ref={circlesLayerRef} />

			<div className={`${styles.container} container`}>
				{/* SCROLL-индикатор в духе примера */}
				<div className={styles.scrollHint}>
					<span>SCROLL</span>
					<svg viewBox='0 0 24 24'>
						<line className={styles.st1} x1='12' y1='1' x2='12' y2='22.5' />
						<line
							className={styles.st1}
							x1='12.1'
							y1='22.4'
							x2='18.9'
							y2='15.6'
						/>
						<line
							className={styles.st1}
							x1='11.9'
							y1='22.4'
							x2='5.1'
							y2='15.6'
						/>
					</svg>
				</div>

				<div className={styles.steps}>
					<div className={styles.step}>
						<h3>Шаг 1 — Глубокая диагностика процессов</h3>
						<p>
							Понимаем, как работает ваш бизнес, где теряются ресурсы и что
							можно усилить технологиями.
						</p>
					</div>

					<div className={styles.step}>
						<h3>Шаг 2 — Создание устойчивой ИТ-архитектуры</h3>
						<p>
							Выстраиваем надёжные сервера, безопасность, доступы и
							резервирование — фундамент для роста.
						</p>
					</div>

					<div className={styles.step}>
						<h3>Шаг 3 — Интеллектуальная автоматизация и AI-ускорение</h3>
						<p>
							Внедряем ИИ-модули, автоматизируем рутину, соединяем сервисы в
							единую экосистему.
						</p>
					</div>

					<div className={styles.step}>
						<h3>Шаг 4 — Непрерывная поддержка и развитие 24/7</h3>
						<p>
							Гарантируем стабильность, мониторинг, улучшения и масштабируемость
							инфраструктуры.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default WhyChooseUs
