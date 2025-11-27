'use client'

import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import styles from './Header.module.scss'

const Header = () => {
	const headerRef = useRef<HTMLElement | null>(null)
	const [isLanguageOpen, setIsLanguageOpen] = useState(false)
	const [currentLanguage, setCurrentLanguage] = useState('RU')

	const languages = [
		{ code: 'RU', name: 'Русский' },
		{ code: 'EN', name: 'English' },
		{ code: 'LV', name: 'Latviešu valoda' },
	]

	useEffect(() => {
		if (!headerRef.current) return

		// Жёстко задаём: едет СВЕРХУ ВНИЗ с bounce
		gsap.to(headerRef.current, {
			y: 0,
			opacity: 1,
			duration: 1,
			delay: 2,
			ease: 'bounce.out',
		})
	}, [])

	const handleLanguageSelect = (language: { code: string; name: string }) => {
		setCurrentLanguage(language.code)
		setIsLanguageOpen(false)
	}

	return (
		<header ref={headerRef} className={styles.Header}>
			<div className={`${styles.container} container`}>
				<nav className={styles.nav}>
					<div className={styles.logoWrapper}>sertex</div>
					<ul className={styles.list}>
						<li className={styles.item}>
							<a className={styles.link} href='#'>
								Услуги
							</a>
						</li>
						<li className={styles.item}>
							<a className={styles.link} href='#'>
								Продукты
							</a>
						</li>
						<li className={styles.item}>
							<a className={styles.link} href='#'>
								Поддержка
							</a>
						</li>
						<li className={styles.item}>
							<a className={styles.link} href='#'>
								Контакты
							</a>
						</li>
						<li className={styles.item}>
							<div className={styles.languageSwitcher}>
								<button
									className={styles.languageButton}
									onClick={() => setIsLanguageOpen(!isLanguageOpen)}
								>
									{currentLanguage}
									<svg
										className={`${styles.chevron} ${
											isLanguageOpen ? styles.chevronRotated : ''
										}`}
										width='12'
										height='8'
										viewBox='0 0 12 8'
										fill='none'
									>
										<path
											d='M1 1.5L6 6.5L11 1.5'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</button>

								{isLanguageOpen && (
									<div className={styles.languageDropdown}>
										{languages.map(language => (
											<button
												key={language.code}
												className={`${styles.languageOption} ${
													currentLanguage === language.code
														? styles.languageOptionActive
														: ''
												}`}
												onClick={() => handleLanguageSelect(language)}
											>
												<span className={styles.languageCode}>
													{language.code}
												</span>
												<span className={styles.languageName}>
													{language.name}
												</span>
											</button>
										))}
									</div>
								)}
							</div>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Header
