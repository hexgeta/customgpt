import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'

const departureMono = localFont({
  src: './fonts/DepartureMono-Regular.otf',
  variable: '--font-departure',
  preload: true,
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hexgeta',
  description: 'Welcome to the digital frontier',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={departureMono.variable}>
      <body className={`${departureMono.className} bg-[#0a0a0f] antialiased`}>
        {children}
      </body>
    </html>
  )
} 