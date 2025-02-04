import Image from 'next/image'
import { format } from 'date-fns'
import Link from 'next/link'
import Head from 'next/head'

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
  // Format date for schema
  const formattedDate = format(new Date(date), 'yyyy-MM-dd')
  
  // Structured data for Google
  const articleSchema = {
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
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </Head>

      {/* Sticky Sales Banner */}
      <div className="sticky top-5 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg rounded-lg">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Link 
            href="/" 
            className="flex items-center justify-between hover:opacity-90 transition-opacity"
            prefetch={false}
            aria-label="Learn more about filing a legal subpoena against AIMA"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                ⚖️
              </div>
              <div>
                <p className="font-semibold">Tired of Waiting? File a Legal Subpoena</p>
                <p className="text-sm text-blue-100">Get your AIMA appointment in 2-3 months through the courts</p>
              </div>
            </div>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-blue-50 transition-colors">
              Get Help Now →
            </button>
          </Link>
        </div>
      </div>

      <article itemScope itemType="https://schema.org/Article" className="prose lg:prose-xl mx-auto px-4 pt-12 [&>h2]:mt-16 [&>h3]:mt-12 [&>p]:mt-8 [&>ul]:mt-8 [&>ol]:mt-8">
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-6">
            <span itemProp="articleSection">{category}</span>
            <span>•</span>
            <time dateTime={date} itemProp="datePublished">{format(new Date(date), 'MMMM d, yyyy')}</time>
            <span>•</span>
            <span>{estimatedReadTime} min read</span>
          </div>
          
          <h1 itemProp="headline" className="text-4xl font-bold text-gray-900 mb-6">{title}</h1>
          
          <p itemProp="description" className="text-xl text-gray-600 mb-8 leading-relaxed">{description}</p>
          
          <div className="flex items-center gap-5 pt-4 border-t border-gray-100" itemProp="author" itemScope itemType="https://schema.org/Person">
            <div className="relative w-14 h-14 rounded-full overflow-hidden">
              <Image
                src="/Miguel.jpg"
                alt={author}
                fill
                sizes="56px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="font-medium text-gray-900 text-lg" itemProp="name">{author}</p>
              <p className="text-gray-600" itemProp="jobTitle">Immigration Expert</p>
            </div>
          </div>
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

        {/* Table of Contents */}
        {tableOfContents && tableOfContents.length > 0 && (
          <nav aria-label="Table of contents" className="my-12 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">In This Article</h2>
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

        {/* Content */}
        <div itemProp="articleBody" className="mt-8 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-6 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-4 [&>p]:leading-relaxed [&>p]:text-gray-700 [&>p]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6">
          {content}
        </div>
        
        {/* Author Bio */}
        <footer className="mt-16 p-8 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">About the Author</h2>
          <div className="flex items-start gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/Miguel.jpg"
                alt={author}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-3">{author}</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Miguel is a certified immigration expert with over 10 years of experience helping people navigate Portuguese immigration processes. He specializes in complex AIMA cases and has helped hundreds of clients successfully obtain their visas and permits through both standard processes and legal interventions.
              </p>
              <div className="flex gap-4">
                <Link 
                  href="/" 
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Get legal help →
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </article>
    </>
  )
} 