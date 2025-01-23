'use client'

import { useState, useEffect } from 'react'

export default function TextScramble() {
  const [text, setText] = useState('Video Frame Extractor')
  const [isScrambling, setIsScrambling] = useState(false)

  const scrambleText = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+'
    return text
      .split('')
      .map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
      .join('')
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isScrambling) {
      interval = setInterval(() => {
        setText(scrambleText())
      }, 50) // Adjust speed as needed
    } else {
      setText('Video Frame Extractor')
    }

    return () => clearInterval(interval)
  }, [isScrambling])

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <h1
        className="text-white font-mono text-4xl cursor-pointer"
        onMouseEnter={() => setIsScrambling(true)}
        onMouseLeave={() => setIsScrambling(false)}
      >
        {text}
      </h1>
    </div>
  )
} 