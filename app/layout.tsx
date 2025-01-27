import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"

export const metadata = {
  title: 'Assistência Jurídica para Reclamações AIMA',
  description: 'Apoio profissional para apresentação de reclamações contra a AIMA e assistência com agendamentos de vistos portugueses.',
  icons: {
    icon: '/bg1.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-['Space_Mono']">
        {children}
        <Toaster />
      </body>
    </html>
  )
} 