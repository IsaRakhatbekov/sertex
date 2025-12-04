'use client'

import React, { useState } from 'react'
import styles from './Services.module.scss'
interface ServiceCard {
	title: string
	description: string
}

const detailedServices: ServiceCard[] = [
	// РАЗРАБОТКА И ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ
	{
		title: 'Разработка Premium Сайтов',
		description:
			'Создание уникальных, высоконагруженных B2B/B2C платформ и сложных веб-приложений с индивидуальным дизайном.',
	},
	{
		title: 'B2B/B2C Решения с AI',
		description:
			'Внедрение Искусственного Интеллекта и Machine Learning для автоматизации продаж, аналитики и бизнес-процессов.',
	},
	{
		title: 'Корпоративный Intranet',
		description:
			'Разработка закрытых корпоративных порталов и внутренних систем для управления документацией и коммуникациями.',
	},
	{
		title: 'Разработка Корпоративного ПО',
		description:
			'Создание заказного, узкоспециализированного программного обеспечения под уникальные требования вашей компании.',
	},

	// ПЛАТФОРМЫ И DEVOPS
	{
		title: 'SaaS и PaaS Решения',
		description:
			'Развертывание и сопровождение облачных платформ (Software and Platform as a Service) для гибкости и масштабирования.',
	},
	{
		title: 'Docker и Kubernetes',
		description:
			'Внедрение контейнеризации для высокой доступности, быстрого развертывания и управления сложными микросервисами.',
	},
	{
		title: 'Виртуализация',
		description:
			'Оптимизация серверных мощностей через Virtualization для экономии ресурсов и гибкости инфраструктуры.',
	},
	{
		title: 'Server Sent Events (SSE)',
		description:
			'Внедрение технологий для однонаправленной передачи данных от сервера к клиенту в реальном времени (Real-time).',
	},

	// ИНФРАСТРУКТУРА И ХОСТИНГ
	{
		title: 'Web-Хостинг',
		description:
			'Надежный хостинг с высокой скоростью загрузки и защитой данных для всех ваших интернет-проектов.',
	},
	{
		title: 'Выделенные (Dedicated) Серверы',
		description:
			'Предоставление физических серверов в аренду с полным контролем над оборудованием и ресурсами.',
	},
	{
		title: 'Управляемые Серверы',
		description:
			'Полное администрирование, техническое сопровождение и проактивное обслуживание ваших серверов нашими инженерами.',
	},
	{
		title: 'Сетевая Инфраструктура',
		description:
			'Проектирование и настройка корпоративных локальных и удаленных сетей (VPN, WAN) для обеспечения стабильной работы.',
	},
	{
		title: 'Сетевая Инженерия',
		description:
			'Полный комплекс работ по подключению, настройке и обслуживанию сетевого оборудования и коммутации.',
	},
	{
		title: 'Мониторинг Серверов',
		description:
			'Круглосуточный автоматический мониторинг, предупреждение и оперативное устранение критических сбоев.',
	},

	// ПОДДЕРЖКА, АУТСОРСИНГ И КОНСАЛТИНГ
	{
		title: 'IT-Аудит',
		description:
			'Всесторонняя оценка существующей IT-инфраструктуры, поиск уязвимостей и разработка стратегии оптимизации.',
	},
	{
		title: 'Резервное Копирование (Backup)',
		description:
			'Настройка отказоустойчивых систем для автоматического и надежного резервного копирования критически важных данных.',
	},
	{
		title: 'Внедрение и Поддержка ERP/CRM',
		description:
			'Интеграция, кастомизация и сопровождение систем управления ресурсами и взаимоотношениями с клиентами.',
	},
	{
		title: 'Оптимизация работы 1С',
		description:
			'Профессиональная настройка, ускорение, доработка конфигураций и интеграция 1С:Предприятие с другими системами.',
	},
	{
		title: 'Управление Мобильными Устройствами',
		description:
			'Централизованное управление и защита корпоративных данных на мобильных устройствах сотрудников (MDM).',
	},
	{
		title: 'Перевод на Удаленную Работу',
		description:
			'Быстрое и безопасное развертывание инфраструктуры для дистанционной работы сотрудников и защиты данных вне офиса.',
	},
	{
		title: 'Предоставление IT-Персонала',
		description:
			'IT-аутстаффинг: предоставление квалифицированных специалистов (инженеров, разработчиков) на проект или на постоянную основу.',
	},
]

