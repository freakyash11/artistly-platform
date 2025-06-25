import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Artist Booking Platform',
    default: 'Artist Booking Platform - Find & Book Talented Artists',
  },
  description: 'Discover and book talented artists for your events. Browse through various categories of performers and entertainers.',
  keywords: ['artist booking', 'performers', 'entertainment', 'events', 'musicians', 'dancers'],
  authors: [{ name: 'Your Company Name' }],
  creator: 'Your Company Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    siteName: 'Artist Booking Platform',
    title: 'Artist Booking Platform - Find & Book Talented Artists',
    description: 'Discover and book talented artists for your events.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Artist Booking Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artist Booking Platform',
    description: 'Discover and book talented artists for your events.',
    creator: '@yourhandle',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}