'use client'

import { useEffect, useRef } from 'react'
import styles from './ParticleBackground.module.scss'

interface Particle {
	x: number
	y: number
	vx: number
	vy: number
	radius: number
}

const ParticleBackground = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const animationRef = useRef<number | null>(null)
	const particlesRef = useRef<Particle[]>([])

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		// Устанавливаем размер canvas
		const resizeCanvas = () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		}
		resizeCanvas()
		window.addEventListener('resize', resizeCanvas)

		// Создаём частицы
		const particleCount = 80
		const maxDistance = 150

		const createParticles = () => {
			particlesRef.current = []
			for (let i = 0; i < particleCount; i++) {
				particlesRef.current.push({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					vx: (Math.random() - 0.5) * 0.3,
					vy: (Math.random() - 0.5) * 0.3,
					radius: Math.random() * 2 + 1,
				})
			}
		}
		createParticles()

		// Анимация
		const animate = () => {
			// ПОЛНОСТЬЮ очищаем canvas (убираем шлейф)
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			const particles = particlesRef.current

			// Сначала рисуем все линии
			particles.forEach((particle, i) => {
				for (let j = i + 1; j < particles.length; j++) {
					const dx = particles[j].x - particle.x
					const dy = particles[j].y - particle.y
					const distance = Math.sqrt(dx * dx + dy * dy)

					if (distance < maxDistance) {
						const opacity = 1 - distance / maxDistance
						ctx.beginPath()
						// Светло-голубой цвет для линий
						ctx.strokeStyle = `rgba(100, 181, 246, ${opacity * 0.6})`
						ctx.lineWidth = 1.5
						ctx.moveTo(particle.x, particle.y)
						ctx.lineTo(particles[j].x, particles[j].y)
						ctx.stroke()
					}
				}
			})

			// Потом рисуем все точки (чтобы были поверх линий)
			particles.forEach(particle => {
				// Движение
				particle.x += particle.vx
				particle.y += particle.vy

				// Отскок от границ
				if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
				if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

				// Рисуем точку
				ctx.beginPath()
				ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
				// Яркий светло-голубой для точек
				ctx.fillStyle = '#64B5F6'
				ctx.shadowBlur = 15
				ctx.shadowColor = '#64B5F6'
				ctx.fill()
				ctx.shadowBlur = 0 // Сбрасываем тень
			})

			animationRef.current = requestAnimationFrame(animate)
		}

		animate()

		return () => {
			window.removeEventListener('resize', resizeCanvas)
			if (animationRef.current !== null) {
				cancelAnimationFrame(animationRef.current)
			}
		}
	}, [])

	return <canvas ref={canvasRef} className={styles.particleCanvas} />
}

export default ParticleBackground
