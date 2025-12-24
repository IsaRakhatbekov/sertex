'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const HeroAnimation = (
	heroRef: React.RefObject<HTMLDivElement | null>,
	titleRef: React.RefObject<HTMLHeadingElement | null>,
	btnWrapperRef: React.RefObject<HTMLDivElement | null>
) => {
	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			if (titleRef.current) {
				gsap.to(titleRef.current, {
					y: () => window.innerHeight * -0.1,
					ease: 'none',
					scrollTrigger: {
						trigger: heroRef.current,
						start: 'top top',
						end: 'bottom top',
						scrub: true,
					},
				})
			}

			if (btnWrapperRef.current) {
				gsap.to(btnWrapperRef.current, {
					y: () => window.innerHeight * -0.05,
					ease: 'none',
					scrollTrigger: {
						trigger: heroRef.current,
						start: 'top top',
						end: 'bottom top',
						scrub: true,
					},
				})
			}
		}, heroRef)

		return () => ctx.revert()
	}, [heroRef, titleRef, btnWrapperRef])
}