const ContactModal: React.FC<{ serviceTitle: string; onClose: () => void }> = ({
	serviceTitle,
	onClose,
}) => {
	const isGeneralRequest = serviceTitle === 'Общий запрос'
	const modalTitle = isGeneralRequest
		? 'Запрос по нескольким услугам'
		: `Заявка по услуге: ${serviceTitle}`

	return (
		<div className={styles.modalOverlay} onClick={onClose}>
			<div className={styles.modalContent} onClick={e => e.stopPropagation()}>
				<button className={styles.closeButton} onClick={onClose}>
					&times;
				</button>
				<h3>{modalTitle}</h3>
				{isGeneralRequest ? (
					<p>
						Опишите, какие услуги или задачи вас интересуют, и мы свяжемся с
						вами для уточнения деталей.
					</p>
				) : (
					<p>
						Вы выбрали услугу: <strong>{serviceTitle}</strong>
					</p>
				)}
				<form className={styles.modalForm}>
					<input type='text' placeholder='Ваше имя' required />
					<input type='tel' placeholder='Телефон' required />
					<input type='email' placeholder='Email (необязательно)' />
					{isGeneralRequest && (
						<textarea
							placeholder='Опишите ваши задачи и нужные услуги...'
							rows={4}
						></textarea>
					)}

					<button type='submit' className={styles.submitButton}>
						Связаться с нами
					</button>
				</form>
			</div>
		</div>
	)
}

const GeneralCta: React.FC<{ onOpenModal: (title: string) => void }> = ({
	onOpenModal,
}) => {
	return (
		<div className={styles.generalCtaBlock}>
			<h3 className={styles.ctaTitle}>Нужна комплексная IT-поддержка?</h3>
			<p className={styles.ctaText}>
				Если вы не уверены в выборе или ищете решение "под ключ", закажите общую
				консультацию. Мы подберем оптимальный набор услуг для вашего бизнеса.
			</p>
			<button
				className={styles.ctaButtonLarge}
				onClick={() => onOpenModal('Общий запрос')}
			>
				Заказать общую консультацию
			</button>
		</div>
	)
}
const Services: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedService, setSelectedService] = useState('')

	const handleOpenModal = (title: string) => {
		setSelectedService(title)
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		setSelectedService('')
	}

	return (
		<>
			<div className={styles.Services}>
				<div className={styles.dotesWrapper}>
					<svg
						style={{
							position: 'absolute',
							width: '100%',
							height: '100%',
							zIndex: 0,
						}}
						xmlns='http://www.w3.org/2000/svg'
					>
						<defs>
							<pattern
								id='dottedGrid'
								width='30'
								height='30'
								patternUnits='userSpaceOnUse'
							>
								<circle cx='2' cy='2' r='1' fill='rgba(0,0,0,0.10)' />
							</pattern>
						</defs>
						<rect width='100%' height='100%' fill='url(#dottedGrid)' />
					</svg>
				</div>
				<div className={`${styles.container} container`}>
					<h2 className={styles.mainTitle}>Полный спектр IT-услуг</h2>

					<div className={styles.gridWrapper}>
						{detailedServices.map((service, index) => (
							<div key={index} className={styles.serviceCard}>
								<div className={styles.icon}></div>
								<div className={styles.textWrapper}>
									<h3 className={styles.cardTitle}>{service.title}</h3>
									<p className={styles.cardDescription}>
										{service.description}
									</p>
								</div>
								<button
									className={styles.ctaButton}
									onClick={() => handleOpenModal(service.title)}
								>
									Заказать консультацию
								</button>
							</div>
						))}
					</div>

					<GeneralCta onOpenModal={handleOpenModal} />
				</div>
			</div>

			{isModalOpen && (
				<ContactModal
					serviceTitle={selectedService}
					onClose={handleCloseModal}
				/>
			)}
		</>
	)
}

export default Services
