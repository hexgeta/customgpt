import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'CustomGPT.ai - Business AI for Trusted Answers',
  description: 'Create no-code AI agents powered by your business data. No hallucinations. No guessing. Trusted by 10,000+ organizations.',
  metadataBase: new URL('https://customgpt.ai'),
  icons: {
    icon: '/customgpt-logo.svg',
  },
  openGraph: {
    title: 'CustomGPT.ai - Business AI for Trusted Answers',
    description: 'Create no-code AI agents powered by your business data. No hallucinations. No guessing. Trusted by 10,000+ organizations.',
    url: 'https://customgpt.ai',
    siteName: 'CustomGPT.ai',
    images: [{
      url: '/opengraph.png',
      width: 1200,
      height: 630,
      alt: 'CustomGPT.ai - Business AI for Trusted Answers'
    }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CustomGPT.ai - Business AI for Trusted Answers',
    description: 'Create no-code AI agents powered by your business data. No hallucinations. No guessing.',
    images: ['/opengraph.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen bg-white font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
