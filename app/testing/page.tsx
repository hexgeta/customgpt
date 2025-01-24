'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function TabsDemo() {
  const [activeTab, setActiveTab] = useState(0)
  const [hoveredTab, setHoveredTab] = useState<number | null>(null)
  
  const tabs = [
    'Overview',
    'Integrations',
    'Activity',
    'Domains',
    'Usage',
    'Monitoring'
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-2xl mx-auto p-8">
        <nav className="relative">
          <ul className="flex gap-6 border-b border-gray-200">
            {tabs.map((tab, index) => (
              <li key={tab} className="relative">
                <AnimatePresence>
                  {hoveredTab === index && (
                    <motion.div
                      layoutId="hoverBackground"
                      className="absolute inset-0 -mx-3 -my-2 rounded-full bg-gray-50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}
                </AnimatePresence>
                <motion.button
                  onClick={() => setActiveTab(index)}
                  onHoverStart={() => setHoveredTab(index)}
                  onHoverEnd={() => setHoveredTab(null)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                    activeTab === index 
                      ? 'text-black' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {tab}
                </motion.button>
                {activeTab === index && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-black"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}