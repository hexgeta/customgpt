import { Metadata } from 'next'
import BlogPost from '../components/BlogPost'

export const metadata: Metadata = {
  title: 'Portugal Golden Visa Program Changes',
  description: 'Recent updates to Portugal Golden Visa regulations',
  openGraph: {
    title: 'Portugal Golden Visa Program Changes',
    description: 'Recent updates to Portugal Golden Visa regulations',
  }
}

export default function PortugalGoldenVisaProgramChanges() {
  const tableOfContents = [
    {
        "title": "Overview",
        "id": "overview"
    },
    {
        "title": "Requirements",
        "id": "requirements"
    },
    {
        "title": "Process",
        "id": "process"
    },
    {
        "title": "Timeline",
        "id": "timeline"
    }
]

  return (
    <BlogPost
      title="Portugal Golden Visa Program Changes"
      description="Recent updates to Portugal Golden Visa regulations"
      date="2025-08-04"
      author="Miguel Pires"
      category="Investment Visa"
      estimatedReadTime={8}
      tableOfContents={tableOfContents}
      content={
        <>
          
        <h2 id="overview">Overview</h2>
        <p>This article covers important information about portugal golden visa program changes in the context of Portuguese immigration law.</p>
        
        <h2 id="requirements">Requirements</h2>
        <p>Understanding the requirements is crucial for a successful application process.</p>
        
        <h2 id="process">Process</h2>
        <p>Follow these steps to navigate the process effectively.</p>
        
        <h2 id="timeline">Timeline</h2>
        <p>Typical processing times and what to expect during each phase.</p>
      
        </>
      }
    />
  )
}