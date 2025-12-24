import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { routing } from '@/i18n/routing'
import '@/styles/global.scss'
import '@/styles/reset.scss'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { PT_Mono, PT_Sans_Narrow } from 'next/font/google'
import { notFound } from 'next/navigation'

const pt_Sans_Narrow = PT_Sans_Narrow({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '700'],
	display: 'swap',
	variable: '--font-pt_Sans_Narrow',
})

const pt_mono = PT_Mono({
	subsets: ['latin', 'cyrillic'],
	weight: ['400'],
	display: 'swap',
	variable: '--font-pt_mono',
})

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params

	if (!routing.locales.includes(locale as any)) {
		notFound()
	}

	const messages = await getMessages()

	return (
		<html
			lang={locale}
			className={`${pt_Sans_Narrow.className} ${pt_mono.variable}`}
		>
			<body className='app'>
				<NextIntlClientProvider messages={messages}>
					<Header />
					<main>{children}</main>
					<Footer />
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
