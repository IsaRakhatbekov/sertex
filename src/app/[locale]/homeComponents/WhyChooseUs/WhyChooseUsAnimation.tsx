'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useLayoutEffect, useRef } from 'react'
import styles from './WhyChooseUs.module.scss'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface Props {
	children: React.ReactNode
}

export default function WhyChooseUsAnimation({ children }: Props) {
	const rootRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		// Контекст собирает все анимации, триггеры и сплиты внутри
		const ctx = gsap.context(() => {
			const whyItems = gsap.utils.toArray<HTMLElement>(`.${styles.item}`)

			if (whyItems.length > 0) {
				// Установка начальных состояний
				gsap.set(whyItems, {
					y: 100,
					opacity: 0,
				})

				const mainWhyTimeline = gsap.timeline({
					scrollTrigger: {
						trigger: rootRef.current,
						start: 'top 70%',
						end: 'top 35%',
						scrub: true,
						toggleActions: 'play reverse play reverse',
					},
				})

				whyItems.forEach((item, index) => {
					const innerTitle = item.querySelector<HTMLElement>(
						`.${styles.innerTitle}`
					)
					const innerText = item.querySelector<HTMLElement>(
						`.${styles.innerText}`
					)
					const position = index * 0.5

					// Анимация всей карточки
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

					// Анимация заголовка внутри карточки
					if (innerTitle) {
						gsap.set(innerTitle, {
							y: 30,
							opacity: 0,
						})

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

					// Анимация текста с разбиением на строки
					if (innerText) {
						gsap.set(innerText, { opacity: 0 })

						const splitText = new SplitText(innerText, {
							type: 'lines',
							linesClass: styles.line,
						})

						if (splitText.lines && splitText.lines.length > 0) {
							mainWhyTimeline.to(
								innerText,
								{ opacity: 1, duration: 0.1 },
								position + 1.4
							)

							mainWhyTimeline.from(
								splitText.lines,
								{
									y: 30,
									opacity: 0,
									stagger: 0.1,
									duration: 0.8,
									ease: 'power2.out',
								},
								'<+0.1'
							)
						} else {
							gsap.set(innerText, { opacity: 1 })
						}
					}
				})
			}
		}, rootRef)

		// ctx.revert() заменяет все твои ручные .kill() и массивы
		return () => ctx.revert()
	}, [])

	return <div ref={rootRef}>{children}</div>
}
