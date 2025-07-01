'use client'

import { useState, useEffect, ReactElement, useRef } from 'react'
import { useToast } from "@/components/ui/use-toast"
import Image from 'next/image'
import { Loader2, Check, Star, StarHalf, MessageCircle, CalendarIcon, X, ChevronDown } from "lucide-react"
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
import { DM_Sans } from 'next/font/google'
import { AnimatePresence, motion } from 'framer-motion'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans'
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
      button: "Contacte-nos",
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
      subtitle: "We can help file a legal petition with the Portuguese courts to help secure your immigration appointment.",
      benefits: [
        "Use the strong legal president in Portugal to enforce your right to an appointment",
        "Impose time constraints & financial penalties on AIMA to encourage a speedy response",
        "Efficient process with 2-3 month estimated timeline"
      ],
      fullName: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      button: "Contact Us",
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Height of the header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <main className={`${dmSans.className} min-h-screen`}>
      <header className="w-full h-20 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-[1440px] mx-auto h-full px-4 flex items-center justify-between">
          <div className="flex items-center ml-4">
            <Image
              src="/favicon.jpg"
              alt="MSP Logo"
              width={38}
              height={38}
              className="object-contain"
              priority
            />
          </div>
          <div className="hidden lg:flex items-center gap-8 py-8">
            <nav className="flex items-center gap-10 bg-white/90 backdrop-blur-md px-8 py-4 rounded-full border-grey/50 shadow-sm">
              <button onClick={() => scrollToSection('how-it-works')} className="text-[#032e68] text-lg font-medium font-dm-sans leading-none hover:text-[#005bdc] transition-all duration-300 relative group">
                How it works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#005bdc] group-hover:w-full transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100" />
              </button>
              <button onClick={() => scrollToSection('specialist')} className="text-[#032e68] text-lg font-medium font-dm-sans leading-none hover:text-[#005bdc] transition-all duration-300 relative group">
                Your Specialist
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#005bdc] group-hover:w-full transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100" />
              </button>
              <button onClick={() => scrollToSection('why-us')} className="text-[#032e68] text-lg font-medium font-dm-sans leading-none hover:text-[#005bdc] transition-all duration-300 relative group">
                Why Choose Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#005bdc] group-hover:w-full transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100" />
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-[#032e68] text-lg font-medium font-dm-sans leading-none hover:text-[#005bdc] transition-all duration-300 relative group">
                FAQ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#005bdc] group-hover:w-full transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100" />
              </button>
            </nav>
            <Button 
              className="px-6 py-6 bg-[#005bdc]/90 backdrop-blur-sm text-white text-lg font-medium font-dm-sans leading-none rounded-full hover:bg-[#0046a8] transition-all duration-300"
              onClick={() => scrollToSection('contact')}
            >
              {language === 'pt' ? 'Contacte-nos' : 'Contact Us'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex flex-col justify-center items-center group mr-4 border-grey/50"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            aria-label="Toggle menu"
          >
            <span className="w-5 h-[2px] bg-[#032e68] my-[3px] transition-all duration-300 group-hover:bg-[#005bdc]"></span>
            <span className="w-5 h-[2px] bg-[#032e68] my-[3px] transition-all duration-300 group-hover:bg-[#005bdc]"></span>
            <span className="w-5 h-[2px] bg-[#032e68] my-[3px] transition-all duration-300 group-hover:bg-[#005bdc]"></span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          >
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="absolute right-4 top-24 w-64 bg-white backdrop-blur-md p-4 shadow-sm z-50 rounded-2xl border border-white/10"
            >
              <button 
                onClick={() => { scrollToSection('how-it-works'); setIsMenuOpen(false); }} 
                className="block text-[#032e68] hover:text-[#005bdc] py-2 font-dm-sans w-full text-left hover:bg-gray-50 px-3 rounded-lg transition-all duration-300 relative group hover:pl-5"
              >
                How it works
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 group-hover:w-1 group-hover:h-1/2 bg-[#005bdc] transition-all duration-300 rounded-r-full opacity-0 group-hover:opacity-100" />
              </button>
              <button 
                onClick={() => { scrollToSection('specialist'); setIsMenuOpen(false); }} 
                className="block text-[#032e68] hover:text-[#005bdc] py-2 font-dm-sans w-full text-left hover:bg-gray-50 px-3 rounded-lg transition-all duration-300 relative group hover:pl-5"
              >
                Your Specialist
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 group-hover:w-1 group-hover:h-1/2 bg-[#005bdc] transition-all duration-300 rounded-r-full opacity-0 group-hover:opacity-100" />
              </button>
              <button 
                onClick={() => { scrollToSection('why-us'); setIsMenuOpen(false); }} 
                className="block text-[#032e68] hover:text-[#005bdc] py-2 font-dm-sans w-full text-left hover:bg-gray-50 px-3 rounded-lg transition-all duration-300 relative group hover:pl-5"
              >
                Why Choose Us
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 group-hover:w-1 group-hover:h-1/2 bg-[#005bdc] transition-all duration-300 rounded-r-full opacity-0 group-hover:opacity-100" />
              </button>
              <button 
                onClick={() => { scrollToSection('faq'); setIsMenuOpen(false); }} 
                className="block text-[#032e68] hover:text-[#005bdc] py-2 font-dm-sans w-full text-left hover:bg-gray-50 px-3 rounded-lg transition-all duration-300 relative group hover:pl-5"
              >
                FAQ
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 group-hover:w-1 group-hover:h-1/2 bg-[#005bdc] transition-all duration-300 rounded-r-full opacity-0 group-hover:opacity-100" />
              </button>
              <Button 
                className="w-full mt-4 bg-[#005bdc]/90 text-white hover:bg-[#0046a8] transition-all duration-300 rounded-full"
                onClick={() => {
                  scrollToSection('contact');
                  setIsMenuOpen(false);
                }}
              >
                {language === 'pt' ? 'Contacte-nos' : 'Contact Us'}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-20">
        <section className="min-h-[80vh] relative overflow-hidden flex items-center pt-4 bg-[#fafafa]">
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
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200"
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

        <section className="bg-white pt-16" id="how-it-works">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center scroll-mt-24">
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
        </section>

        <section className="bg-white py-16" id="specialist">
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
        </section>

        <section className="bg-white mt-20">
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
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {language === 'pt' ? 'Benefícios' : 'Benefits for you'}
                </h2>
                <div className="space-y-3">
                  {currentContent.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 rounded-full bg-blue-100/50 flex items-center justify-center">
                          <Check className="w-4 h-4 text-blue-500" />
                        </div>
                      </div>
                      <p className="text-gray-600 text-base leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white mt-20" id="why-us">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Text Content */}
              <div className="order-2 md:order-1 flex flex-col justify-top py-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {currentContent.whyUs}
                </h2>
                <div className="space-y-3">
                  {currentContent.reasons.map((reason, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 rounded-full bg-blue-100/50 flex items-center justify-center">
                          <Check className="w-4 h-4 text-blue-500" />
                        </div>
                      </div>
                      <p className="text-gray-600 text-base leading-relaxed">{reason}</p>
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
        </section>

        <section className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {language === 'pt' ? 'O Que Dizem Nossos Clientes' : 'What Our Clients Say'}
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
                    <div className="text-[#1d2432] text-lg font-medium italic mb-6">
                      {language === 'pt' ?
                        "Profissional de excelência! Toda a informação que nos prestou foi de elevado valor. Voltarei a contar com os serviços do Miguel." :
                        "Great professional! all the information he provided us was valuable. Will work with Miguel again!"}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-blue-500 font-semibold text-lg">LUIS</p>
                    <p className="text-gray-500 text-sm">Jan 15, 2024</p>
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
                    <div className="text-[#1d2432] text-lg font-medium italic mb-6">
                      {language === 'pt' ?
                        "As informações e sugestões, prestadas de forma profissional, foram excecionais. Certamente recorrerei novamente aos seus serviços assim que se fizer necessário." :
                        "Amazing info and suggestion professionally, definitely rehiring again anytime soon when needed."}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-blue-500 font-semibold text-lg">IVO</p>
                    <p className="text-gray-500 text-sm">Dec 28, 2023</p>
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
                    <div className="text-[#1d2432] text-lg font-medium italic mb-6">
                      {language === 'pt' ?
                        "Sem dúvida, o Miguel possui um conhecimento aprofundado da legislação fiscal portuguesa. Voltarei a recorrer aos seus serviços após uma consulta de elevada qualidade." :
                        "There's no doubt that Miguel is highly knowledgeable of the Portuguese tax laws. Will hire him again after a great consultation."}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-blue-500 font-semibold text-lg">SHAI</p>
                    <p className="text-gray-500 text-sm">Dec 12, 2023</p>
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
                    <div className="text-[#1d2432] text-lg font-medium italic mb-6">
                      {language === 'pt' ?
                        "O Miguel poupou-nos centenas de horas e uma quantia considerável de dinheiro. Agradeço imensamente." :
                        "Miguel saved us hundreds of hours and an immense amount of money. Thank you."}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-blue-500 font-semibold text-lg">RICHARD</p>
                    <p className="text-gray-500 text-sm">Nov 30, 2023</p>
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
                    <div className="text-[#1d2432] text-lg font-medium italic mb-6">
                      {language === 'pt' ?
                        "Não identifiquei qualquer falha na atuação do Miguel. Foi impressionantemente pontual, extremamente informativo e demonstrou um empenho notável para ajudar. Recomendo-o vivamente a todos os potenciais clientes. Muito obrigado!" :
                        "I didn't find any flaws in Miguel's performance. He was impressively punctual, highly informative, and got the impression that he went out of his way to help out. I'd highly recommend him to any prospective clients. Many thanks!"}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-blue-500 font-semibold text-lg">GENNARO</p>
                    <p className="text-gray-500 text-sm">Nov 15, 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16" id="faq">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                {language === 'pt' ? 'Perguntas Frequentes' : 'Frequently Asked Questions'}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b border-gray-200">
                  <AccordionTrigger className="text-left hover:no-underline group">
                    <span className="text-gray-900 group-hover:text-[#005bdc] transition-colors duration-200">
                      {language === 'pt' 
                        ? 'Quanto tempo demora o processo legal?' 
                        : 'How long does the legal process take?'}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {language === 'pt'
                      ? 'O processo geralmente demora entre 2 e 3 meses, incluindo a preparação da documentação, a submissão ao tribunal e a obtenção da decisão judicial.'
                      : 'The process typically takes between 2 to 3 months. This includes preparing documentation, court submission, and obtaining the court decision.'}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-b border-gray-200">
                  <AccordionTrigger className="text-left hover:no-underline group">
                    <span className="text-gray-900 group-hover:text-[#005bdc] transition-colors duration-200">
                      {language === 'pt'
                        ? 'Quais são as chances de sucesso?'
                        : 'What are the chances of success?'}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {language === 'pt'
                      ? 'Com base em casos anteriores, temos um histórico forte de sucesso. No entanto, cada caso é único e depende de vários fatores, incluindo a documentação adequada e o histórico de tentativas de contato com a AIMA. Não podemos garantir que os tribunais concederão um agendamento.'
                      : 'Based on previous cases, we have a strong track record of success. However, each case is unique and depends on various factors, including proper documentation and a history of AIMA contact attempts. We cannot guarantee that the courts will grant you an appointment.'}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-b border-gray-200">
                  <AccordionTrigger className="text-left hover:no-underline group">
                    <span className="text-gray-900 group-hover:text-[#005bdc] transition-colors duration-200">
                      {language === 'pt'
                        ? 'Preciso comparecer ao tribunal pessoalmente?'
                        : 'Do I need to appear in court personally?'}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {language === 'pt'
                      ? 'Não, tratamos de todo o processo jurídico em seu nome. Não é necessário comparecer pessoalmente ao tribunal, uma vez que o procedimento é exclusivamente administrativo, realizado online e por correio.'
                      : 'No, we handle the entire legal process on your behalf. You do not need to appear in court personally. The filing is purely administrative, so it is completed online and via post.'}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-b border-gray-200">
                  <AccordionTrigger className="text-left hover:no-underline group">
                    <span className="text-gray-900 group-hover:text-[#005bdc] transition-colors duration-200">
                      {language === 'pt'
                        ? 'Sou elegível para este processo?'
                        : 'Am I eligible for this?'}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {language === 'pt'
                      ? 'Existem dois requisitos essenciais para o processamento deste pedido:\n\n• Possuir um visto ou autorização de residência que se encontre atualmente expirado;\n\n• Dispor de provas suficientes das várias tentativas de contacto com a AIMA (e-mails, registos de chamadas).'
                      : 'There are two crucial requirements for this process to work:\n\n• You will need to have a visa or residence permit that is currently expired\n\n• You will need to have sufficient proof of attempts to contact AIMA (emails, call logs)'}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border-b border-gray-200">
                  <AccordionTrigger className="text-left hover:no-underline group">
                    <span className="text-gray-900 group-hover:text-[#005bdc] transition-colors duration-200">
                      {language === 'pt'
                        ? 'Que documentos são necessários?'
                        : 'What documents are required?'}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {language === 'pt'
                      ? 'Exigiremos:\n\n• Uma cópia do seu visto ou autorização de residência que se encontre expirado;\n\n• Provas suficientes das tentativas de contacto com a AIMA (e-mails, registos de chamadas);\n\n• Documentos de identificação básicos (passaporte, NIF, etc.).'
                      : 'We will need:\n\n• A copy of your current expired visa or residence permit\n\n• Sufficient proof of attempts to contact AIMA (emails, call logs)\n\n• Basic identification documents (Passport, NIF, etc.)'}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="border-b border-gray-200">
                  <AccordionTrigger className="text-left hover:no-underline group">
                    <span className="text-gray-900 group-hover:text-[#005bdc] transition-colors duration-200">
                      {language === 'pt'
                        ? 'Qual é o custo deste serviço?'
                        : 'How much is this service?'}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {language === 'pt'
                      ? 'Os detalhes relativos aos preços serão facultados mediante pedido de cotação.'
                      : 'Details on pricing are provided upon quote request.'}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white py-16" id="contact">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {language === 'pt' ? 'Informações de Contacto' : 'Contact Information'}
              </h2>
              <p className="text-gray-600 text-lg">
                <a
                  href="mailto:miguel.pires@msplawyer.io"
                  className="text-blue-600 hover:text-blue-700 font-medium underline decoration-dotted"
                >
                  miguel.pires@msplawyer.io
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Apoiojurídico-Imigração 2025
              </p>
              <p className="text-xs text-gray-500 max-w-4xl mx-auto">
                {language === 'pt' 
                  ? 'Aviso Legal: Não existe relação advogado-cliente ou aconselhamento jurídico. Este website destina-se a fornecer informações gerais sobre a nossa empresa e os nossos serviços. Embora este website possa fornecer informações sobre questões jurídicas, a sua utilização, incluindo, mas não se limitando a, recepção, uso ou envio de quaisquer informações, materiais e comunicações fornecidas ou feitas por, em, para ou através deste website, não constitui prestação de serviços jurídicos de qualquer tipo.'
                  : 'Disclaimer: No attorney-client relationship or legal advice. This website is intended to provide general information about our firm and our services. Although this website may provide information regarding legal issues, your use of this website, including, but not limited to, your receipt, use, or sending of any information, materials, and communications provided or made by, in, to or through this website, does not constitute providing of legal services of any kind.'}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
} 