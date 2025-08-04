import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AIMA Immigration Blog | Portuguese Immigration Insights',
  description: 'Expert insights on Portuguese immigration, AIMA appointments, and visa processes.',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </div>
    </div>
  )
} 