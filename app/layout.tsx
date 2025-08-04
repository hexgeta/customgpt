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
        <Toaster />
        
        {/* Legal Footer */}
        <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Apoiojuridico-Imigração 2025
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-4xl mx-auto">
                <strong>Disclaimer:</strong> No attorney-client relationship or legal advice. This website is intended to provide general information about our firm and our services. Although this website may provide information regarding legal issues, your use of this website, including, but not limited to, your receipt, use, or sending of any information, materials, and communications provided or made by, in, to or through this website, does not constitute providing of legal services of any kind.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}