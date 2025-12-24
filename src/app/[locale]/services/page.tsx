'use client'
import { memo, useRef, useState } from 'react'
import styles from './Services.module.scss'

const groupedServices = [
	{
		id: 'web-dev',
		title: 'Веб-разработка и ПО',
		services: [
			{
				title: 'Разработка Premium Сайтов',
				text: 'Создание уникальных, высоконагруженных B2B/B2C платформ и сложных веб-приложений с индивидуальным дизайном.',
			},
			{
				title: 'Корпоративный Intranet',
				text: 'Разработка закрытых корпоративных порталов и внутренних систем для управления документацией и коммуникациями.',
			},
			{
				title: 'Разработка Корпоративного ПО',
				text: 'Создание заказного, узкоспециализированного программного обеспечения под уникальные требования вашей компании.',
			},
			{
				title: 'Server Sent Events (SSE)',
				text: 'Внедрение технологий для однонаправленной передачи данных от сервера к клиенту в реальном времени (Real-time).',
			},
		],
	},
	{
		id: 'cloud',
		title: 'Облачные и серверные решения',
		services: [
			{
				title: 'SaaS и PaaS Решения',
				text: 'Развертывание и сопровождение облачных платформ (Software and Platform as a Service) для гибкости и масштабирования.',
			},
			{
				title: 'Docker и Kubernetes',
				text: 'Внедрение контейнеризации для высокой доступности, быстрого развертывания и управления сложными микросервисами.',
			},
			{
				title: 'Виртуализация',
				text: 'Оптимизация серверных мощностей через Virtualization для экономии ресурсов и гибкости инфраструктуры.',
			},
			{
				title: 'Web-Хостинг',
				text: 'Надежный хостинг с высокой скоростью загрузки и защитой данных для всех ваших интернет-проектов.',
			},
			{
				title: 'Выделенные (Dedicated) Серверы',
				text: 'Предоставление физических серверов в аренду с полным контролем над оборудованием и ресурсами.',
			},
			{
				title: 'Управляемые Серверы',
				text: 'Полное администрирование, техническое сопровождение и проактивное обслуживание ваших серверов нашими инженерами.',
			},
		],
	},
	{
		id: 'networking',
		title: 'Сетевые технологии',
		services: [
			{
				title: 'Сетевая Инфраструктура',
				text: 'Проектирование и настройка корпоративных локальных и удаленных сетей (VPN, WAN) для обеспечения стабильной работы.',
			},
			{
				title: 'Сетевая Инженерия',
				text: 'Полный комплекс работ по подключению, настройке и обслуживанию сетевого оборудования и коммутации.',
			},
		],
	},
	{
		id: 'security',
		title: 'Безопасность и инфраструктура',
		services: [
			{
				title: 'Мониторинг Серверов',
				text: 'Круглосуточный автоматический мониторинг, предупреждение и оперативное устранение критических сбоев.',
			},
			{
				title: 'IT-Аудит',
				text: 'Всесторонняя оценка существующей IT-инфраструктуры, поиск уязвимостей и разработка стратегии оптимизации.',
			},
			{
				title: 'Резервное Копирование (Backup)',
				text: 'Настройка отказоустойчивых систем для автоматического и надежного резервного копирования критически важных данных.',
			},
		],
	},
	{
		id: 'business',
		title: 'Бизнес-системы и AI-решения',
		services: [
			{
				title: 'B2B/B2C Решения с AI',
				text: 'Внедрение Искусственного Интеллекта и Machine Learning для автоматизации продаж, аналитики и бизнес-процессов.',
			},
			{
				title: 'Внедрение и Поддержка ERP/CRM',
				text: 'Интеграция, кастомизация и сопровождение систем управления ресурсами и взаимоотношениями с клиентами.',
			},
			{
				title: 'Оптимизация работы 1С',
				text: 'Профессиональная настройка, ускорение, доработка конфигураций и интеграция 1С:Предприятие с другими системами.',
			},
		],
	},
	{
		id: 'devices',
		title: 'Управление устройствами и работа',
		services: [
			{
				title: 'Управление Мобильными Устройствами',
				text: 'Централизованное управление и защита корпоративных данных на мобильных устройствах сотрудников (MDM).',
			},
			{
				title: 'Перевод на Удаленную Работу',
				text: 'Быстрое и безопасное развертывание инфраструктуры для дистанционной работы сотрудников и защиты данных вне офиса.',
			},
		],
	},
	{
		id: 'staff',
		title: 'IT-аутстаффинг',
		services: [
			{
				title: 'Предоставление IT-Персонала',
				text: 'IT-аутстаффинг: предоставление квалифицированных специалистов (инженеров, разработчиков) на проект или на постоянную основу.',
			},
		],
	},
]

