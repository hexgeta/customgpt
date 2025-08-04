import fs from 'fs'
import path from 'path'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  estimatedReadTime: number
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const blogDirectory = path.join(process.cwd(), 'app/blog')
  const entries = fs.readdirSync(blogDirectory, { withFileTypes: true })
  
  const posts: BlogPost[] = []
  
  for (const entry of entries) {
    // Skip files and the components directory
    if (!entry.isDirectory() || entry.name === 'components') {
      continue
    }
    
    const postPath = path.join(blogDirectory, entry.name, 'page.tsx')
    
    // Check if page.tsx exists
    if (!fs.existsSync(postPath)) {
      continue
    }
    
    try {
      // Read the file content
      const fileContent = fs.readFileSync(postPath, 'utf-8')
      
      // Extract metadata from the file
      const metadata = extractMetadataFromFile(fileContent)
      
      if (metadata) {
        posts.push({
          slug: entry.name,
          ...metadata
        })
      }
    } catch (error) {
      console.error(`Error reading blog post ${entry.name}:`, error)
    }
  }
  
  // Sort posts by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function extractMetadataFromFile(content: string): Omit<BlogPost, 'slug'> | null {
  try {
    // Extract title from metadata
    const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/)
    const title = titleMatch?.[1]
    
    // Extract description from metadata
    const descriptionMatch = content.match(/description:\s*['"`]([^'"`]+)['"`]/)
    const description = descriptionMatch?.[1]
    
    // Extract date from BlogPost component
    const dateMatch = content.match(/date="([^"]+)"/)
    const date = dateMatch?.[1]
    
    // Extract author from BlogPost component
    const authorMatch = content.match(/author="([^"]+)"/)
    const author = authorMatch?.[1]
    
    // Extract category from BlogPost component
    const categoryMatch = content.match(/category="([^"]+)"/)
    const category = categoryMatch?.[1]
    
    // Extract estimated read time from BlogPost component
    const readTimeMatch = content.match(/estimatedReadTime=\{(\d+)\}/)
    const estimatedReadTime = readTimeMatch?.[1] ? parseInt(readTimeMatch[1]) : 5
    
    // Return metadata if we have the essential fields
    if (title && description && date && author && category) {
      return {
        title,
        description,
        date,
        author,
        category,
        estimatedReadTime
      }
    }
    
    return null
  } catch (error) {
    console.error('Error extracting metadata:', error)
    return null
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}