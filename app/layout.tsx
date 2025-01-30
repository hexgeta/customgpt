import { Space_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
})

export const metadata = {
  title: 'AIMA Legal Support',
  description: 'Get legal support for your AIMA appointment',
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