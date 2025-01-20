'use client'

import React from 'react'
import Link from 'next/link'

export default function Home() {
  React.useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    
    const elements = document.querySelectorAll('.flicker');
    elements.forEach(el => {
      const interval = setInterval(() => {
        el.classList.toggle('flicker-off');
      }, Math.random() * 1000 + 500);
      intervals.push(interval);
    });

    // Cleanup function
    return () => intervals.forEach(clearInterval);
  }, []); // Empty dependency array

  return (
    <main className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center p-4">
      {/* Main content box with cyan border */}
      <div className="border-[#0ff] border-2 rounded-lg p-8 max-w-2xl w-full mb-8 relative glow-box">
        <h1 className="text-[#0ff] text-4xl md:text-6xl font-mono mb-4 flicker">
          CYBER.SPACE
        </h1>
        <p className="text-[#0ff] font-mono opacity-80">
          Welcome to the digital frontier
        </p>
      </div>

      {/* Interactive area */}
      <div className="border-[#0ff] border-2 border-dashed rounded-lg p-8 max-w-2xl w-full relative">
        <p className="text-[#ff69b4] font-mono text-center flicker">
          Enter the void or press any key to continue...
        </p>
      </div>

      {/* Social links */}
      <div className="mt-8 flex gap-6">
        {['Github', 'Twitter', 'Email'].map((link) => (
          <Link 
            key={link} 
            href="#" 
            className="text-[#0ff] hover:text-[#ff69b4] transition-colors font-mono"
          >
            {link}
          </Link>
        ))}
      </div>
    </main>
  )
} 