// Preloader.jsx
'use client'

import { useEffect, useState } from 'react'
import styles from './Preloader.module.scss'

export default function Preloader() {
	const [progress, setProgress] = useState(0)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const duration = 1500 // 1.5 секунды
		const fps = 60
		const totalFrames = (duration / 1000) * fps
		const increment = 100 / totalFrames

		const interval = setInterval(() => {
			setProgress(prev => {
				const next = prev + increment
				if (next >= 100) {
					clearInterval(interval)
					// Небольшая задержка перед скрытием прелоадера
					setTimeout(() => setIsLoading(false), 300)
					return 100
				}
				return next
			})
		}, 1000 / fps)

		return () => clearInterval(interval)
	}, [])

	// Если загрузка завершена, не рендерим ничего
	if (!isLoading) return null

	return (
		<div
			className={`${styles.preloader} ${
				progress === 100 ? styles.fadeOut : ''
			}`}
		>
			<div className={styles.content}>
				<div className={styles.sphere}>
					{/* Внутренняя сфера с пульсирующим градиентом */}
					<div className={styles.innerCircle}></div>
					{/* Кольца (волны) вокруг центра. Добавлено 4 кольца с задержкой анимации */}
					<div className={styles.ring} style={{ animationDelay: '0s' }}></div>
					<div className={styles.ring} style={{ animationDelay: '0.5s' }}></div>
					<div className={styles.ring} style={{ animationDelay: '1s' }}></div>
					<div className={styles.ring} style={{ animationDelay: '1.5s' }}></div>
					{/* Процент по центру */}
					<div className={styles.percentage}>{Math.floor(progress)}%</div>
				</div>
			</div>
		</div>
	)
}
