import Link from 'next/link' // Используем Next.js Link для навигации
import styles from './Footer.module.scss'

const Footer = () => {
	// Данные для ссылок можно вынести в отдельный файл или объект
	const quickLinks = [
		{ name: 'Все Услуги', href: '#services' },
		{ name: 'О нас', href: '#about-us' },
		{ name: 'AI-Чат', href: '#ai-chat' },
		{ name: 'Контакты', href: '#contacts' },
	]

	const serviceLinks = [
		{ name: 'Корпоративное ПО', href: '#corp-soft' },
		{ name: 'AI-решения', href: '#ai-solutions' },
		{ name: 'Серверная инфраструктура', href: '#server-infra' },
		{ name: 'Веб-разработка', href: '#web-dev' },
	]

	return (
		<footer className={styles.Footer} id='footer'>
			<div className={`${styles.container} container`}>
				<div className={styles.FooterContent}>
					{/* Колонка 1: Бренд и Контакты */}
					<div className={styles.BrandColumn}>
						<div className={styles.Logo}>SERTEXT</div>
						<p className={styles.Tagline}>
							Ваш надежный IT-партнер: AI-автоматизация, серверные решения и
							аутсорсинг.
						</p>

						<div className={styles.ContactInfo}>
							<p>📞 +XXX XXX XX XX</p>
							<p>📧 info@sertext.com</p>
							<p>📍 Meiranu str. 3, Riga, LV-1073, Latvia</p>
						</div>
					</div>

					{/* Колонка 2: Навигация */}
					<div className={styles.NavColumn}>
						<h4 className={styles.ColumnTitle}>Навигация</h4>
						<ul>
							{quickLinks.map(link => (
								<li key={link.name}>
									<Link href={link.href}>{link.name}</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Колонка 3: Услуги */}
					<div className={styles.NavColumn}>
						<h4 className={styles.ColumnTitle}>Наши Услуги</h4>
						<ul>
							{serviceLinks.map(link => (
								<li key={link.name}>
									<Link href={link.href}>{link.name}</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<hr className={styles.Divider} />

				{/* Нижняя строка: Копирайт и Юр.инфо */}
				<div className={styles.FooterBottom}>
					<p className={styles.Copyright}>
						&copy; B2B EU Ltd. Все права защищены.
					</p>
					<div className={styles.LegalInfo}>
						<p>Per. No. 50103622361</p>
						<p>НДС: LV50103622361</p>
					</div>
					<p className={styles.Developer}>
						Разработано{' '}
						<a
							href='https://digitallex.com'
							target='_blank'
							rel='noopener noreferrer'
						>
							SERTEX
						</a>
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
