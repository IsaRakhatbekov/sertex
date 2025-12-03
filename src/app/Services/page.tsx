import styles from './Services.module.scss'

const Services = () => {
	return (
		<div className={styles.Services}>
			<div className={`${styles.container} container`}>
				<h2>All Services</h2>
				<ul className={styles.list}>
					<li className={styles.item}></li>
					<li className={styles.item}></li>
					<li className={styles.item}></li>
					<li className={styles.item}></li>
					<li className={styles.item}></li>
				</ul>
			</div>
		</div>
	)
}

export default Services
