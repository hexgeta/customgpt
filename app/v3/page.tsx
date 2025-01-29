'use client'

import { useState } from 'react'
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Check } from "lucide-react"

export default function LegalLandingPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        toast({
          title: "Success",
          description: "Thank you for your submission. We will contact you shortly.",
        })
        setFormData({ name: '', email: '' })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen relative bg-[#000913] overflow-hidden flex  items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Base Grid Layer */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30 animate-grid" />
        
        {/* Glowing Orb */}
        <div className="absolute top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(0,128,255,0.15)_0%,_transparent_50%)]" />
        

        {/* Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.1)_0%,transparent_10%,transparent_50%,rgba(0,0,0,0.1)_51%)] bg-[length:100%_4px]" />
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-mono tracking-tight font-bold text-white sm:text-5xl md:text-6xl leading-[1.4]">
          Struggling To Get An Appointment At AIMA?
          </h1>
          <p className="max-w-xl mx-auto text-base text-blue-200 sm:text-lg mt-4 md:mt-4 md:text-l md:max-w-4xl font-mono">
          You're not alone—over 500,000 people are stuck in the queue, and the wait keeps growing daily.
          </p>
          <div className="mt-6 max-w-2xl mx-auto space-y-3">
            <div className="flex items-center text-left text-blue-200 sm:text-lg space-x-3 font-mono">
              <Check className="w-6 h-6 flex-shrink-0 text-blue-400" />
              <span>Fast-track your application - get results in just 1 month</span>
            </div>
            <div className="flex items-center text-left text-blue-200 sm:text-lg space-x-3 font-mono">
              <Check className="w-6 h-6 flex-shrink-0 text-blue-400" />
              <span>Affordable solution - only €500 flat fee</span>
            </div>
            <div className="flex items-center text-left text-blue-200 sm:text-lg space-x-3 font-mono">
              <Check className="w-6 h-6 flex-shrink-0 text-blue-400" />
              <span>Professional legal representation to handle your case</span>
            </div>
            <div className="flex items-center text-left text-blue-200 sm:text-lg space-x-3 font-mono">
              <Check className="w-6 h-6 flex-shrink-0 text-blue-400" />
              <span>Skip the endless waiting queue and secure your appointment</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-6 max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="grid gap-6 bg-black/40 p-6 rounded-lg backdrop-blur-sm border border-blue-500/20">
            <div>
              <label htmlFor="name" className="block text-sm font-mono font-medium text-blue-200">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="mt-1 block w-full rounded-md bg-black/30 border-blue-500/30 text-blue-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono placeholder-blue-300/30"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-mono font-medium text-blue-200">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full rounded-md bg-black/30 border-blue-500/30 text-blue-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono placeholder-blue-300/30"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-blue-500/30 rounded-md shadow-sm text-sm font-mono font-medium text-blue-100 bg-blue-500/20 hover:bg-blue-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:scale-[1.02] backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Start Your Application"
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
} 