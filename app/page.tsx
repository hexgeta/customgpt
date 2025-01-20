'use client'

import React from 'react'
import Link from 'next/link'
import XIcon from './components/XIcon'

export default function Home() {
  const [currentTime, setCurrentTime] = React.useState<string>('');

  React.useEffect(() => {
    // Initialize with current time
    const updateTime = () => {
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 10);
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${formattedDate} ${hours}:${minutes}:${seconds}`);
    };

    // Update immediately and then every second
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    // Flicker effect
    const elements = document.querySelectorAll('.flicker');
    const flickerIntervals = Array.from(elements).map(el => 
      setInterval(() => {
        el.classList.toggle('flicker-off');
      }, Math.random() * 1000 + 500)
    );

    // Cleanup
    return () => {
      clearInterval(timeInterval);
      flickerIntervals.forEach(clearInterval);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0f] flex flex-col items-center p-4">
      <nav className="w-full max-w-4xl flex justify-end gap-8 p-4 font-mono text-[#0ff]">
        <Link href="/" className="hover:text-[#ff69b4] transition-colors">
          <XIcon />
        </Link>
        <Link href="/projects" className="hover:text-[#ff69b4] transition-colors">Projects</Link>
      </nav>

      <div className="max-w-4xl w-full flex-grow flex flex-col gap-8 p-4">
        {/* Logo and Header */}
        <div className="flex justify-between items-start">
          <h1 className="text-[#0ff] text-4xl font-mono flicker">Hexgeta</h1>
          <div className="text-right">
            <p className="text-[#0ff] font-mono flicker">Glad you're here</p>
            <p className="text-[#666] font-mono text-sm">
              <span>{currentTime.split(' ')[0]}</span>
              <span className="ml-2 inline-block w-[85px] flicker">{currentTime.split(' ')[1]}</span>
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 font-mono text-[#0ff]">
          <p>I spend a lot of my time tinkering and building new ideas I find interesting.</p>
          
          <p>I'm also the first growth engineer at Browserbase, an exciting startup in San Francisco.</p>
          
          <p>Feel free to DM if you'd like to chat!</p>

          {/* Past Events */}
          <div className="mt-8">
            <h2 className="text-[#0ff] mb-4">Past Events:</h2>
            <ul className="space-y-2">
              <li>• Outlier Fellow at <span className="text-[#ffd700]">Floodgate</span></li>
              <li>• Modular Fellow at <span className="text-[#ffd700]">Celestia</span></li>
              <li>• First Analyst at <span className="text-[#ffd700]">Alchemy</span></li>
            </ul>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-auto flex justify-center gap-8 font-mono text-[#0ff]">
          <Link href="#" className="hover:text-[#ff69b4] transition-colors">
            <XIcon />
          </Link>
          <Link href="#" className="hover:text-[#ff69b4] transition-colors">Github</Link>
          <Link href="#" className="hover:text-[#ff69b4] transition-colors">LinkedIn</Link>
          <Link href="#" className="hover:text-[#ff69b4] transition-colors">Email</Link>
        </div>
      </div>
    </main>
  )
} 