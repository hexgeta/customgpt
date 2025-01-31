import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
})

export const metadata: Metadata = {
  title: 'Apoio Jurídico Imigração',
  description: 'Assistência jurídica especializada para garantir sua consulta na AIMA. Apoio profissional com processos administrativos nos tribunais portugueses.',
  icons: {
    icon: '/favicon.jpg',
  },
  openGraph: {
    title: 'Apoio Jurídico Imigração',
    description: 'Assistência jurídica especializada para garantir sua consulta na AIMA. Apoio profissional com processos administrativos nos tribunais portugueses.',
    url: 'https://www.apoiojuridico-imigracao.com',
    siteName: 'Apoio Jurídico Imigração',
    images: [
      {
        url: '/social-image.png',
        width: 1200,
        height: 630,
        alt: 'Apoio Jurídico Imigração Preview',
      },
    ],
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apoio Jurídico Imigração',
    description: 'Assistência jurídica especializada para garantir sua consulta na AIMA. Apoio profissional com processos administrativos nos tribunais portugueses.',
    images: ['/social-preview.jpg'],
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