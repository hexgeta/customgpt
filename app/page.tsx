'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import NumberFlow from '@number-flow/react'
import ScrambleText from './components/ScrambleText'

export default function Home() {
  const [currentDate, setCurrentDate] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      setCurrentDate(now.toISOString().slice(0, 10));
      setHours(now.getHours());
      setMinutes(now.getMinutes());
      setSeconds(now.getSeconds());
    }

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center p-4 font-bold">
      <nav className="w-full max-w-4xl flex justify-center gap-8 p-4 text-white">
        <Link href="https://twitter.com/hexgeta" target="_blank" className="hover:text-[#ff69b4] transition-colors">[X]</Link>
        <Link href="https://github.com/hexgeta" target="_blank" className="hover:text-[#ff69b4] transition-colors">[Github]</Link>
      </nav>

      <div className="max-w-4xl w-full flex-grow flex flex-col gap-8 p-4 md:p-14">
        {/* Logo and Header */}
        <div className="flex justify-between items-start">
          <h1 className="text-white text-4xl"><ScrambleText text="Full-stack crypto" /></h1>
          <div className="text-left">
            <p className="text-white hidden md:block">Glad you're here!</p>
            <p className="text-[#666] text-sm tracking-wider flex justify-end items-center gap-1 whitespace-nowrap hidden md:flex">
              <span>{currentDate}</span>
              <span className="flex">
                <NumberFlow 
                  value={hours}
                  format={{ minimumIntegerDigits: 2 }}
                  style={{ 
                    '--number-flow-char-height': '1.2em',
                    '--number-flow-direction': 1
                  } as React.CSSProperties}
                />
                :
                <NumberFlow 
                  value={minutes}
                  format={{ minimumIntegerDigits: 2 }}
                  style={{ 
                    '--number-flow-char-height': '1.2em',
                    '--number-flow-direction': 1
                  } as React.CSSProperties}
                />
                :
                <NumberFlow 
                  value={seconds}
                  format={{ minimumIntegerDigits: 2 }}
                  style={{ 
                    '--number-flow-char-height': '1.2em',
                    '--number-flow-direction': -1
                  } as React.CSSProperties}
                />
              </span>
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8 text-white">
          <p><ScrambleText text="Hi, I'm Hexgeta." /></p>
          <p><ScrambleText text="I'm a physicist, statistician, and front-end crypto engineer." /></p>
          <p><ScrambleText text="I have 5 years of experience building websites, dapps, and financial visualizations." /></p>
          <p><ScrambleText text="Feel free to DM me on X for enquiries." /></p>

          {/* Projects */}
          <div className="mt-8">
            <h2 className="mb-4"><ScrambleText text="My projects:" /></h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span>•</span>
                <div>
                  <Link href="https://app.lookintomaxi.com" target="_blank" className="text-[#ffd700] hover:text-[#ff69b4] transition-colors">
                    <ScrambleText text="LookIntoMaxi" />
                  </Link>
                  <span className="ml-2">
                    <ScrambleText text="A crypto statistics website." />
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <div>
                  <Link href="https://app.lookintomaxi.com" target="_blank" className="text-[#ffd700] hover:text-[#ff69b4] transition-colors">
                    <ScrambleText text="LookIntoMaxi (Original)" />
                  </Link>
                  <span className="ml-2">
                    <ScrambleText text="The legacy version of LookIntoMaxi." />
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <div>
                  <Link href="https://lookintoparty.com/calculator/" target="_blank" className="text-[#ffd700] hover:text-[#ff69b4] transition-colors">
                    <ScrambleText text="Pool vs solo-staking calculator" />
                  </Link>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <div>
                  <Link href="https://lookintomaxi.com/limit/" target="_blank" className="text-[#ffd700] hover:text-[#ff69b4] transition-colors">
                    <ScrambleText text="Pooled stake limit order calculator" />
                  </Link>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <div>
                  <Link href="#" className="text-[#ffd700] hover:text-[#ff69b4] transition-colors">
                    <ScrambleText text="HEX staking front-end" />
                  </Link>
                  <span className="ml-2">
                    <ScrambleText text="Coming soon..." />
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
} 