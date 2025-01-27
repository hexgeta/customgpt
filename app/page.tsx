'use client'

import { useState } from 'react'
import { useToast } from "@/components/ui/use-toast"

export default function LegalLandingPage() {
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
          title: "Success!",
          description: "Thank you for your submission. We will contact you shortly.",
          className: "bg-green-500 text-white border-green-600",
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
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-mono tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Legal Assistance for AIMA Complaints
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl font-mono">
            Professional support for filing complaints against AIMA and assistance with Portuguese visa appointments.
          </p>
        </div>

        {/* Contact Form */}
        <div className="mt-10 max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="grid gap-6">
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
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-mono font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Get Legal Assistance
            </button>
          </form>
        </div>
      </div>
    </main>
  )
} 