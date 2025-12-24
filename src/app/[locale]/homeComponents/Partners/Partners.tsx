import Image from 'next/image'
import logo3 from '../../../../public/dellemc.png'
import logo4 from '../../../../public/hewlett.jpeg'
import logo2 from '../../../../public/lenovo.jpeg'
import logo1 from '../../../../public/micro.png'
import styles from './Partners.module.scss'

const Partners = () => {
	const partnerLogos = [
		{ id: 1, src: logo1, alt: 'Microsoft Partner' },
		{ id: 2, src: logo2, alt: 'Lenovo Partner' },
		{ id: 3, src: logo3, alt: 'DELL EMC Partner' },
		{ id: 4, src: logo4, alt: 'Hewlett Packard Enterprise' },
		{ id: 5, src: logo2, alt: 'Hewlett Packard Enterprise' },
		{ id: 6, src: logo3, alt: 'Hewlett Packard Enterprise' },
	]
	const duplicatedLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos]

	return (
		<section className={styles.partners}>
			<div className={`${styles.container} container`}>
				<div className={styles.partnersTrack}>
					<div className={styles.partnersSet}>
						{duplicatedLogos.map((logo, index) => (
							<div key={`${logo.id}-${index}`} className={styles.item}>
								<div className={styles.imageWrapper}>
									<Image
										src={logo.src}
										alt={logo.alt}
										fill
										sizes='(max-width: 768px) 100px, 150px'
										style={{ objectFit: 'contain' }}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default Partners
