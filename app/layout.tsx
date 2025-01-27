import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"

export const metadata = {
  title: 'Legal Assistance for AIMA Complaints',
  description: 'Professional support for filing complaints against AIMA and assistance with Portuguese visa appointments.',
  icons: {
    icon: '/favicon.jpg',
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