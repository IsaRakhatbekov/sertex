'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import styles from './WhatWeDo.module.scss'

gsap.registerPlugin(ScrollTrigger)

export default function WhatWeDoAnimation({
	children,
}: {
	children: React.ReactNode
}) {
	const rootRef = useRef<HTMLDivElement>(null)
	const svgRef = useRef<SVGSVGElement>(null)
	const mainPathRef = useRef<SVGPathElement>(null)
	const glowPathRef = useRef<SVGPathElement>(null)
	const animationTriggers = useRef<ScrollTrigger[]>([])

	const buildSnakePath = () => {
		const root = rootRef.current
		const mainPath = mainPathRef.current
		const glowPath = glowPathRef.current
		if (!root || !mainPath || !glowPath) return

		const list = root.querySelector(`.${styles.list}`)
		const items = Array.from(
			root.querySelectorAll(`.${styles.item}`)
		) as HTMLElement[]
		if (!list || items.length === 0) return

		const listRect = list.getBoundingClientRect()
		const width = listRect.width
		const radius = width < 480 ? 15 : 30

		svgRef.current?.setAttribute('viewBox', `0 0 ${width} ${listRect.height}`)

		let d = ''
		items.forEach((item, index) => {
			const rect = item.getBoundingClientRect()
			const top = rect.top - listRect.top
			const bottom = rect.bottom - listRect.top
			const isEven = index % 2 === 0

			if (index === 0) {
				d = `M 0.5 ${top + 0.5} L ${width - radius} ${top + 0.5}`
				d += ` Q ${width - 0.5} ${top + 0.5} ${width - 0.5} ${top + radius}`
				d += ` L ${width - 0.5} ${bottom - radius}`
			} else if (isEven) {
				d += ` Q 0.5 ${top + 0.5} ${radius} ${top + 0.5}`
				d += ` L ${width - radius} ${top + 0.5}`
				d += ` Q ${width - 0.5} ${top + 0.5} ${width - 0.5} ${top + radius}`
				d += ` L ${width - 0.5} ${bottom - radius}`
			} else {
				d += ` Q ${width - 0.5} ${top + 0.5} ${width - radius} ${top + 0.5}`
				d += ` L ${radius} ${top + 0.5}`
				d += ` Q 0.5 ${top + 0.5} 0.5 ${top + radius}`
				d += ` L 0.5 ${bottom - radius}`
			}
		})

		const lastIdx = items.length - 1
		const isLastEven = lastIdx % 2 === 0
		const centerX = width / 2
		const lastRect = items[lastIdx].getBoundingClientRect()
		const finalY = lastRect.bottom - listRect.top

		if (isLastEven) {
			d += ` Q ${width - 0.5} ${finalY + 0.5} ${width - radius} ${finalY + 0.5}`
			d += ` L ${centerX + radius} ${finalY + 0.5}`
			d += ` Q ${centerX} ${finalY + 0.5} ${centerX} ${finalY + radius}`
			d += ` L ${centerX} ${finalY + 100}`
		} else {
			d += ` Q 0.5 ${finalY + 0.5} ${radius} ${finalY + 0.5}`
			d += ` L ${centerX - radius} ${finalY + 0.5}`
			d += ` Q ${centerX} ${finalY + 0.5} ${centerX} ${finalY + radius}`
			d += ` L ${centerX} ${finalY + 100}`
		}

		mainPath.setAttribute('d', d)
		glowPath.setAttribute('d', d)
		return mainPath.getTotalLength()
	}

	const setupAnimations = () => {
		const length = buildSnakePath()
		if (!length) return

		const headLength = 60
		gsap.set(mainPathRef.current, {
			strokeDasharray: length,
			strokeDashoffset: length,
		})
		gsap.set(glowPathRef.current, {
			strokeDasharray: `${headLength}, ${length}`,
			strokeDashoffset: length + headLength,
		})

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: rootRef.current?.querySelector(`.${styles.list}`),
				start: 'top 70%',
				end: 'bottom 80%',
				scrub: 1.5,
			},
		})

		tl.to(mainPathRef.current, { strokeDashoffset: 0, ease: 'none' }, 0)
		tl.to(
			glowPathRef.current,
			{ strokeDashoffset: headLength, ease: 'none' },
			0
		)

		animationTriggers.current.push(tl.scrollTrigger!)
	}

	useEffect(() => {
		const timer = setTimeout(() => setupAnimations(), 200)
		const handleResize = () => {
			animationTriggers.current.forEach(t => t.kill())
			animationTriggers.current = []
			setupAnimations()
			ScrollTrigger.refresh()
		}
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
			animationTriggers.current.forEach(t => t.kill())
			clearTimeout(timer)
		}
	}, [])

	return (
		<div ref={rootRef} style={{ display: 'contents' }}>
			<svg
				ref={svgRef}
				className={styles.snakeSvg}
				fill='none'
				style={{ overflow: 'visible' }}
			>
				<path
					ref={mainPathRef}
					stroke='#202020'
					strokeWidth='1.5'
					opacity='0.2'
					vectorEffect='non-scaling-stroke'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					ref={glowPathRef}
					stroke='#7b5eea'
					strokeWidth='2.5'
					vectorEffect='non-scaling-stroke'
					strokeLinecap='round'
					strokeLinejoin='round'
					style={{ filter: 'drop-shadow(0 0 4px #7b5eea)' }}
				/>
			</svg>
			{children}
		</div>
	)
}
