'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import ScrambleText from './components/ScrambleText'

const VideoProcessor = dynamic(() => import('./components/VideoProcessor'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-[400px] h-[225px] border-2 border-dashed border-[#00ffff] rounded-lg flex items-center justify-center">
      <p className="text-[#00ffff] font-bold">Loading...</p>
    </div>
  )
})

export default function VideoPage() {
  return (
    <main className="flex flex-col items-center p-2 sm:p-4">
      <div className="w-full flex flex-col items-center mt-8 sm:mt-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-white mb-2 sm:mb-4 font-bold text-center">
          <ScrambleText text="Video Frame Extractor" />
        </h1>
        <Link 
          href="https://twitter.com/hexgeta" 
          target="_blank" 
          className="text-sm sm:text-base text-gray-400 hover:text-[#ff69b4] transition-colors mb-8 sm:mb-10 font-normal"
        >
          [made by Hexgeta]
        </Link>
        <VideoProcessor />
      </div>
    </main>
  )
} 