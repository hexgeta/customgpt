'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function NotificationDemo() {
  const [notifications, setNotifications] = useState<number[]>([])

  useEffect(() => {
    // Demo: Add a new notification every 1.5 seconds
    const interval = setInterval(() => {
      setNotifications(prev => [...prev, Date.now()])
      // Remove notification after 2 seconds
      setTimeout(() => {
        setNotifications(prev => prev.slice(1))
      }, 2000)
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-4 right-4 space-y-2">
      <AnimatePresence>
        {notifications.map(id => (
          <motion.div
            key={id}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            className="bg-gradient-to-r from-blue-900 to-blue-800 
                       text-white px-6 py-3 rounded-lg shadow-lg
                       min-w-[200px] text-center"
          >
            Found an element
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
} 