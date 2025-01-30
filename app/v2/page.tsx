'use client'

import { useState, useEffect } from 'react'
import { useToast } from "@/components/ui/use-toast"
import Image from 'next/image'
import { Loader2, Check, Star, StarHalf, MessageCircle } from "lucide-react"
import Cookies from 'js-cookie'

type ContentType = {
  title: string;
  subtitle: string;
  benefits: string[];
  fullName: string;
  email: string;
  phone: string;
  button: string;
  rating: string;
  offer: string;
  expires: string;
  sale: string;
  whatsappMsg: string;
  howItWorks: string;
  steps: string[];
  disclaimer: string;
  whyUs: string;
  reasons: string[];
}

export default function LegalLandingPageV2() {
  const { toast } = useToast()
  const [language, setLanguage] = useState<'pt' | 'en'>('pt')
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const content: Record<'pt' | 'en', ContentType> = {
    pt: {
      title: "Não consegue marcar uma consulta na AIMA?",
      subtitle: "Podemos ajudar a apresentar uma petição legal nos tribunais portugueses para garantir a sua consulta de imigração",
      benefits: [
        "Ação legal através dos tribunais portugueses para proteger o seu direito a uma consulta de imigração",
        "Imposição de prazos e penalidades financeiras à AIMA para incentivar uma resposta rápida",
        "Processo eficiente com prazo estimado de 2-3 meses",
        "Serviço jurídico profissional com total transparência"
      ],
      fullName: "Nome Completo",
      email: "Endereço de Email",
      phone: "Número de Telefone",
      button: "Obter cotação rápida",
      rating: "Avaliação dos Clientes",
      offer: "Oferta Especial",
      expires: "Termina em",
      sale: "Promoção de Ano Novo",
      whatsappMsg: "Olá! Gostaria de saber mais sobre o serviço de marcação na AIMA.",
      howItWorks: "Como Funciona",
      steps: [
        "Consulta Inicial – Analisamos o seu caso e explicamos o processo legal",
        "Apresentação ao Tribunal – Preparamos e submetemos a sua petição legal",
        "Revisão do Tribunal – O seu caso é analisado por um juiz designado e é tomada uma decisão",
        "Marcação da Consulta – Se aprovado, a AIMA fornecerá uma data de consulta imediatamente"
      ],
      disclaimer: "Embora não possamos garantir a decisão do tribunal, garantimos que a sua petição é devidamente preparada, submetida e que estará numa posição forte para obter uma consulta.",
      whyUs: "Porquê Trabalhar Connosco?",
      reasons: [
        "Apoio Jurídico Especializado – Especializados em processos administrativos judiciais",
        "Total Transparência – Comunicação clara e sem taxas ocultas",
        "Processo Sem Complicações – Tratamos de toda a documentação legal"
      ]
    },
    en: {
      title: "Unable to get an AIMA appointment?",
      subtitle: "We can help file a legal petition with the Portuguese courts to help secure your immigration appointment",
      benefits: [
        "Legal action through Portuguese courts to protect your right to an immigration appointment",
        "Impose time constraints & financial penalties on AIMA to encourage a speedy response",
        "Efficient process with 2-3 month estimated timeline",
        "Professional legal service with full transparency"
      ],
      fullName: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      button: "Get a quick quote",
      rating: "Customer Rating",
      offer: "Special Offer",
      expires: "Ends in",
      sale: "New Year Sale",
      whatsappMsg: "Hi! I would like to know more about the AIMA appointment service.",
      howItWorks: "How It Works",
      steps: [
        "Initial Consultation – We review your case and explain the legal process",
        "Court Filing – We prepare and submit your legal petition",
        "Court Review – Your case is reviewed by an assigned judge and a decision is made",
        "Appointment Scheduling – If approved, AIMA will provide an appointment date immediately"
      ],
      disclaimer: "While we cannot guarantee the court's decision, we ensure that your petition is properly prepared, submitted, and you stand in a strong position to get an appointment.",
      whyUs: "Why Work With Us?",
      reasons: [
        "Expert Legal Support – Specialized in administrative court filings",
        "Full Transparency – Clear communication and no hidden fees",
        "Hassle-Free Process – We handle all legal documentation"
      ]
    }
  }

  const currentContent = content[language]

  useEffect(() => {
    // Get or set the expiration timestamp cookie
    const getOrSetExpirationTime = () => {
      const existingTimestamp = Cookies.get('countdown_expiration')
      if (existingTimestamp) {
        return parseInt(existingTimestamp)
      }
      
      // Set new expiration time (2.7 hours from now)
      const newExpiration = Date.now() + (2.7 * 60 * 60 * 1000)
      Cookies.set('countdown_expiration', newExpiration.toString(), { expires: 3 }) // Cookie expires in 3 days
      return newExpiration
    }

    const expirationTime = getOrSetExpirationTime()

    const updateCountdown = () => {
      const now = Date.now()
      const timeRemaining = Math.max(0, expirationTime - now)

      if (timeRemaining === 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const hours = Math.floor(timeRemaining / (1000 * 60 * 60))
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)

      setTimeLeft({ hours, minutes, seconds })
    }

    // Initial update
    updateCountdown()

    // Update every second
    const timer = setInterval(updateCountdown, 1000)

    return () => clearInterval(timer)
  }, [])

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
        setFormData({ name: '', email: '', phone: '' })
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
    <>
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden flex items-center pt-12 sm:pt-4 bg-[#fafafa]">
        {/* Hero Content */}
        <div className="relative w-full max-w-6xl mx-auto py-8 xs:py-12 md:py-16 lg:py-16 px-4 sm:px-6 lg:px-8">
          {/* Language Toggle */}
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setLanguage('pt')}
                className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 transition-all ${language === 'pt' ? 'border-blue-500 scale-100' : 'border-transparent opacity-50 hover:opacity-75'}`}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <div className="w-full h-full">
                  <Image
                    src="/pt-flag.svg"
                    alt="Portuguese"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 transition-all ${language === 'en' ? 'border-blue-500 scale-100' : 'border-transparent opacity-50 hover:opacity-75'}`}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <div className="w-full h-full">
                  <Image
                    src="/us-flag.svg"
                    alt="English"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </button>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-mono tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl leading-[1.2]">
              {currentContent.title}
            </h1>
            <p className="max-w-md mx-auto text-base text-gray-600 sm:text-lg mt-6 md:mt-6 md:text-xl md:max-w-3xl font-mono">
              {currentContent.subtitle}
            </p>

            {/* CTA Button */}
            <div className="mt-10">
              <a
                href="#how-it-works"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-[1.02] font-mono"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {language === 'pt' ? 'Saber Mais' : 'Learn more'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* How It Works Section */}
          <div id="how-it-works" className="max-w-3xl mx-auto text-center scroll-mt-24">
            <h2 className="text-3xl font-mono font-bold text-gray-900 mb-8">
              {currentContent.howItWorks}
            </h2>
            <div className="space-y-6">
              {currentContent.steps.map((step, index) => (
                <div key={index} className="flex items-start text-left space-x-4 font-mono">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <p className="text-gray-600 text-lg">{step}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 font-mono">
                📌 {currentContent.disclaimer}
              </p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-mono font-bold text-gray-900 mb-12 text-center">
              {language === 'pt' ? 'Benefícios' : 'Benefits'}
            </h2>
            <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
              {/* Image */}
              <div className="md:col-span-2 relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="/bg1.jpg"
                  alt="Legal Support"
                  fill
                  className="object-cover object-top rounded-2xl"
                  priority
                />
              </div>

              {/* Benefits Content */}
              <div className="md:col-span-3 px-4 md:px-6">
                <div className="space-y-6">
                  {currentContent.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4 font-mono">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-blue-100/50 flex items-center justify-center">
                          <Check className="w-5 h-5 text-blue-500" />
                        </div>
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Why Work With Us Section */}
          <div className="mt-16 relative overflow-hidden py-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-mono font-bold text-gray-900 mb-12 text-center">
                {currentContent.whyUs}
              </h2>
              <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
                {/* Text Content */}
                <div className="md:col-span-3 px-4 md:px-6">
                  <div className="space-y-8">
                    {currentContent.reasons.map((reason, index) => (
                      <div key={index} className="flex items-start space-x-4 font-mono">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-blue-100/50 flex items-center justify-center">
                            <Check className="w-5 h-5 text-blue-500" />
                          </div>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed">{reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image */}
                <div className="md:col-span-2 relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
                  <Image
                    src="/bg2.jpg"
                    alt="Legal Support"
                    fill
                    className="object-cover object-top rounded-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <div className="w-full bg-blue-50/80">
        <div className="max-w-6xl mx-auto py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-mono font-bold text-gray-900 mb-8">
              {language === 'pt' ? 'Requisitos' : 'Requirements'}
            </h2>
            <div className="space-y-4">
              {(language === 'pt' ? [
                'Visto expirado',
                'Comprovativo de tentativa de contacto com a AIMA'
              ] : [
                'Expired visa',
                'Evidence of contacting AIMA'
              ]).map((requirement, index) => (
                <div key={index} className="flex items-start space-x-4 font-mono justify-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-100/50 flex items-center justify-center">
                      <Check className="w-5 h-5 text-blue-500" />
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed text-left">{requirement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="w-full bg-blue-50/80">
        <div className="max-w-6xl mx-auto py-16">
          <div id="form" className="max-w-md mx-auto scroll-mt-24">
            <h2 className="text-3xl font-mono font-bold text-gray-900 text-center mb-6">
              {language === 'pt' ? 'Pronto para ação legal?' : 'Ready to take legal action?'}
            </h2>
            <div className="mx-4">
              <form onSubmit={handleSubmit} className="grid gap-6 bg-white p-8 rounded-lg backdrop-blur-sm border border-gray-200 shadow-xl">
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
                <div>
                  <label htmlFor="phone" className="block text-sm font-mono font-medium text-gray-700">
                    {currentContent.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    pattern="[0-9+\s-]+"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+351 "
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
        </div>
      </div>

      {/* Sticky WhatsApp Widget */}
      <a
        href={`https://wa.me/351920229287?text=${encodeURIComponent(currentContent.whatsappMsg)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50"
        aria-label="Chat on WhatsApp"
      >
        <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#20BA56] text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110">
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
      </a>
    </>
  )
} 