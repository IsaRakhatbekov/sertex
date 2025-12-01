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
								some
							</a>
						</li>
						<li className={styles.item}>
							<a className={styles.link} href='#'>
								some
							</a>
						</li>
						<li className={styles.item}>
							<a className={styles.link} href='#'>
								some
							</a>
						</li>
						<li className={styles.item}>
							<a className={styles.link} href='#'>
								some
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	)
}

export default Header
