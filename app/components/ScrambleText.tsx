'use client'

import { motion, useAnimationControls } from 'framer-motion'
import { useState, useEffect } from 'react'

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+'

interface ScrambleTextProps {
  text: string
  className?: string
}

export default function ScrambleText({ text: initialText, className = '' }: ScrambleTextProps) {
  const [text, setText] = useState(initialText)
  const controls = useAnimationControls()

  useEffect(() => {
    const interval = setInterval(() => {
      scrambleText()
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const scrambleText = async () => {
    // First, scramble the text
    for (let i = 0; i < 3; i++) {
      await controls.start({
        opacity: 1,
        transition: { duration: 0.1 }
      })
      
      setText(prevText => 
        prevText
          .split('')
          .map((char, index) => 
            Math.random() > 0.5 ? characters[Math.floor(Math.random() * characters.length)] : char
          )
          .join('')
      )
    }

    // Then set it back to original
    setText(initialText)
  }

  return (
    <motion.div
      animate={controls}
      className={`text-white font-mono whitespace-nowrap ${className}`}
    >
      {text}
    </motion.div>
  )
} 