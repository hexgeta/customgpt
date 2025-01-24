'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function OnboardingFlow() {
  const [step, setStep] = useState(1)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Phone frame */}
      <div className="w-[320px] h-[640px] bg-white rounded-[40px] relative overflow-hidden shadow-2xl p-4">
        {/* Status bar */}
        <div className="flex justify-between text-sm text-gray-600 mb-8">
          <span>00:00</span>
          <span>0:00</span>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-x-4 top-20"
            >
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="w-8 h-8 bg-black rounded-xl mb-3" />
                <h2 className="text-lg font-semibold mb-2">Welcome to Miles</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Miles is designed to help you track your running data in the simplest possible way.
                </p>
                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-black text-white rounded-lg py-2.5 font-medium"
                >
                  Get started
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="health-sync"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-x-4 top-20"
            >
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-black rounded-xl" />
                  <div className="w-4 h-4 text-red-500">❤️</div>
                </div>
                <h2 className="text-lg font-semibold mb-2">Apple Health Sync</h2>
                <p className="text-sm text-gray-600 mb-4">
                  You can connect with Apple Health to sync your running data with Miles.
                </p>
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                  <div className="w-5 h-5 bg-gray-200 rounded-full" />
                  <span>Runs added from Miles will send to Apple Health</span>
                </div>
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                  <div className="w-5 h-5 bg-gray-200 rounded-full" />
                  <span>Runs from Apple Watch and other apps will appear in Miles</span>
                </div>
                <button className="w-full bg-black text-white rounded-lg py-2.5 font-medium">
                  Continue
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}