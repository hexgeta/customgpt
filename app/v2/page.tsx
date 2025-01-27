'use client'

import { useState } from 'react'
import { useToast } from "@/components/ui/use-toast"

export default function LegalLandingPageV2() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden flex items-center">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-[url('/bg1.jpg')] bg-cover bg-center"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-white/60 to-white/90"
        />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-mono tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Struggling To Get An Appointment At AIMA?
          </h1>
          <p className="max-w-md mx-auto text-base text-gray-600 sm:text-lg mt-6 md:mt-6 md:text-xl md:max-w-3xl font-mono">
          You're not alone—over 500,000 people are stuck in the queue, and the wait keeps growing daily.</p>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl font-mono">
          Take control of your EU right to a visa today. For just €500, file an official legal complaint and secure your appointment in less than 1 month. Don't wait—act now and bypass the delays!          </p>
        </div>

        {/* Contact Form */}
        <div className="mt-10 max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="grid gap-6 bg-white/80 p-6 rounded-lg backdrop-blur-sm border border-gray-200 shadow-xl">
            <div>
              <label htmlFor="name" className="block text-sm font-mono font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-mono font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-mono font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:scale-[1.02]"
            >
              Start Your Application
            </button>
          </form>
        </div>
      </div>
    </main>
  )
} 