'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import styles from './About.module.scss'

gsap.registerPlugin(ScrollTrigger)

export default function AboutAnimation({
	children,
}: {
	children: React.ReactNode
}) {
	const rootRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			// Ищем элементы через классы твоего модуля
			const subTitles = rootRef.current?.querySelectorAll(`.${styles.subTitle}`)
			const topWrapper = rootRef.current?.querySelector(`.${styles.topWrapper}`)
			const paragraphs = rootRef.current?.querySelectorAll(
				`.${styles.topRight} .${styles.text}`
			)

			// 1. Анимация для subTitles (Опыт, Рост, Качество)
			if (subTitles && subTitles.length > 0 && topWrapper) {
				gsap.set(subTitles, { x: -1500 })

				gsap
					.timeline({
						scrollTrigger: {
							trigger: topWrapper,
							start: 'top 80%',
							end: 'bottom 90%',
							scrub: true,
						},
					})
					.to(subTitles, {
						x: 0,
						stagger: 0.2,
						duration: 0.8,
						ease: 'power3.out',
					})
			}

			// 2. Анимация для topRight paragraphs (Текстовые блоки)
			if (paragraphs && paragraphs.length > 0 && topWrapper) {
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
		}, rootRef)

		return () => ctx.revert() // Автоматически убивает все триггеры и анимации
	}, [])

	return (
		<div ref={rootRef} style={{ display: 'contents' }}>
			{children}
		</div>
	)
}
