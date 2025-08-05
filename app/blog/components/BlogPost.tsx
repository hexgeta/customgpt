import Image from 'next/image'
import { format } from 'date-fns'
import Link from 'next/link'
import Head from 'next/head'
import { useMemo } from 'react'

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
  tableOfContents?: {
    title: string
    id: string
  }[]
}

export default function BlogPost({
  title,
  description,
  date,
  author,
  content,
  image,
  category,
  estimatedReadTime,
  tableOfContents
}: BlogPostProps) {
  // Memoize the date formatting to prevent unnecessary recalculations
  const formattedDate = useMemo(() => format(new Date(date), 'yyyy-MM-dd'), [date])
  const displayDate = useMemo(() => format(new Date(date), 'MMMM d, yyyy'), [date])
  
  // Memoize schema to prevent regeneration on each render
  const articleSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image?.src,
    datePublished: formattedDate,
    dateModified: formattedDate,
    author: {
      '@type': 'Person',
      name: author,
      jobTitle: 'Immigration Expert'
    },
    publisher: {
      '@type': 'Organization',
      name: 'AIMA Legal Services',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': typeof window !== 'undefined' ? window.location.href : ''
    }
  }), [title, description, formattedDate, author, image?.src])

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </Head>

      {/* Sticky Sales Banner - Optimized for mobile */}
      <div className="sticky top-5 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg rounded-lg">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Link 
            href="/" 
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:opacity-90 transition-opacity"
            prefetch={false}
            aria-label="Learn more about filing a legal subpoena against AIMA"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2 shrink-0">
                ⚖️
              </div>
              <div>
                <p className="font-semibold text-sm sm:text-base">Tired of Waiting? File a Legal Subpoena</p>
                <p className="text-xs sm:text-sm text-blue-100">Get your AIMA appointment in 2-3 months through the courts</p>
              </div>
            </div>
            <button className="w-full sm:w-auto bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors">
              Get Help Now →
            </button>
          </Link>
        </div>
      </div>

      <article itemScope itemType="https://schema.org/Article" className="max-w-4xl mx-auto px-4 pt-6 sm:pt-12">
        {/* Header */}
        <header className="mb-8 sm:mb-16">
          <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
            <span itemProp="articleSection">{category}</span>
            <span>•</span>
            <time dateTime={date} itemProp="datePublished">{displayDate}</time>
            <span>•</span>
            <span>{estimatedReadTime} min read</span>
          </div>
          
          <h1 itemProp="headline" className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">{title}</h1>
          
          <p itemProp="description" className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">{description}</p>
        </header>

        {/* Featured Image */}
        {image && (
          <figure className="relative aspect-[16/9] w-full mb-12 rounded-xl overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1280px) 1200px, (min-width: 780px) 800px, 100vw"
              className="object-cover"
              loading="eager"
              quality={90}
              itemProp="image"
            />
            <figcaption className="sr-only">{image.alt}</figcaption>
          </figure>
        )}

        {/* Table of Contents - Mobile Optimized */}
        {tableOfContents && tableOfContents.length > 0 && (
          <nav aria-label="Table of contents" className="my-8 sm:my-12 p-4 sm:p-6 bg-gray-50 rounded-lg text-sm sm:text-base">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">In This Article</h2>
            <ul className="space-y-2 text-gray-600">
              {tableOfContents.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="hover:text-blue-600 transition-colors">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Content - Mobile Optimized */}
        <div 
          itemProp="articleBody" 
          className="
            mt-8 
            [&>h2]:text-xl sm:[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 sm:[&>h2]:mt-12 [&>h2]:mb-4 sm:[&>h2]:mb-6 
            [&>h3]:text-lg sm:[&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-6 sm:[&>h3]:mt-8 [&>h3]:mb-3 sm:[&>h3]:mb-4 
            [&>p]:text-base [&>p]:leading-relaxed [&>p]:text-gray-700 [&>p]:mb-4 sm:[&>p]:mb-6
            [&>ul]:list-disc [&>ul]:pl-4 sm:[&>ul]:pl-6 
            [&>ol]:list-decimal [&>ol]:pl-4 sm:[&>ol]:pl-6
            [&>ul]:mb-4 sm:[&>ul]:mb-6
            [&>ol]:mb-4 sm:[&>ol]:mb-6
            [&>li]:mb-2
          "
        >
          {content}
        </div>

      </article>
    </>
  )
} 