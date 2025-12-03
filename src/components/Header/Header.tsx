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
								All Services
							</Link>
						</li>
						<li className={styles.item}>
							<a className={styles.link} href='#'>
								About Us
							</a>
						</li>
						<li className={styles.item}>
							<a className={styles.link} href='#'>
								AI-Chat
							</a>
						</li>
						<li className={styles.item}>
							<a className={styles.link} href='#'>
								Contacts
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	)
}

export default Header
