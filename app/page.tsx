'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import ScrambleText from './components/ScrambleText'

const VideoProcessor = dynamic(() => import('./components/VideoProcessor'), {
  ssr: false,
  loading: () => (
    <div className="w-[400px] h-[225px] border-2 border-dashed border-[#00ffff] rounded-lg flex items-center justify-center">
      <p className="text-[#00ffff]">Loading...</p>
    </div>
  )
})

export default function VideoPage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 font-bold">
      <nav className="w-full max-w-4xl flex justify-between gap-8 p-4 md:px-14 text-white">
      </nav>

      <div className="min-h-screen flex flex-col items-center mt-8 p-4 md:px-14">
        <h1 className="text-white text-4xl mb-4">
          <ScrambleText text="Video Frame Extractor" />
        </h1>
        <Link 
          href="https://twitter.com/hexgeta" 
          target="_blank" 
          className="text-gray-400 hover:text-[#ff69b4] transition-colors mb-2"
        >
          [made by Hexgeta]
        </Link>
        <VideoProcessor />
      </div>
    </main>
  )
} 