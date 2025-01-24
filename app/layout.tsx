import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'

const departureMono = localFont({
  src: './fonts/DepartureMono-Regular.otf',
  variable: '--font-departure',
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
      <body className={`${departureMono.className}`}>
        {children}
      </body>
    </html>
  )
} 