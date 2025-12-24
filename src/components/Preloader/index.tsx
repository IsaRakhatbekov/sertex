'use client'

import dynamic from 'next/dynamic'

const Preloader = dynamic(() => import('@/components/Preloader/Preloader'), {
	ssr: false,
})

export default function ClientPreloaderWrapper() {
	return <Preloader />
}
