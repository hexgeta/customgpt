'use client'

import { useState, useEffect, ReactElement } from 'react'
import { useToast } from "@/components/ui/use-toast"
import Image from 'next/image'
import { Loader2, Check, Star, StarHalf, MessageCircle, CalendarIcon, X, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import Cookies from 'js-cookie'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { trackFormConversion } from '../utils/analytics'

// Add new fonts
import { Playfair_Display, DM_Sans, Inter } from 'next/font/google'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair'
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans'
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter'
})

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
  visaType: string;
  contactAttempts: string;
  currentExpiry: string;
  visaTypes: { value: string; label: string; }[];
}

export default function LegalLandingPageV2(): ReactElement {
  const { toast } = useToast()
  const [language, setLanguage] = useState<'pt' | 'en'>('en')
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    visaType: '',
    contactAttempts: '',
    currentExpiry: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const content: Record<'pt' | 'en', ContentType> = {
    pt: {
      title: "Não consegue agendar uma consulta na AIMA?",
      subtitle: "Podemos ajudar a protocolar um requerimento junto aos tribunais portugueses para solicitar o seu agendamento na AIMA.",
      benefits: [
        "Aproveite o precedente jurídico em Portugal para reivindicar o seu direito a uma consulta.",
        "Estipulação de prazos e penalidades financeiras à AIMA com o intuito de estimular uma resposta célere.",
        "Processo eficaz com prazo estimado entre 2 e 3 meses."
      ],
      fullName: "Nome Completo",
      email: "Endereço de e-mail",
      phone: "Número de Telefone",
      button: "Obter uma cotação rápida",
      rating: "Avaliação dos Clientes",
      offer: "Oferta Especial",
      expires: "Expira em",
      sale: "Promoção de Ano Novo",
      whatsappMsg: "Olá! Gostaria de obter mais informações acerca do serviço de agendamento na AIMA.",
      howItWorks: "Como Funciona",
      steps: [
        "Consulta Inicial – Analisamos o seu caso e explicamos o processo jurídico.",
        "Submissão da Petição – Preparámos e protocolamos a sua petição junto ao tribunal.",
        "Revisão Judicial – O seu caso é analisado por um juiz designado, que proferirá uma decisão.",
        "Agendamento da Consulta – Se aprovado, a AIMA indicará imediatamente a data da consulta."
      ],
      disclaimer: "Embora não possamos prever a decisão do tribunal, garantimos que a sua petição será preparada e protocolada de forma adequada, reforçando a sua posição para assegurar a consulta.",
      whyUs: "Porque trabalhar connosco?",
      reasons: [
        "Apoio Jurídico Especializado – Especialistas em processos administrativos judiciais.",
        "Total Transparência – Comunicação clara e sem taxas ocultas.",
        "Processo Sem Complicações – Tratamos de toda a documentação jurídica."
      ],
      visaType: "Tipo de Visto",
      contactAttempts: "Número de tentativas de contacto com a AIMA",
      currentExpiry: "",
      visaTypes: [
        { value: "TOURIST", label: "Visto de Turista" },
        { value: "D1", label: "D1 (Visto de Trabalho)" },
        { value: "D2", label: "D2 (Visto para Empreendedores)" },
        { value: "D3", label: "D3 (Visto para Atividades Altamente Qualificadas)" },
        { value: "D6", label: "D6 (Visto para Reagrupamento Familiar)" },
        { value: "D7", label: "D7 (Visto para Rendimento Passivo)" },
        { value: "D8", label: "D8 (Visto para Trabalho Remoto)" }
      ],
    },
    en: {
      title: "Unable to get an AIMA appointment?",
      subtitle: "We can help file a legal petition with the Portuguese courts to help secure your immigration appointment",
      benefits: [
        "Use the strong legal president in Portugal to enforce your right to an appointment",
        "Impose time constraints & financial penalties on AIMA to encourage a speedy response",
        "Efficient process with 2-3 month estimated timeline"
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
      disclaimer: "While we cannot guarantee the court's decision, we will ensure that your petition is properly prepared, submitted, and you stand in a strong position to get an appointment.",
      whyUs: "Why Work With Us?",
      reasons: [
        "Expert Legal Support – Specialized in administrative court filings",
        "Full Transparency – Clear communication and no hidden fees",
        "Hassle-Free Process – We handle all legal documentation"
      ],
      visaType: "Visa Type",
      contactAttempts: "Number of attempts to contact AIMA",
      currentExpiry: "",
      visaTypes: [
        { value: "TOURIST", label: "Tourist Visa" },
        { value: "D1", label: "D1 (Work Visa)" },
        { value: "D2", label: "D2 (Entrepreneur Visa)" },
        { value: "D3", label: "D3 (Highly Qualified Activities Visa)" },
        { value: "D6", label: "D6 (Family Reunification Visa)" },
        { value: "D7", label: "D7 (Passive Income Visa)" },
        { value: "D8", label: "D8 (Remote Work Visa)" }
      ],
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

    // Check each required field and show specific error message
    if (!formData.name) {
      toast({
        variant: "destructive",
        title: language === 'pt' ? "Erro" : "Error",
        description: language === 'pt'
          ? "Por favor insira o seu nome"
          : "Please enter your name",
      })
      return
    }

    if (!formData.visaType) {
      toast({
        variant: "destructive",
        title: language === 'pt' ? "Erro" : "Error",
        description: language === 'pt'
          ? "Por favor selecione o tipo de visto"
          : "Please select your visa type",
      })
      return
    }

    if (!formData.contactAttempts) {
      toast({
        variant: "destructive",
        title: language === 'pt' ? "Erro" : "Error",
        description: language === 'pt'
          ? "Por favor indique o número de tentativas de contacto com a AIMA"
          : "Please enter the number of times you've tried to contact AIMA",
      })
      return
    }

    if (!formData.currentExpiry) {
      toast({
        variant: "destructive",
        title: language === 'pt' ? "Erro" : "Error",
        description: language === 'pt'
          ? "Por favor selecione a data de expiração do seu visto"
          : "Please select your visa expiry date",
      })
      return
    }

    if (!formData.email) {
      toast({
        variant: "destructive",
        title: language === 'pt' ? "Erro" : "Error",
        description: language === 'pt'
          ? "Por favor insira o seu endereço de email"
          : "Please enter your email address",
      })
      return
    }

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
        // Track conversion
        trackFormConversion();
        
        toast({
          title: language === 'pt' ? "Sucesso" : "Success",
          description: language === 'pt' 
            ? "Obrigado pelo seu interesse. Entraremos em contacto em breve."
            : "Thank you for your submission. We will contact you shortly.",
        })
        setFormData({ name: '', email: '', phone: '', visaType: '', contactAttempts: '', currentExpiry: '' })
      } else {
        toast({
          variant: "destructive",
          title: language === 'pt' ? "Erro" : "Error",
          description: language === 'pt'
            ? "Houve um erro ao enviar o formulário. Por favor, tente novamente."
            : "There was an error submitting your form. Please try again.",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: language === 'pt' ? "Erro" : "Error",
        description: language === 'pt'
          ? "Houve um erro ao enviar o formulário. Por favor, tente novamente."
          : "There was an error submitting your form. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className={`${dmSans.variable} font-dm-sans`}>
      {/* Header */}
      <header className="w-full h-20 bg-white">
        <div className="max-w-[1440px] mx-auto h-full px-4 flex items-center justify-between">
          <div className="text-[#032e68] text-5xl font-bold font-dm-sans leading-[48px]">
            MSP
          </div>
          <div className="flex items-center gap-[120px]">
            <nav className="flex items-center gap-10">
              <a href="#how-it-works" className="text-[#032e68] text-base font-medium font-dm-sans leading-none">
                How it works
              </a>
              <a href="#specialist" className="text-[#032e68] text-base font-medium font-dm-sans leading-none">
                Your Specialist
              </a>
              <a href="#why-us" className="text-[#032e68] text-base font-medium font-dm-sans leading-none">
                Why Choose Us
              </a>
              <a href="#faq" className="text-[#032e68] text-base font-medium font-dm-sans leading-none">
                FAQ
              </a>
            </nav>
            <Button 
              className="px-4 py-2 bg-[#005bdc] text-white text-base font-medium font-dm-sans leading-none rounded"
              onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get A Quote
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 py-16">
          <div className="grid grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-10">
                <div>
                  <h1 className="text-[#032e68] text-[56px] font-semibold font-dm-sans leading-[56px]">
                    Unable to get an{' '}
                    <span className="text-[#032e68] text-6xl font-semibold font-dm-sans leading-[64px]">
                      AIMA appointment?
                    </span>
                  </h1>
                  <p className="text-[#032e68] text-base font-medium font-dm-sans leading-[18.56px] mt-6">
                    We can help file a legal petition with the<br/>
                    Portuguese courts to help secure your<br/>
                    immigration appointment.
                  </p>
                </div>
                <Button 
                  className="px-6 py-4 bg-[#005bdc] text-white text-base font-medium font-dm-sans leading-none rounded w-fit"
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Know more
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="flex gap-[21px]">
                <div className="w-[223px] h-[582px] bg-[#d9d9d9] rounded-lg" />
                <div className="relative w-[710px] h-[753px] rounded-lg overflow-hidden">
                  <Image
                    src="/bg1.jpg"
                    alt="Legal Support"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="w-[223px] h-[754px] bg-[#d9d9d9] rounded-lg" />
                <div className="relative w-[710px] h-[753px] rounded-lg overflow-hidden">
                  <Image
                    src="/bg2.jpg"
                    alt="Legal Support"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="w-[223px] h-[674px] bg-[#d9d9d9] rounded-lg" />
                <div className="relative w-[710px] h-[753px] rounded-lg overflow-hidden">
                  <Image
                    src="/bg3.jpg"
                    alt="Legal Support"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex flex-col items-center gap-[88px]">
            <div className="flex flex-col items-center gap-14">
              <h2 className="text-[#032e68] text-5xl font-semibold font-dm-sans leading-[48px] text-center">
                How It Works
              </h2>
              <div className="flex justify-between items-start gap-8">
                <div className="w-[464px] flex flex-col gap-12">
                  {currentContent.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-[#032e68] rounded-full flex justify-center items-center">
                        <span className="text-white text-2xl font-bold font-dm-sans leading-tight">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-[#032e68] text-base font-normal font-dm-sans leading-[18.56px]">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="px-10 py-6 bg-[#e5efff] rounded-lg flex flex-col justify-center items-center gap-6">
                  <div className="w-[51px] h-[51px] bg-[#032e68]" />
                  <p className="w-[487px] text-center text-[#032e68] text-2xl font-normal font-dm-sans leading-loose">
                    {currentContent.disclaimer}
                  </p>
                </div>
              </div>
            </div>

            {/* Specialist Section */}
            <div className="w-[1192px] h-[562px] bg-gray-50 rounded-2xl overflow-hidden">
              <div className="flex justify-between items-center px-[123px] py-6">
                <div className="w-[461px] flex flex-col gap-6">
                  <h2 className="text-[#032e68] text-[40px] font-semibold font-dm-sans leading-10">
                    Miguel Pires
                  </h2>
                  <div className="flex flex-col gap-2">
                    <p className="text-[#005bdc] text-xl font-semibold font-dm-sans leading-normal">
                      Portuguese Litigation Lawyer
                    </p>
                    <p className="text-gray-600 text-lg font-normal font-dm-sans leading-normal">
                      With a decade of experience in Portuguese tax & immigration law, Miguel Pires has helped hundreds of clients successfully navigate the Portuguese legal system and receive the outcomes they desire.
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </div>
                    <span className="text-gray-600 text-base font-normal font-dm-sans leading-none">
                      Client Rating
                    </span>
                  </div>
                  <div className="flex items-center gap-10">
                    <a 
                      href="https://msplawyer.io" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-[#032e68] text-base font-medium font-dm-sans leading-none"
                    >
                      <div className="w-6 h-6 border-2 border-[#005bdc] rounded-full" />
                      Website
                    </a>
                    <a 
                      href="https://www.upwork.com/freelancers/~0152fa2808750c7f47" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-[#032e68] text-base font-medium font-dm-sans leading-none"
                    >
                      <div className="w-8 h-6" />
                      Upwork
                    </a>
                  </div>
                </div>
                <div className="relative w-[530px] h-[574px]">
                  <Image
                    src="/Miguel.jpg"
                    alt="Miguel Pires - Immigration Lawyer"
                    fill
                    className="object-cover rounded-lg"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the sections will be updated next */}
      <section className="min-h-[80vh] relative overflow-hidden flex items-center pt-4 bg-[#fafafa]">
        {/* Hero Content */}
        <div className="relative w-full max-w-6xl mx-auto py-4 xs:py-8 md:py-16 lg:py-16 px-4 sm:px-6 lg:px-8">
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
            <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl leading-[1.2]">
              {currentContent.title}
            </h1>
            <p className="max-w-md mx-auto text-base text-gray-600 sm:text-lg mt-6 md:mt-6 md:text-xl md:max-w-3xl">
              {currentContent.subtitle}
            </p>

            {/* CTA Button */}
            <div className="mt-10">
              <a
                href="#how-it-works"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-[1.02]"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {language === 'pt' ? 'Saiba Mais' : 'Learn more'}
                <ChevronDown className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section>
        {/* Main Content Section */}
        <div className="bg-white pt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div id="how-it-works" className="max-w-3xl mx-auto text-center scroll-mt-24">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {currentContent.howItWorks}
              </h2>
              <div className="space-y-6">
                {currentContent.steps.map((step, index) => (
                  <div key={index} className="flex items-start text-left space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <p className="text-gray-600 text-lg">{step}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-blue-100 rounded-lg">
                <p className="text-gray-600">
                  📌 {currentContent.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lawyer Bio Section */}
        <div className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                <div className="grid md:grid-cols-2 gap-0 min-h-[200px]">
                  {/* Image */}
                  <div className="relative">
                    <Image
                      src="/Miguel.jpg"
                      alt="Miguel Pires - Immigration Lawyer"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>

                  {/* Bio Content */}
                  <div className="p-8 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Miguel Pires
                    </h2>
                    <p className="text-blue-600 font-medium mb-4">
                      {language === 'pt' ? 'Advogado Especialista em Imigração' : 'Portuguese Litigation Lawyer'}
                    </p>
                    <div className="space-y-4 text-gray-600">
                      <p>
                        {language === 'pt' 
                          ? 'Com uma década de experiência em direito da imigração, Miguel Pires ajudou centenas de clientes a navegar com sucesso pelo sistema de imigração português.'
                          : 'With a decade of experience in Portuguese tax & immigration law, Miguel Pires has helped hundreds of clients successfully navigate the Portuguese legal system and receive the outcomes they desire.'}
                      </p>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        </div>
                        <span className="text-xs text-gray-500">
                          {language === 'pt' ? 'Avaliação dos Clientes' : 'Client Rating'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <a 
                          href="https://msplawyer.io" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                        >
                          🌐 Website
                        </a>
                        <a 
                          href="https://www.upwork.com/freelancers/~0152fa2808750c7f47" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                        >
                          ⭐ Upwork Profile
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Benefits Section Image */}
              <div className="relative w-full h-[400px] md:h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="/bg1.jpg"
                  alt="Legal Support"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top rounded-2xl"
                  priority
                />
              </div>

              {/* Text Section*/}
              <div className="flex flex-col justify-top py-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 font-dm-sans">
                  Benefits for you
                </h2>
                <div className="space-y-3">
                  {currentContent.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 rounded-full bg-blue-100/50 flex items-center justify-center">
                          <Check className="w-4 h-4 text-blue-500" />
                        </div>
                      </div>
                      <p className="text-gray-600 text-base leading-relaxed font-dm-sans">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Work With Us Section */}
        <div className="mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Text Content */}
              <div className="order-2 md:order-1 flex flex-col justify-top py-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 font-dm-sans">
                  Why Work With Us?
                </h2>
                <div className="space-y-3">
                  {currentContent.reasons.map((reason, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 rounded-full bg-blue-100/50 flex items-center justify-center">
                          <Check className="w-4 h-4 text-blue-500" />
                        </div>
                      </div>
                      <p className="text-gray-600 text-base leading-relaxed font-dm-sans">{reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Work With Us Image */}
              <div className="order-1 md:order-2 relative w-full h-[400px] md:h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="/bg2.jpg"
                  alt="Legal Support"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 font-dm-sans">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Luis Testimonial */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-1 mb-4">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-grow">
                  <div className="text-[#1d2432] text-lg font-medium italic mb-6 font-dm-sans">
                    Great professional! all the information he provided us was valuable. Will work with Miguel again!
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-blue-500 font-semibold text-lg font-dm-sans">LUIS</p>
                  <p className="text-gray-500 text-sm font-dm-sans">Jan 15, 2024</p>
                </div>
              </div>
            </div>

            {/* Ivo Testimonial */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-1 mb-4">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-grow">
                  <div className="text-[#1d2432] text-lg font-medium italic mb-6 font-dm-sans">
                    Amazing info and suggestion professionally, definitely rehiring again anytime soon when needed.
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-blue-500 font-semibold text-lg font-dm-sans">IVO</p>
                  <p className="text-gray-500 text-sm font-dm-sans">Dec 28, 2023</p>
                </div>
              </div>
            </div>

            {/* Shai Testimonial */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-1 mb-4">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-grow">
                  <div className="text-[#1d2432] text-lg font-medium italic mb-6 font-dm-sans">
                    There's no doubt that Miguel is highly knowledgeable of the Portuguese tax laws. Will hire him again after a great consultation.
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-blue-500 font-semibold text-lg font-dm-sans">SHAI</p>
                  <p className="text-gray-500 text-sm font-dm-sans">Dec 12, 2023</p>
                </div>
              </div>
            </div>

            {/* Richard Testimonial */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-1 mb-4">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-grow">
                  <div className="text-[#1d2432] text-lg font-medium italic mb-6 font-dm-sans">
                    Miguel saved us hundreds of hours and an immense amount of money. Thank you.
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-blue-500 font-semibold text-lg font-dm-sans">RICHARD</p>
                  <p className="text-gray-500 text-sm font-dm-sans">Nov 30, 2023</p>
                </div>
              </div>
            </div>

            {/* Gennaro Testimonial */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-1 mb-4">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-grow">
                  <div className="text-[#1d2432] text-lg font-medium italic mb-6 font-dm-sans">
                    I didn't find any flaws in Miguel's performance. He was impressively punctual, highly informative, and got the impression that he went out of his way to help out. I'd highly recommend him to any prospective clients. Many thanks!
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-blue-500 font-semibold text-lg font-dm-sans">GENNARO</p>
                  <p className="text-gray-500 text-sm font-dm-sans">Nov 15, 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* FAQ Section */}
      <section>
        <div className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8 font-dm-sans">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-dm-sans">
                    How long does the legal process take?
                  </AccordionTrigger>
                  <AccordionContent className="font-dm-sans">
                    The process typically takes between 2 to 3 months. This includes preparing documentation, court submission, and obtaining the court decision.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-dm-sans">
                    What are the chances of success?
                  </AccordionTrigger>
                  <AccordionContent className="font-dm-sans">
                    Based on previous cases, we have a strong track record of success. However, each case is unique and depends on various factors, including proper documentation and a history of AIMA contact attempts. We cannot guarantee that the courts will grant you an appointment.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-dm-sans">
                    Do I need to appear in court personally?
                  </AccordionTrigger>
                  <AccordionContent className="font-dm-sans">
                    No, we handle the entire legal process on your behalf. You do not need to appear in court personally. The filing is purely administrative, so it is completed online and via post.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left font-dm-sans">
                    Am I eligible for this?
                  </AccordionTrigger>
                  <AccordionContent className="whitespace-pre-wrap font-dm-sans">
                    There are two crucial requirements for this process to work:

                    • You will need to have a visa or residence permit that is currently expired

                    • You will need to have sufficient proof of attempts to contact AIMA (emails, call logs)
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left font-dm-sans">
                    What documents are required?
                  </AccordionTrigger>
                  <AccordionContent className="whitespace-pre-wrap font-dm-sans">
                    We will need:

                    • A copy of your current expired visa or residence permit

                    • Sufficient proof of attempts to contact AIMA (emails, call logs)

                    • Basic identification documents (Passport, NIF, etc.)
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left font-dm-sans">
                    How much is this service?
                  </AccordionTrigger>
                  <AccordionContent className="font-dm-sans">
                    Details on pricing are provided upon quote request.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="w-full bg-[#fafafa] py-8">
        <div className="max-w-6xl mx-auto py-16">
          <div id="form" className="max-w-md mx-auto scroll-mt-24">
            <h2 className="text-3xl text-gray-900 text-center mb-6 font-dm-sans">
              Ready to take legal action?
            </h2>
            
            {/* Requirements */}
            <div className="mx-4">
              <form onSubmit={handleSubmit} className="grid gap-6 bg-white p-8 rounded-lg backdrop-blur-sm border border-gray-200 shadow-xl">
                {/* Requirements */}
                <div className="mb-4">
                  <div className="py-6 bg-red-100 rounded-lg border-2 border-red-200">
                    <p className="text-gray-600 text-center mb-2 underline font-bold font-dm-sans">
                      Requirements
                    </p>
                    <div className="text-gray-600 space-y-2 px-10 py-2 font-dm-sans">
                      <p>• Visa/permit currently expired</p>
                      <p>• Evidence of multiple attempts to contact AIMA</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="visaType" className="font-dm-sans">
                    Visa Type
                  </Label>
                  <Select
                    value={formData.visaType}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, visaType: value }))}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="bg-white font-dm-sans">
                      <SelectValue placeholder="Select visa type" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentContent.visaTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="font-dm-sans">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="currentExpiry" className="font-dm-sans">Current Expiry Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal bg-white font-dm-sans ${!formData.currentExpiry ? 'text-muted-foreground' : ''}`}
                        disabled={isSubmitting}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.currentExpiry ? format(new Date(formData.currentExpiry + 'T00:00:00'), "PPP") : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.currentExpiry ? new Date(formData.currentExpiry + 'T00:00:00') : undefined}
                        onSelect={(date) => {
                          if (date) {
                            const year = date.getFullYear()
                            const month = String(date.getMonth() + 1).padStart(2, '0')
                            const day = String(date.getDate()).padStart(2, '0')
                            setFormData(prev => ({ ...prev, currentExpiry: `${year}-${month}-${day}` }))
                          } else {
                            setFormData(prev => ({ ...prev, currentExpiry: '' }))
                          }
                        }}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                        className="rounded-md border"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="contactAttempts" className="font-dm-sans">
                    Number of attempts to contact AIMA
                  </Label>
                  <Input
                    type="number"
                    id="contactAttempts"
                    min="1"
                    value={formData.contactAttempts}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactAttempts: e.target.value }))}
                    disabled={isSubmitting}
                    className="font-dm-sans"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="name" className="font-dm-sans">Full Name</Label>
                  <Input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={isSubmitting}
                    className="font-dm-sans"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email" className="font-dm-sans">Email Address</Label>
                  <Input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={isSubmitting}
                    placeholder="email@example.com"
                    className="font-dm-sans"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone" className="font-dm-sans">Phone Number</Label>
                  <Input
                    type="tel"
                    id="phone"
                    pattern="[0-9+\s-]+"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+351 "
                    disabled={isSubmitting}
                    className="font-dm-sans"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-dm-sans"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Get a quick quote"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4 font-dm-sans">
              Legal Support - Immigration 2025
            </p>
            <p className="text-xs text-gray-500 max-w-4xl mx-auto font-dm-sans">
              Disclaimer: No attorney-client relationship or legal advice. This website is intended to provide general information about our firm and our services. Although this website may provide information regarding legal issues, your use of this website, including, but not limited to, your receipt, use, or sending of any information, materials, and communications provided or made by, in, to or through this website, does not constitute providing of legal services of any kind.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
} 