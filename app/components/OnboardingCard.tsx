'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'

export default function OnboardingCard() {
  const [step, setStep] = useState(0)

  const screens = [
    {
      title: 'Welcome to Miles',
      description: 'Miles is designed to help you track your running data in the simplest possible way.',
      buttonText: 'Get started'
    },
    {
      title: 'Apple Health Sync',
      description: 'You can connect with Apple Health to sync your running data with Miles.',
      bulletPoints: [
        'Runs added from Miles will send to Apple Health',
        'Runs from Apple Watch and other apps will appear in Miles'
      ],
      buttonText: 'Continue'
    }
  ]

  const currentScreen = screens[step]

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-sm">
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-black p-2">
                    <svg className="h-5 w-5 text-white" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4.5 9.5c0 2.5-2 4.5-4.5 4.5s-4.5-2-4.5-4.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5z"
                      />
                    </svg>
                  </div>
                  {step === 1 && <div className="h-2 w-2 rounded-full bg-red-500" />}
                </div>
              </div>

              <h2 className="mb-2 text-xl font-semibold">{currentScreen.title}</h2>
              <p className="mb-4 text-gray-600">{currentScreen.description}</p>

              {currentScreen.bulletPoints && (
                <ul className="mb-4 space-y-2">
                  {currentScreen.bulletPoints.map((point, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="h-4 w-4">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                        </svg>
                      </div>
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              <Button
                className="w-full bg-black text-white hover:bg-black/90"
                onClick={() => setStep((prev) => prev + 1)}
              >
                {currentScreen.buttonText}
              </Button>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
} 