import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllBlogPosts, formatDate, type BlogPost } from '@/lib/blog'

// Function to get category styling based on category type
function getCategoryStyle(category: string) {
  const styles = {
    'AIMA Update': 'bg-blue-50 text-blue-600 border border-blue-100',
    'Family Visa': 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    'Digital Nomad': 'bg-purple-50 text-purple-600 border border-purple-100',
    'Investment Visa': 'bg-amber-50 text-amber-600 border border-amber-100',
    'Work Visa': 'bg-indigo-50 text-indigo-600 border border-indigo-100',
    'Process Guide': 'bg-gray-50 text-gray-600 border border-gray-200',
    'Document Checklist': 'bg-orange-50 text-orange-600 border border-orange-100',
    'Visa Guide': 'bg-teal-50 text-teal-600 border border-teal-100',
    'Legal Process': 'bg-slate-50 text-slate-600 border border-slate-200',
    'Visa News': 'bg-cyan-50 text-cyan-600 border border-cyan-100',
    'Legal Guide': 'bg-rose-50 text-rose-600 border border-rose-100',
    'Student Visa': 'bg-violet-50 text-violet-600 border border-violet-100',
    'Default': 'bg-gray-50 text-gray-600 border border-gray-200'
  }
  
  return styles[category as keyof typeof styles] || styles['Default']
}

export const metadata: Metadata = {
  title: 'The Portugal Immigration Blog | Expert Portuguese Immigration Insights',
  description: 'Expert insights, guides, and updates on Portuguese immigration, AIMA appointments, visas, and legal procedures. Get the latest information from immigration specialists.',
  openGraph: {
    title: 'The Portugal Immigration Blog | Expert Portuguese Immigration Insights',
    description: 'Expert insights, guides, and updates on Portuguese immigration, AIMA appointments, visas, and legal procedures.',
  }
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group h-full flex flex-col cursor-pointer">
        <div className="p-6 sm:p-8 flex-1 flex flex-col">
          {/* Category and Date */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
            <span className={`px-3 py-1 rounded-full font-medium text-xs ${getCategoryStyle(post.category)}`}>
              {post.category}
            </span>
            <span>•</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>•</span>
            <span>{post.estimatedReadTime} min read</span>
          </div>

          {/* Title */}
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
            {post.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            {post.description}
          </p>
        </div>
      </article>
    </Link>
  )
}

export default async function BlogIndex() {
  const blogPosts = await getAllBlogPosts()
  return (
    <div className="min-h-screen">
      {/* Sticky Sales Banner */}
      <div className="sticky top-5 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg rounded-lg mx-4 sm:mx-6">
        <div className="max-w-7xl mx-auto px-4 py-3">
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

      {/* Header */}
      <header className="bg-white border-b border-gray-200 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              The Portugal Immigration Blog
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Expert insights, comprehensive guides, and the latest updates on Portuguese immigration, 
              AIMA appointments, visas, and legal procedures from certified immigration specialists.
            </p>
          </div>
        </div>
      </header>

      {/* Blog Posts Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 bg-white">
        {blogPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Blog Posts Found</h2>
            <p className="text-gray-600">Blog posts will appear here once they are generated.</p>
          </div>
        )}

        {/* Call to Action Section */}
        <div className="text-center mt-16 mb-20">
          <div className="bg-blue-600 rounded-xl shadow-sm border border-gray-100 p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Need Expert Immigration Help?</h2>
            <p className="text-white mb-8 max-w-2xl mx-auto text-lg">
              Don't wait months for AIMA appointments. Our legal team can help you get results faster 
              through proven legal procedures and expert guidance.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-lg font-medium hover:bg-white/80 transition-colors duration-200 text-lg"
            >
              Contact Immigration Experts
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}