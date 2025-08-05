'use client'

import { usePathname } from 'next/navigation'
import DisclaimerFooter from './components/CTAFooter'

export default function FooterWrapper() {
  const pathname = usePathname()
  
  // Don't show disclaimer footer on home page (it already has its own footer)
  const isHomePage = pathname === '/'
  
  if (isHomePage) {
    return null
  }
  
  return <DisclaimerFooter />
}