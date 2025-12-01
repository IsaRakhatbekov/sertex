// components/AIChat/AIChat.tsx
import {
	forwardRef,
	KeyboardEvent,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'
import styles from './AIChat.module.scss'

interface AIChatProps {
	variant?: 'default' | 'solutions'
}

export interface AIChatRef {
	aiChatRef: HTMLDivElement | null
	chatBubble1Ref: HTMLDivElement | null
	chatBubble2Ref: HTMLDivElement | null
	chatInputRef: HTMLDivElement | null
}

interface Message {
	id: number
	text: string
	sender: 'user' | 'ai'
	timestamp: Date
}

const AIChat = forwardRef<AIChatRef, AIChatProps>(
	({ variant = 'default' }, ref) => {
		const aiChatRef = useRef<HTMLDivElement>(null)
		const chatBubble1Ref = useRef<HTMLDivElement>(null)
		const chatBubble2Ref = useRef<HTMLDivElement>(null)
		const chatInputRef = useRef<HTMLDivElement>(null)
		const messagesEndRef = useRef<HTMLDivElement>(null)

		const [messages, setMessages] = useState<Message[]>([
			{
				id: 1,
				text: 'Привет! 👋 Чем могу помочь?',
				sender: 'ai',
				timestamp: new Date(),
			},
			{
				id: 2,
				text: 'Готов оптимизировать ваш бизнес с помощью AI! 🚀',
				sender: 'ai',
				timestamp: new Date(),
			},
		])
		const [inputValue, setInputValue] = useState('')
		const [isTyping, setIsTyping] = useState(false)

		useImperativeHandle(ref, () => ({
			aiChatRef: aiChatRef.current,
			chatBubble1Ref: chatBubble1Ref.current,
			chatBubble2Ref: chatBubble2Ref.current,
			chatInputRef: chatInputRef.current,
		}))

		// Автоскролл к последнему сообщению
		const scrollToBottom = () => {
			messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
		}

		// Отправка сообщения
		const handleSendMessage = () => {
			if (!inputValue.trim()) return

			// Добавляем сообщение пользователя
			const userMessage: Message = {
				id: Date.now(),
				text: inputValue,
				sender: 'user',
				timestamp: new Date(),
			}

			setMessages(prev => [...prev, userMessage])
			setInputValue('')
			setIsTyping(true)

			// Имитация ответа AI (замените на реальный API)
			setTimeout(() => {
				const aiMessage: Message = {
					id: Date.now() + 1,
					text: getAIResponse(inputValue),
					sender: 'ai',
					timestamp: new Date(),
				}
				setMessages(prev => [...prev, aiMessage])
				setIsTyping(false)
				scrollToBottom()
			}, 1000)

			scrollToBottom()
		}

		// Простые ответы AI (замените на реальный API)
		const getAIResponse = (input: string): string => {
			const lowerInput = input.toLowerCase()

			if (lowerInput.includes('привет') || lowerInput.includes('здравствуй')) {
				return 'Привет! Рад помочь вам с вопросами об AI и автоматизации! 😊'
			}
			if (lowerInput.includes('цена') || lowerInput.includes('стоимость')) {
				return 'Стоимость зависит от объема работ. Оставьте заявку, и мы предложим оптимальное решение! 💼'
			}
			if (lowerInput.includes('помощь') || lowerInput.includes('помочь')) {
				return 'Конечно! Я могу рассказать о наших услугах: AI-автоматизация, серверные решения, ИТ-аутсорсинг. Что вас интересует? 🤖'
			}

			return 'Интересный вопрос! Свяжитесь с нами для детальной консультации. Мы всегда рады помочь! 🚀'
		}

		// Отправка по Enter
		const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter' && !e.shiftKey) {
				e.preventDefault()
				handleSendMessage()
			}
		}

		return (
			<div className={`${styles.aiChat} ${styles[variant]}`} ref={aiChatRef}>
				<div className={styles.chatMessages}>
					{messages.map((message, index) => (
						<div
							key={message.id}
							className={`${styles.chatBubble} ${
								message.sender === 'user' ? styles.userBubble : ''
							}`}
							ref={
								index === 0
									? chatBubble1Ref
									: index === 1
									? chatBubble2Ref
									: null
							}
						>
							<div className={styles.bubbleContent}>
								{message.sender === 'ai' && index === 0 && (
									<span className={styles.bubbleLabel}>AI Assistant</span>
								)}
								<p className={styles.bubbleText}>{message.text}</p>
							</div>
						</div>
					))}

					{isTyping && (
						<div className={styles.chatBubble}>
							<div className={styles.bubbleContent}>
								<div className={styles.typingIndicator}>
									<span></span>
									<span></span>
									<span></span>
								</div>
							</div>
						</div>
					)}

					<div ref={messagesEndRef} />
				</div>

				<div className={styles.chatInput} ref={chatInputRef}>
					<input
						type='text'
						placeholder='Напишите ваш вопрос...'
						className={styles.input}
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						onKeyPress={handleKeyPress}
					/>
					<button
						className={styles.sendButton}
						onClick={handleSendMessage}
						disabled={!inputValue.trim()}
					>
						<svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
							<path
								d='M22 2L11 13'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M22 2L15 22L11 13L2 9L22 2Z'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>
				</div>
			</div>
		)
	}
)

AIChat.displayName = 'AIChat'

export default AIChat
