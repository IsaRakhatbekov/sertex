'use client'

import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { useLocale, useTranslations } from 'next-intl'
import React, { memo, useEffect, useRef, useState } from 'react'
import styles from './Header.module.scss'

const Header = () => {
	const router = useRouter()
	const pathname = usePathname()
	const t = useTranslations('Header')
	const currentLocale = useLocale()

	const [isLangOpen, setIsLangOpen] = useState(false)
	const langRef = useRef<HTMLDivElement>(null)

	const handleScrollToSection = (
		e: React.MouseEvent<HTMLAnchorElement>,
		href: string
	) => {
		if (href.includes('#')) {
			e.preventDefault()
			const [path, hash] = href.split('#')
			if (path === pathname || path === '') {
				const element = document.getElementById(hash)
				if (element) {
					element.scrollIntoView({ behavior: 'smooth' })
				}
			} else {
				router.push(href)
			}
		}
	}
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (langRef.current && !langRef.current.contains(event.target as Node)) {
				setIsLangOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const switchLocale = (nextLocale: string) => {
		router.replace(pathname, { locale: nextLocale, scroll: false })
		setIsLangOpen(false)
	}

	const navItems = [
		{ href: '/services', label: t('services'), external: false },
		{ href: '/#about', label: t('about'), external: true },
		{ href: '/#chat', label: t('chat'), external: true },
		{ href: '/#footer', label: t('contacts'), external: true },
	]

	const languages = [
		{ code: 'ru', label: 'Русский' },
		{ code: 'en', label: 'English' },
		{ code: 'lv', label: 'Latviešu' },
	]

	return (
		<div className={styles.Header}>
			<div className={`${styles.container} container`}>
				<nav className={styles.nav}>
					<Link href={'/'} className={styles.logoWrapper}>
						<span className={styles.logoAccent}>SER</span>TEX
					</Link>

					<ul className={styles.list}>
						{navItems.map(item => (
							<li key={item.href} className={styles.item}>
								<Link
									className={styles.link}
									href={item.href}
									onClick={e => handleScrollToSection(e, item.href)}
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>

					<div className={styles.langSelector} ref={langRef}>
						<button
							className={styles.langBtn}
							onClick={() => setIsLangOpen(!isLangOpen)}
							type='button'
						>
							{currentLocale.toUpperCase()}
							<span
								className={`${styles.arrow} ${
									isLangOpen ? styles.arrowUp : ''
								}`}
							>
								▾
							</span>
						</button>

						{isLangOpen && (
							<div className={styles.dropdown}>
								{languages.map(lang => (
									<button
										key={lang.code}
										onClick={() => switchLocale(lang.code)}
										className={`${styles.dropdownItem} ${
											currentLocale === lang.code ? styles.active : ''
										}`}
										type='button'
									>
										{lang.label}
									</button>
								))}
							</div>
						)}
					</div>
				</nav>
			</div>
		</div>
	)
}

export default memo(Header)
