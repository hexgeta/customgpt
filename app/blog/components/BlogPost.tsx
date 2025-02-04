import Image from 'next/image'
import { format } from 'date-fns'
import Link from 'next/link'

interface BlogPostProps {
  title: string
  description: string
  date: string
  author: string
  content: React.ReactNode
  image?: {
    src: string
    alt: string
  }
  category: string
  estimatedReadTime: number
}

export default function BlogPost({
  title,
  description,
  date,
  author,
  content,
  image,
  category,
  estimatedReadTime
}: BlogPostProps) {
  return (
    <>
      {/* Sticky Sales Banner */}
      <div className="sticky top-5 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg rounded-lg">
        <div className="max-w-6xl mx-auto px-4 py-4">
            <Link 
              href="/" 
              className="flex items-center justify-between hover:opacity-90 transition-opacity"
            >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                ⚖️
                </div>
              <div>
                <p className="font-semibold">File a Legal Subpoena Against AIMA</p>
                <p className="text-sm text-blue-100">Get your appointment within 2-3 months through the courts</p>
                </div>
              </div>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-blue-50 transition-colors">
                Learn More →
              </button>
            </Link>
          </div>
        </div>

      <article className="prose lg:prose-xl mx-auto px-4 pt-12 [&>h2]:mt-16 [&>h3]:mt-12 [&>p]:mt-8 [&>ul]:mt-8 [&>ol]:mt-8">
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-6">
            <span>{category}</span>
            <span>•</span>
            <time dateTime={date}>{format(new Date(date), 'MMMM d, yyyy')}</time>
            <span>•</span>
            <span>{estimatedReadTime} min read</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{title}</h1>
          
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">{description}</p>
          
          <div className="flex items-center gap-5 pt-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden">
              <Image
                src="/Miguel.jpg"
                alt={author}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-gray-900 text-lg">{author}</p>
              <p className="text-gray-600">Immigration Expert</p>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {image && (
          <div className="relative w-full h-[500px] mb-16 rounded-xl overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="mt-32 space-y-4 mb-2 [&>h2]:mt-16 [&>h3]:mt-12">
            {content}
        </div>
      </article>
    </>
  )
} 