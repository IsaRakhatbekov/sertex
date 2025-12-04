'use client'

import Link from 'next/link'
// Нам нужно импортировать хуки для работы с роутингом
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import styles from './Header.module.scss'

// Внимание: Этот компонент будет использовать клиентский рендеринг (из-за 'use client')
const Header = () => {
	const router = useRouter()
	const pathname = usePathname() // Для определения текущего маршрута

	// Эта функция обрабатывает клик
	const handleScrollToSection = (
		e: React.MouseEvent<HTMLAnchorElement>,
		href: string
	) => {
		// Предотвращаем стандартное действие (переход)
		e.preventDefault()

		// Разбиваем href на путь и якорь: '/path#id' -> ['/path', 'id']
		const [path, hash] = href.split('#')

		// Проверяем, находится ли якорь на ТЕКУЩЕЙ странице
		if (path === pathname) {
			// Если на текущей странице, используем стандартную прокрутку
			document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
		} else {
			// Если нужно перейти на ДРУГУЮ страницу (например, с '/' на '/services')
			// 1. Сначала переходим на страницу.
			router.push(href)

			// 2. Логику прокрутки к якорю запустит компонент целевой страницы
		}
	}

	// --- Массив ссылок для удобства ---
	const navItems = [
		{ href: '/services', label: 'Все Услуги', external: false },
		{ href: '/#about', label: 'О нас', external: true },
		{ href: '/#chat', label: 'AI-Чат', external: true },
		{ href: '/#footer', label: 'Контакты', external: true },
	]

	return (
		<div className={styles.Header}>
			<div className={`${styles.container} container`}>
				<nav className={styles.nav}>
					<Link href={'/'} className={styles.logoWrapper}>
						{/* <img src="" alt="" /> */}
						SERTEXT
					</Link>
					<ul className={styles.list}>
						{navItems.map(item => {
							const isAnchorLink = item.href.includes('#')

							if (!isAnchorLink) {
								// Обычная ссылка Next.js (например, /services)
								return (
									<li key={item.href} className={styles.item}>
										<Link className={styles.link} href={item.href}>
											{item.label}
										</Link>
									</li>
								)
							} else {
								// Ссылка с якорем
								return (
									<li key={item.href} className={styles.item}>
										<a
											className={styles.link}
											href={item.href}
											onClick={e => handleScrollToSection(e, item.href)}
										>
											{item.label}
										</a>
									</li>
								)
							}
						})}
					</ul>
				</nav>
			</div>
		</div>
	)
}

export default Header
