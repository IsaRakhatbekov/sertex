import { Inter } from 'next/font/google'

import Header from '@/components/Header'
import '@/styles/global.scss'
import '@/styles/reset.scss'

const roboto = Inter({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700'], // какие тебе нужны
	variable: '--font-inter',
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className={roboto.className}>
			<body>
				<Header />
				<main>{children}</main>
			</body>
		</html>
	)
}
