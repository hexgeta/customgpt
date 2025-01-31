import { Space_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { defaultMetadata } from './shared-metadata'

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
})

export const metadata = {
  ...defaultMetadata,
  openGraph: {
    ...defaultMetadata.openGraph,
    images: [
      {
        url: '/social-image.png',
        width: 1200,
        height: 630,
        alt: 'Apoio Jurídico AIMA',
      },
    ],
  },
  twitter: {
    ...defaultMetadata.twitter,
    images: ['/social-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceMono.variable}`}>
      <body className="min-h-screen bg-background font-mono antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  )
}