const ServicesPage = () => {
	const [activeSection, setActiveSection] = useState('web-dev')
	const scrollContainerRef = useRef<HTMLDivElement>(null)

	const handleMenuClick = (sectionId: string) => {
		setActiveSection(sectionId)
		const element = document.getElementById(sectionId)
		if (element && scrollContainerRef.current) {
			// Плавный скролл внутри конкретного контейнера
			const containerTop =
				scrollContainerRef.current.getBoundingClientRect().top
			const elementTop = element.getBoundingClientRect().top
			const scrollPos =
				elementTop - containerTop + scrollContainerRef.current.scrollTop

			scrollContainerRef.current.scrollTo({
				top: scrollPos - 20, // небольшой отступ сверху
				behavior: 'smooth',
			})
		}
	}

	return (
		<section className={styles.Services}>
			<div className={styles.bgGlow1} />
			<div className={styles.bgGlow2} />

			<div className={`${styles.container} container`}>
				{/* Шапка всегда сверху */}
				<header className={styles.top}>
					<div className={styles.badgeWrapper}>
						<div className={styles.badge}>
							<span className={styles.badgeIcon}>✦</span>
							Our Expertise
						</div>
					</div>
					<h2 className={styles.mainTitle}>
						Полный спектр <span className={styles.accent}>IT</span>-услуг
					</h2>
				</header>

				<div className={styles.contentWrapper}>
					{/* Левое меню  */}
					<aside className={styles.sideMenu}>
						<div className={styles.menuHeader}>
							<span className={styles.menuTitle}>Категории услуг</span>
						</div>
						<ul className={styles.menuList}>
							{groupedServices.map(group => (
								<li key={group.id} className={styles.menuItem}>
									<button
										className={`${styles.menuButton} ${
											activeSection === group.id ? styles.active : ''
										}`}
										onClick={() => handleMenuClick(group.id)}
									>
										<span className={styles.menuButtonText}>{group.title}</span>
										<span className={styles.menuButtonCount}>
											{group.services.length}
										</span>
									</button>
								</li>
							))}
						</ul>
					</aside>

					{/* Правая часть с контентом и собственным скроллом */}
					<div className={styles.mainContent} ref={scrollContainerRef}>
						{groupedServices.map((group, groupIndex) => (
							<div key={group.id} id={group.id} className={styles.section}>
								<div className={styles.sectionHeader}>
									<span className={styles.sectionNumber}>
										{(groupIndex + 1).toString().padStart(2, '0')}
									</span>
									<h3 className={styles.sectionTitle}>{group.title}</h3>
									<div className={styles.sectionLine} />
								</div>

								<div className={styles.cardsGrid}>
									{group.services.map((service, serviceIndex) => (
										<div
											key={`${group.id}-${serviceIndex}`}
											className={styles.serviceCard}
										>
											<div className={styles.cardHeader}>
												<span className={styles.cardNumber}>
													{groupIndex + 1}.{serviceIndex + 1}
												</span>
												<h4 className={styles.cardTitle}>{service.title}</h4>
											</div>
											<p className={styles.cardText}>{service.text}</p>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default memo(ServicesPage)
