import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import Script from 'next/script'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'Apoio Jurídico Imigração',
  description: 'Assistência jurídica especializada para garantir sua consulta na AIMA. Apoio profissional com processos administrativos nos tribunais portugueses.',
  metadataBase: new URL('https://www.apoiojuridico-imigracao.com'),
  icons: {
    icon: '/favicon.jpg',
  },
  openGraph: {
    title: 'Apoio Jurídico Imigração',
    description: 'Assistência jurídica especializada para garantir sua consulta na AIMA. Apoio profissional com processos administrativos nos tribunais portugueses.',
    url: 'https://www.apoiojuridico-imigracao.com',
    siteName: 'Apoio Jurídico Imigração',
    images: [{
      url: '/social-image.png',
      width: 1200,
      height: 630,
      alt: 'Apoio Jurídico Imigração Preview'
    }],
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apoio Jurídico Imigração',
    description: 'Assistência jurídica especializada para garantir sua consulta na AIMA. Apoio profissional com processos administrativos nos tribunais portugueses.',
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-11266387977"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-11266387977');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-background font-dm-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  )
}