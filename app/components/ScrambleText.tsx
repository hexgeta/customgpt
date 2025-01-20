'use client'

import { useState, useEffect, useCallback } from 'react'

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+'

interface ScrambleTextProps {
  text: string
  className?: string
}

export default function ScrambleText({ text, className = '' }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [isScrambling, setIsScrambling] = useState(false)
  const [scrambleTimeout, setScrambleTimeout] = useState<NodeJS.Timeout | null>(null)

  const scrambleText = useCallback(() => {
    let iterations = 0
    const maxIterations = 10
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (iterations > index) return text[index]
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join('')
      )

      iterations += 1
      if (iterations >= maxIterations) {
        clearInterval(interval)
        setDisplayText(text)
        setIsScrambling(false)
      }
    }, 50)

    return interval
  }, [text])

  // Initial load effect
  useEffect(() => {
    const interval = scrambleText()
    return () => clearInterval(interval)
  }, [])

  // Hover effect
  const handleMouseEnter = () => {
    if (scrambleTimeout) clearTimeout(scrambleTimeout)
    setIsScrambling(true)
    const interval = scrambleText()
    const timeout = setTimeout(() => {
      clearInterval(interval)
      setDisplayText(text)
      setIsScrambling(false)
    }, 2000)
    setScrambleTimeout(timeout)
  }

  return (
    <span 
      className={`inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {displayText || text}
    </span>
  )
} 