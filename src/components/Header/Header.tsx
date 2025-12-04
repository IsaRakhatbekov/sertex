import Link from 'next/link'
import styles from './Header.module.scss'

const Header = () => {
	return (
		<div className={styles.Header}>
			<div className={`${styles.container} container`}>
				<nav className={styles.nav}>
					<Link href={'/'} className={styles.logoWrapper}>
						{/* <img src="" alt="" /> */}
						SERTEXT
					</Link>
					<ul className={styles.list}>
						<li className={styles.item}>
							<Link className={styles.link} href={'/services'}>
								Все Услуги
							</Link>
						</li>
						<li className={styles.item}>
							<a className={styles.link} href='#'>
								О нас
							</a>
						</li>
						<li className={styles.item}>
							<a className={styles.link} href='#'>
								AI-Чат
							</a>
						</li>
						<li className={styles.item}>
							<a className={styles.link} href='#'>
								Контакты
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	)
}

export default Header
