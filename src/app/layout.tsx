import { PT_Sans_Narrow } from 'next/font/google'

import Header from '@/components/Header'
import '@/styles/global.scss'
import '@/styles/reset.scss'

const pt_Sans_Narrow = PT_Sans_Narrow({
	subsets: ['latin'],
	weight: ['400', '700'], // какие тебе нужны
	variable: '--font-pt_Sans_Narrow',
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru' className={pt_Sans_Narrow.className}>
			<body>
				<Header />
				<main>{children}</main>
			</body>
		</html>
	)
}
