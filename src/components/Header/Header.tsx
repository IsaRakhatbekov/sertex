import styles from './Header.module.scss'

const Header = () => {
	return (
		<div className={styles.Header}>
			<div className={`${styles.container} container`}>
				<nav className={styles.nav}>
					<a href='#' className={styles.logoWrapper}>
						{/* <img src="" alt="" /> */}
						SERTEXT
					</a>
					<ul className={styles.list}>
						<li className={styles.item}>
							<a className={styles.link} href='#'>
								All Services
							</a>
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
