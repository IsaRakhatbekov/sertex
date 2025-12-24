'use client'

import { useTranslations } from 'next-intl'
import { memo, useRef } from 'react'
import styles from './AIChat.module.scss'
import { useAiChatAnimation } from './useAiChatAnimation'

const AiChat = () => {
	const t = useTranslations('AiChat')
	const sectionRef = useRef<HTMLElement>(null)
	const aiChatRef = useRef<HTMLDivElement>(null)
	const innerStackRef = useRef<HTMLDivElement>(null)
	const bubble1Ref = useRef<HTMLDivElement>(null)
	const bubble1TextRef = useRef<HTMLSpanElement>(null)
	const bubble2Ref = useRef<HTMLDivElement>(null)
	const playedRef = useRef(false)
	const messages = [
		{ id: 1, text: t('messages.msg1'), isUser: false },
		{ id: 2, text: t('messages.msg2'), isUser: false },
	]

	useAiChatAnimation(
		sectionRef,
		aiChatRef,
		innerStackRef,
		bubble1Ref,
		bubble1TextRef,
		bubble2Ref,
		playedRef
	)

	return (
		<section className={styles.aiChat} ref={sectionRef} id='chat'>
			<div className={`${styles.container} container`}>
				<div className={styles.titleWrapper}>
					<h2 className={styles.title}>
						{t.rich('title', {
							span: chunks => <span>{chunks}</span>,
						})}
					</h2>
					<h3 className={styles.subtitle}>
						{t.rich('subtitle', {
							span: chunks => <span>{chunks}</span>,
						})}
					</h3>
				</div>

				<div className={styles.chatWrapper}>
					<div className={styles.blur}></div>

					<div className={styles.chatWindow}>
						<div ref={aiChatRef} style={{ width: '100%' }}>
							<div ref={innerStackRef}>
								<div
									ref={bubble1Ref}
									className={styles.aiMsg}
									aria-live='polite'
								>
									<div className={styles.inner}>
										<span
											className={styles.aiText}
											ref={bubble1TextRef}
											style={{ display: 'inline-block' }}
										>
											{messages[0].text}
										</span>
									</div>
								</div>
								<div
									ref={bubble2Ref}
									className={styles.aiMsg}
									style={{ marginTop: 6 }}
								>
									<div className={styles.inner}>{messages[1].text}</div>
								</div>
							</div>
						</div>
					</div>

					<div className={styles.inputWrapper}>
						<input
							className={styles.input}
							type='text'
							placeholder={t('placeholder')}
						/>
						<button className={styles.btn} aria-label='send'>
							<svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
								<path
									d='M22 2L11 13'
									stroke='#202020'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M22 2L15 22L11 13L2 9L22 2Z'
									stroke='#202020'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default memo(AiChat)
