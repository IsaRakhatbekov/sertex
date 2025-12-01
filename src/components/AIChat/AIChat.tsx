// components/DarkGlassCard/AiChat.jsx
import styles from './AiChat.module.scss'

const AiChat = () => {
	// Демонстрационные данные для визуала
	const messages = [
		{ id: 'm1', text: 'ИИ-Ассистент Онлайн', sender: 'ai', meta: '14:32' },
		{
			id: 'm2',
			text: 'Какие возможности у вашей системы аналитики?',
			sender: 'user',
			meta: '14:33',
		},
		{
			id: 'm3',
			text: 'Наша система предоставляет расширенную аналитку в реальном времени, прогнозирование трендов и автоматическую генерацию отчетов.',
			sender: 'ai',
			meta: '14:34',
		},
	]

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<span className={styles.statusDot} />
				<span className={styles.title}>ИИ-Ассистент</span>
				<span className={styles.kbd}>Online</span>
			</div>

			<div className={styles.chatArea} aria-label='messages'>
				{messages.map(m => (
					<div
						key={m.id}
						className={`${styles.message} ${
							m.sender === 'ai' ? styles.ai : styles.user
						}`}
					>
						<div className={styles.bubble}>
							<span className={styles.text}>{m.text}</span>
							<span className={styles.meta}>{m.meta}</span>
						</div>
					</div>
				))}
			</div>

			<div className={styles.inputRow}>
				<input
					className={styles.input}
					placeholder='Введите сообщение…'
					disabled
				/>
				<button className={styles.sendBtn} disabled>
					➤
				</button>
			</div>
		</div>
	)
}

export default AiChat
