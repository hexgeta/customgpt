'use client'

import { useState } from 'react'
import { useToast } from "@/components/ui/use-toast"
import Image from 'next/image'
import { Loader2, Check } from "lucide-react"

export default function LegalLandingPageV2() {
  const { toast } = useToast()
  const [language, setLanguage] = useState<'pt' | 'en'>('pt')
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const content = {
    pt: {
      title: "Dificuldade em Conseguir um Agendamento na AIMA?",
      subtitle: "Você não está sozinho—mais de 500.000 pessoas estão presas na fila, e a espera continua crescendo diariamente.",
      benefits: [
        "Acelere seu processo - obtenha resultados em apenas 1 mês",
        "Solução acessível - apenas €500 taxa única",
        "Representação jurídica profissional para cuidar do seu caso",
        "Evite a fila de espera interminável e garanta seu agendamento"
      ],
      fullName: "Nome Completo",
      email: "Endereço de Email",
      button: "Iniciar Sua Aplicação"
    },
    en: {
      title: "Struggling To Get An Appointment At AIMA?",
      subtitle: "You're not alone—over 500,000 people are stuck in the queue, and the wait keeps growing daily.",
      benefits: [
        "Fast-track your application - get results in just 1 month",
        "Affordable solution - only €500 flat fee",
        "Professional legal representation to handle your case",
        "Skip the endless waiting queue and secure your appointment"
      ],
      fullName: "Full Name",
      email: "Email Address",
      button: "Start Your Application"
    }
  }

  const currentContent = content[language]

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
        body: JSON.stringify({
          ...formData,
          language
        }),
      })
      
      if (response.ok) {
        toast({
          title: language === 'pt' ? "Sucesso" : "Success",
          description: language === 'pt' 
            ? "Obrigado pelo seu interesse. Entraremos em contato em breve."
            : "Thank you for your submission. We will contact you shortly.",
        })
        setFormData({ name: '', email: '' })
      }
    } catch (error) {
      toast({
        title: language === 'pt' ? "Erro" : "Error",
        description: language === 'pt'
          ? "Houve um erro ao enviar o formulário. Por favor, tente novamente."
          : "There was an error submitting your form. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden flex items-center">
      {/* Language Toggle */}
      <div className="fixed top-4 right-4 sm:right-10 z-50 flex items-center gap-2">
        <button
          onClick={() => setLanguage('pt')}
          className={`w-11 h-11 rounded-full overflow-hidden border-2 transition-all touch-manipulation ${language === 'pt' ? 'border-blue-500 scale-100' : 'border-transparent opacity-50 hover:opacity-75'}`}
        >
          <Image
            src="/pt-flag.svg"
            alt="Portuguese"
            width={32}
            height={32}
            className="w-full h-full object-cover"
            priority
          />
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`w-11 h-11 rounded-full overflow-hidden border-2 transition-all touch-manipulation ${language === 'en' ? 'border-blue-500 scale-100' : 'border-transparent opacity-50 hover:opacity-75'}`}
        >
          <Image
            src="/us-flag.svg"
            alt="English"
            width={32}
            height={32}
            className="w-full h-full object-cover"
            priority
          />
        </button>
      </div>

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
      <div className="relative w-full max-w-6xl mx-auto py-20 xs:py-20 md:py-20 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-mono tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl leading-[1.2]">
            {currentContent.title}
          </h1>
          <p className="max-w-md mx-auto text-base text-gray-600 sm:text-lg mt-6 md:mt-6 md:text-xl md:max-w-3xl font-mono">
            {currentContent.subtitle}
          </p>
          <div className="mt-6 max-w-2xl mx-auto space-y-3">
            {currentContent.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-left text-gray-600 sm:text-lg space-x-3 font-mono">
                <Check className="w-7 h-7 flex-shrink-0 text-blue-500" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-10 max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="grid gap-6 bg-white/80 p-6 rounded-lg backdrop-blur-sm border border-gray-200 shadow-xl">
            <div>
              <label htmlFor="name" className="block text-sm font-mono font-medium text-gray-700">
                {currentContent.fullName}
              </label>
              <input
                type="text"
                id="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-mono font-medium text-gray-700">
                {currentContent.email}
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-mono font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                currentContent.button
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
} 