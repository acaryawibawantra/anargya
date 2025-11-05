import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Anargya Car Showcase | Always Energized',
  description: 'Explore cutting-edge electric vehicles and automotive excellence. Premium car showcase featuring high-performance electric formula cars and innovative automotive products.',
  keywords: 'electric vehicles, car showcase, formula electric, automotive, EV, racing cars, Anargya, ITS',
  authors: [{ name: 'Anargya ITS' }],
  openGraph: {
    title: 'Anargya Car Showcase | Always Energized',
    description: 'Explore cutting-edge electric vehicles and automotive excellence.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anargya Car Showcase',
    description: 'Explore cutting-edge electric vehicles and automotive excellence.',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}