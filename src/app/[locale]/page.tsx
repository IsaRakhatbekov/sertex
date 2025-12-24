import AiChat from '@/components/AIChat/AIChat'
import About from './homeComponents/About/About'
import Hero from './homeComponents/Hero/Hero'
import WhatWeDo from './homeComponents/WhatWeDo/WhatWeDo'
import WhyChooseUs from './homeComponents/WhyChooseUs/WhyChooseUs'

export default function Home() {
	return (
		<>
			<Hero />
			{/* <Partners /> */}
			<WhatWeDo />
			<section id='chat'>
				<AiChat />
			</section>
			<About />
			<WhyChooseUs />
		</>
	)
}
