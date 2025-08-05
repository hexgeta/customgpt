import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import Script from 'next/script'
import FooterWrapper from './FooterWrapper'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'Immigration Legal Support',
  description: 'Specialized legal assistance to secure your AIMA appointment. Professional support with administrative processes in Portuguese courts.',
  metadataBase: new URL('https://www.apoiojuridico-imigracao.com'),
  icons: {
    icon: '/favicon.jpg',
  },
  openGraph: {
    title: 'Immigration Legal Support',
    description: 'Specialized legal assistance to secure your AIMA appointment. Professional support with administrative processes in Portuguese courts.',
    url: 'https://www.apoiojuridico-imigracao.com',
    siteName: 'Immigration Legal Support',
    images: [{
      url: '/social-image.png',
      width: 1200,
      height: 630,
      alt: 'Immigration Legal Support Preview'
    }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Immigration Legal Support',
    description: 'Specialized legal assistance to secure your AIMA appointment. Professional support with administrative processes in Portuguese courts.',
    images: ['/social-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable}`}>
      <head>
        <script defer data-domain="apoiojuridico-imigracao.com" src="https://plausible.io/js/script.js"></script>
      </head>
      <body className="min-h-screen bg-background font-dm-sans antialiased">
        {children}
        <FooterWrapper />
        <Toaster />
      </body>
    </html>
  )
}