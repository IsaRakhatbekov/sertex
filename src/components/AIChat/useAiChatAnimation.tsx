'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

export const useAiChatAnimation = (
	sectionRef: React.RefObject<HTMLElement | null>,
	aiChatRef: React.RefObject<HTMLDivElement | null>,
	innerStackRef: React.RefObject<HTMLDivElement | null>,
	bubble1Ref: React.RefObject<HTMLDivElement | null>,
	bubble1TextRef: React.RefObject<HTMLSpanElement | null>,
	bubble2Ref: React.RefObject<HTMLDivElement | null>,
	playedRef: React.MutableRefObject<boolean>
) => {
	useLayoutEffect(() => {
		if (!aiChatRef.current) return

		// Начальные установки точно как в твоем коде
		if (innerStackRef.current) {
			gsap.set(innerStackRef.current, {
				display: 'flex',
				flexDirection: 'column',
				gap: 12,
				alignItems: 'flex-start',
				width: '100%',
				boxSizing: 'border-box',
			})
		}

		const bubbles = []
		if (bubble1Ref.current) bubbles.push(bubble1Ref.current)
		if (bubble2Ref.current) bubbles.push(bubble2Ref.current)

		if (bubbles.length > 0) {
			gsap.set(bubbles, {
				display: 'block',
				width: 'auto',
				maxWidth: '75%',
				boxSizing: 'border-box',
			})
		}

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

		if (bubbles.length > 0) {
			gsap.set(bubbles, { opacity: 0, y: 20, pointerEvents: 'none' })
		}

		if (bubble1TextRef.current) {
			gsap.set(bubble1TextRef.current, {
				autoAlpha: 0,
				y: 6,
				display: 'inline-block',
			})
		}

		const tl = gsap.timeline({ paused: true })

		tl.to(
			aiChatRef.current,
			{ scaleX: 1, duration: 0.6, ease: 'power2.inOut' },
			0
		)
		tl.to(
			aiChatRef.current,
			{ scaleY: 1, height: 'auto', duration: 0.7, ease: 'power3.out' },
			'+=0.12'
		)

		if (bubble1Ref.current) {
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
		}

		if (bubble1TextRef.current) {
			tl.to(
				bubble1TextRef.current,
				{ autoAlpha: 1, y: 0, duration: 0.36, ease: 'power2.out' },
				'-=0.05'
			)
		}

		if (bubble2Ref.current) {
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
		}

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
		})

		return () => {
			tl.kill()
			st.kill()
			if (aiChatRef.current) gsap.killTweensOf(aiChatRef.current)
			if (bubble1Ref.current) gsap.killTweensOf(bubble1Ref.current)
			if (bubble2Ref.current) gsap.killTweensOf(bubble2Ref.current)
			if (bubble1TextRef.current) gsap.killTweensOf(bubble1TextRef.current)
		}
	}, [])
}
