'use client'

import { motion } from 'framer-motion'

export default function TestingPage() {
  const text = "Reanimated"
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="relative">
        {text.split('').map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block text-4xl font-bold font-mono"
            initial={{ color: '#4B3832' }} // Dark brown color
            animate={{
              color: ['#4B3832', '#FFD700', '#4B3832'] // Brown -> Gold -> Brown
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.1,
              ease: "easeInOut"
            }}
          >
            {letter}
          </motion.span>
        ))}
        
        {/* Animated stars */}
        <motion.span
          className="absolute -left-4 text-yellow-400"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: [-10, 0, 10],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ✦
        </motion.span>
        
        <motion.span
          className="absolute -right-4 text-yellow-400"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: [10, 0, -10],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ✦
        </motion.span>
      </div>
    </div>
  )
}
