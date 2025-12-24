'use client'
import gsap from 'gsap'
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import styles from './Preloader.module.scss'

const Preloader = () => {
	const lettersRef = useRef<(HTMLSpanElement | null)[]>([])
	const percentageRef = useRef<HTMLDivElement>(null)
	const preloaderRef = useRef<HTMLDivElement>(null)
	const columnsRef = useRef<(HTMLDivElement | null)[]>([])
	const contentWrapperRef = useRef<HTMLDivElement>(null)

	const word = 'SERTEX'
	const COLUMN_WIDTH = 80

	const [columnCount, setColumnCount] = useState<number | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		const globalHack = document.getElementById('global-preloader-hack')
		if (globalHack) {
			globalHack.remove()
		}

		const calculateColumns = () => {
			if (typeof window !== 'undefined') {
				const width = window.innerWidth
				setColumnCount(Math.ceil(width / COLUMN_WIDTH))
			}
		}

		calculateColumns()
		window.addEventListener('resize', calculateColumns)

		return () => window.removeEventListener('resize', calculateColumns)
	}, [])

	useEffect(() => {
		if (columnCount === null || isLoaded) {
			if (preloaderRef.current) {
				gsap.set(preloaderRef.current, { visibility: 'hidden' })
			}
			return
		}

		gsap.set(preloaderRef.current, {
			visibility: 'visible',
			opacity: 1,
			display: 'flex',
		})

		const elements = lettersRef.current.filter(
			(el): el is HTMLSpanElement => el !== null
		)
		const columns = columnsRef.current.filter(
			(el): el is HTMLDivElement => el !== null
		)

		gsap.set(elements, { x: 300, opacity: 0 })

		const masterTL = gsap.timeline({
			defaults: { ease: 'power1.out' },
			delay: 0.5,
			onComplete: () => {
				setIsLoaded(true)
			},
		})

		masterTL.to(elements, {
			x: 0,
			opacity: 1,
			duration: 0.8,
			stagger: 0.1,
		})

		const obj = { value: 0 }
		masterTL.to(
			obj,
			{
				value: 100,
				duration: 2,
				onUpdate: () => {
					if (percentageRef.current) {
						percentageRef.current.innerHTML = Math.round(obj.value) + '%'
					}
				},
			},
			'<0.2'
		)

		masterTL.addLabel('exitStart', '+=0.5')

		masterTL.to(
			elements,
			{
				x: -300,
				opacity: 0,
				duration: 0.6,
				ease: 'power1.in',
				stagger: 0.1,
			},
			'exitStart'
		)

		masterTL.to(
			contentWrapperRef.current,
			{
				opacity: 0,
				duration: 0.3,
			},
			'exitStart+=0.3'
		)

		masterTL.to(
			columns,
			{
				y: '-100vh',
				duration: 0.7,
				ease: 'power1.in',
				stagger: {
					amount: 0.7,
					from: 'start',
				},
			},
			'exitStart+=0.6'
		)

		return () => {
			masterTL.kill()
		}
	}, [columnCount, isLoaded])

	if (isLoaded) {
		return null
	}

	if (columnCount === null) {
		return (
			<div
				ref={preloaderRef}
				className={styles.Preloader}
				style={{ visibility: 'hidden' }}
			></div>
		)
	}

	const columnElements = Array.from({ length: columnCount }, (_, index) => (
		<div
			key={index}
			className={styles.column}
			style={{ width: `${COLUMN_WIDTH}px` }}
			ref={el => {
				columnsRef.current[index] = el
			}}
		/>
	))

	const dottedGridId = useMemo(
		() => `preloaderDottedGrid_${Math.random().toString(36).substring(2, 9)}`,
		[]
	)

	return (
		<div
			ref={preloaderRef}
			className={styles.Preloader}
			style={{ visibility: 'hidden' }}
		>
			<div className={styles.columnsWrapper}>
				<div className={styles.dotesWrapper}>
					<svg
						style={{
							position: 'absolute',
							width: '100%',
							height: '100%',
							zIndex: 1,
						}}
						xmlns='http://www.w3.org/2000/svg'
					>
						<defs>
							<pattern
								id={dottedGridId}
								width='30'
								height='30'
								patternUnits='userSpaceOnUse'
							>
								<circle cx='2' cy='2' r='1' fill='rgba(0,0,0,0.10)' />
							</pattern>
						</defs>
						<rect width='100%' height='100%' fill={`url(#${dottedGridId})`} />
					</svg>
				</div>

				{columnElements}
			</div>

			<div ref={contentWrapperRef} className={styles.contentWrapper}>
				<h1>
					{word.split('').map((letter, index) => (
						<span
							key={index}
							ref={el => {
								lettersRef.current[index] = el
							}}
						>
							{letter}
						</span>
					))}
				</h1>
				<div className={styles.percentageContainer}>
					<div ref={percentageRef} className={styles.percentage}>
						0%
					</div>
				</div>
			</div>
		</div>
	)
}

export default memo(Preloader)
