'use client'

import { useState, useEffect, ReactElement, useRef } from 'react'
import Image from 'next/image'
import { Check, Star, ChevronDown, Zap, Shield, Globe, MessageCircle, BarChart3, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Inter } from 'next/font/google'
import { AnimatePresence, motion } from 'framer-motion'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter'
})

const trustedLogos = [
  { src: '/mit-logo.png', alt: 'MIT', width: 80 },
  { src: '/dropbox-logo.png', alt: 'Dropbox', width: 100 },
  { src: '/uva-logo.png', alt: 'UVA', width: 80 },
  { src: '/medtronic-logo.png', alt: 'Medtronic', width: 120 },
  { src: '/adobe-logo.svg', alt: 'Adobe', width: 90 },
]

const steps = [
  {
    number: '01',
    title: 'Connect Your Data',
    description: 'Upload files, connect your website, or integrate with 100+ platforms like Google Drive, Notion, Shopify, and more. We support 1,400+ file formats.',
    video: '/connect-video.mp4',
  },
  {
    number: '02',
    title: 'Customize Your Agent',
    description: 'Tailor your AI agent\'s persona, response style, and behavior. Add your brand colors, logo, and custom instructions for a white-label experience.',
    video: '/customize-video.mp4',
  },
  {
    number: '03',
    title: 'Deploy Everywhere',
    description: 'Embed on your website, share via link, or integrate through our API. Deploy as a live chat widget, search bar, or full-page experience.',
    video: '/deploy-video.mp4',
  },
]

const features = [
  {
    icon: Shield,
    title: 'Anti-Hallucination',
    description: 'Third-party verified #1 in accuracy. Responses are grounded in your data with citations.',
  },
  {
    icon: Globe,
    title: '92 Languages',
    description: 'Serve customers globally with automatic multilingual support across 92 languages.',
  },
  {
    icon: Zap,
    title: '100+ Integrations',
    description: 'Connect with Google Drive, HubSpot, Shopify, Notion, Zendesk, and many more.',
  },
  {
    icon: FileText,
    title: '1,400+ File Formats',
    description: 'Ingest data from virtually any source — PDFs, docs, spreadsheets, websites, and more.',
  },
  {
    icon: MessageCircle,
    title: 'White-Label Ready',
    description: 'Fully customizable branding. Your logo, your colors, your domain.',
  },
  {
    icon: BarChart3,
    title: 'Enterprise Security',
    description: 'SOC2 Type II certified. GDPR compliant. Your data stays yours.',
  },
]

const testimonials = [
  {
    quote: "CustomGPT.ai has continually impressed us with its ability to provide the right answers from our complex document base.",
    name: "Ken Scott",
    title: "Deputy Assessor of Operations",
    company: "BernCo",
    image: '/ken-scott.png',
    logo: '/bernco-logo.png',
  },
  {
    quote: "We chose CustomGPT for its scalable data ingestion platform and ability to handle our extensive knowledge base.",
    name: "Doug Williams",
    title: "MIT Entrepreneurship Center",
    company: "MIT",
    image: '/doug-williams.webp',
    logo: '/mit-logo-small.png',
  },
  {
    quote: "Best spectrum of quality, combined with excellent API capabilities for our engineering documentation needs.",
    name: "George Dlubal",
    title: "CEO",
    company: "Dlubal Software",
    image: '/georg-dlubal.jpg',
    logo: '/dlubal-logo.png',
  },
]

const stats = [
  { value: '10,000+', label: 'Organizations Trust Us' },
  { value: '93%', label: 'Tickets Resolved Without Humans' },
  { value: '~10hrs', label: 'Saved Weekly Per User' },
  { value: '$100M+', label: 'Saved by Customers' },
]

const faqs = [
  {
    q: 'What is CustomGPT.ai?',
    a: 'CustomGPT.ai is a no-code platform that lets you create AI agents powered by your own business data. Upload your content, and get an AI that answers questions accurately using only your information — no hallucinations, no guessing.',
  },
  {
    q: 'How does the anti-hallucination technology work?',
    a: 'Our proprietary RAG (Retrieval-Augmented Generation) technology ensures that every response is grounded in your uploaded data. Answers include citations linking back to the original source, so users can verify accuracy.',
  },
  {
    q: 'What file formats and integrations are supported?',
    a: 'We support 1,400+ file formats including PDF, DOCX, XLSX, PPTX, and more. Plus 100+ integrations with platforms like Google Drive, Notion, Shopify, HubSpot, Zendesk, WordPress, and many others.',
  },
  {
    q: 'Can I customize the look and feel?',
    a: 'Absolutely. CustomGPT.ai offers full white-label capabilities — add your logo, brand colors, custom domain, and tailor the AI persona to match your brand voice.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. We are SOC2 Type II certified and GDPR compliant. Your data is encrypted at rest and in transit, and is never used to train third-party models.',
  },
  {
    q: 'What are the pricing plans?',
    a: 'We offer a Standard plan at $89/month, Premium at $449/month, and custom Enterprise pricing. All plans include a 7-day free trial. Contact our sales team for enterprise needs.',
  },
]

const useCases = [
  {
    title: 'Customer Engagement',
    description: 'Resolve 93% of support tickets automatically. Provide instant, accurate answers 24/7 in 92 languages.',
    image: '/customer-engagement.png',
    stats: '93% resolution rate',
  },
  {
    title: 'Team Productivity',
    description: 'Save ~10 hours per week per employee. Give your team instant access to company knowledge.',
    image: '/customer-engagement-2.png',
    stats: '~10hrs saved weekly',
  },
]

export default function CustomGPTLandingPage(): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <main className={`${inter.className} min-h-screen`}>
      {/* Header */}
      <header className="w-full h-20 fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto h-full px-4 flex items-center justify-between">
          <div className="flex items-center ml-4">
            <Image
              src="/customgpt-logo.svg"
              alt="CustomGPT.ai"
              width={160}
              height={36}
              className="object-contain"
              priority
            />
          </div>
          <div className="hidden lg:flex items-center gap-8 py-8">
            <nav className="flex items-center gap-10 bg-white/90 backdrop-blur-md px-8 py-4 rounded-full border border-gray-200/50 shadow-sm">
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-700 text-base font-medium leading-none hover:text-[#2563eb] transition-all duration-300 relative group">
                How it Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2563eb] group-hover:w-full transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100" />
              </button>
              <button onClick={() => scrollToSection('features')} className="text-gray-700 text-base font-medium leading-none hover:text-[#2563eb] transition-all duration-300 relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2563eb] group-hover:w-full transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100" />
              </button>
              <button onClick={() => scrollToSection('use-cases')} className="text-gray-700 text-base font-medium leading-none hover:text-[#2563eb] transition-all duration-300 relative group">
                Use Cases
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2563eb] group-hover:w-full transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100" />
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-700 text-base font-medium leading-none hover:text-[#2563eb] transition-all duration-300 relative group">
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2563eb] group-hover:w-full transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100" />
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-gray-700 text-base font-medium leading-none hover:text-[#2563eb] transition-all duration-300 relative group">
                FAQ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2563eb] group-hover:w-full transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100" />
              </button>
            </nav>
            <Button
              className="px-6 py-6 bg-[#2563eb] text-white text-base font-medium rounded-full hover:bg-[#1d4ed8] transition-all duration-300"
              onClick={() => scrollToSection('cta')}
            >
              Try for Free
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex flex-col justify-center items-center group mr-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="w-5 h-[2px] bg-gray-700 my-[3px] transition-all duration-300 group-hover:bg-[#2563eb]" />
            <span className="w-5 h-[2px] bg-gray-700 my-[3px] transition-all duration-300 group-hover:bg-[#2563eb]" />
            <span className="w-5 h-[2px] bg-gray-700 my-[3px] transition-all duration-300 group-hover:bg-[#2563eb]" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
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
              transition={{ type: 'spring', duration: 0.3 }}
              className="absolute right-4 top-24 w-64 bg-white backdrop-blur-md p-4 shadow-lg z-50 rounded-2xl border border-gray-200"
            >
              {['how-it-works', 'features', 'use-cases', 'pricing', 'faq'].map((id) => (
                <button
                  key={id}
                  onClick={() => { scrollToSection(id); setIsMenuOpen(false) }}
                  className="block text-gray-700 hover:text-[#2563eb] py-2 w-full text-left hover:bg-gray-50 px-3 rounded-lg transition-all duration-300"
                >
                  {id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </button>
              ))}
              <Button
                className="w-full mt-4 bg-[#2563eb] text-white hover:bg-[#1d4ed8] rounded-full"
                onClick={() => { scrollToSection('cta'); setIsMenuOpen(false) }}
              >
                Try for Free
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-20">
        {/* Hero Section */}
        <section className="min-h-[85vh] relative overflow-hidden flex items-center bg-gradient-to-b from-[#f0f5ff] to-white">
          <div className="relative w-full max-w-6xl mx-auto py-8 md:py-20 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#2563eb] text-sm font-medium px-4 py-2 rounded-full mb-6">
                <Zap className="w-4 h-4" />
                Trusted by 10,000+ organizations
              </div>
              <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
                Business AI for<br />
                <span className="text-[#2563eb]">Trusted Answers</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-gray-600 mt-6 md:text-xl">
                Answer complex questions using only <em>your</em> business information.
                No hallucinations. No guessing.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="px-8 py-6 bg-[#2563eb] text-white text-lg font-semibold rounded-full hover:bg-[#1d4ed8] transition-all duration-200 shadow-lg shadow-blue-200"
                  onClick={() => scrollToSection('cta')}
                >
                  Start for Free
                </Button>
                <Button
                  variant="outline"
                  className="px-8 py-6 text-lg font-semibold rounded-full border-gray-300 hover:border-[#2563eb] hover:text-[#2563eb] transition-all duration-200"
                  onClick={() => scrollToSection('how-it-works')}
                >
                  See How It Works
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Hero Video */}
            <div className="mt-16 max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-blue-100 border border-gray-200">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              >
                <source src="/hero-video.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="bg-white py-12 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500 font-medium uppercase tracking-wider mb-8">
              Trusted by leading organizations
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
              {trustedLogos.map((logo) => (
                <Image
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={40}
                  className="object-contain h-8 md:h-10 w-auto grayscale"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-[#2563eb] py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-blue-100 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white py-24" id="how-it-works">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Launch in 3 Simple Steps
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Go from data to a deployed AI agent in minutes — no coding required.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Steps List */}
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                      activeStep === index
                        ? 'border-[#2563eb] bg-blue-50 shadow-lg shadow-blue-100'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                        activeStep === index ? 'bg-[#2563eb] text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {step.number}
                      </span>
                      <div>
                        <h3 className={`text-xl font-bold mb-2 ${
                          activeStep === index ? 'text-[#2563eb]' : 'text-gray-900'
                        }`}>
                          {step.title}
                        </h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Step Video */}
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-gray-50">
                <video
                  key={activeStep}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto"
                >
                  <source src={steps[activeStep].video} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-24" id="features">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose CustomGPT.ai?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Enterprise-grade AI agents built on your data, with accuracy you can trust.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-[#2563eb]/30 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-[#2563eb]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="bg-white py-24" id="use-cases">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Built for Every Business Need
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {useCases.map((uc) => (
                <div key={uc.title} className="rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
                  <div className="relative h-64">
                    <Image
                      src={uc.image}
                      alt={uc.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-[#2563eb]">
                      {uc.stats}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{uc.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{uc.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-gray-50 py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
              What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center space-x-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="flex-grow">
                      <p className="text-gray-700 text-lg leading-relaxed italic mb-6">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                        <Image src={t.image} alt={t.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{t.name}</p>
                        <p className="text-sm text-gray-500">{t.title}, {t.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="bg-white py-24" id="pricing">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-gray-600 text-lg">Start with a 7-day free trial. No credit card required.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Standard */}
              <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Standard</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$89</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {['Up to 1,000 pages', 'Live chat widget', 'Basic analytics', 'Email support'].map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#2563eb] flex-shrink-0" />
                      <span className="text-gray-600">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full py-6 rounded-full border-gray-300 hover:border-[#2563eb] hover:text-[#2563eb] font-semibold"
                  onClick={() => scrollToSection('cta')}
                >
                  Start Free Trial
                </Button>
              </div>

              {/* Premium */}
              <div className="bg-[#2563eb] p-8 rounded-2xl text-white relative shadow-xl shadow-blue-200">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-sm font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
                <h3 className="text-xl font-bold mb-2">Premium</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$449</span>
                  <span className="text-blue-200">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {['Up to 10,000 pages', 'White-label branding', 'Advanced analytics', 'Priority support', 'API access'].map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-blue-200 flex-shrink-0" />
                      <span className="text-blue-50">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full py-6 rounded-full bg-white text-[#2563eb] hover:bg-blue-50 font-semibold"
                  onClick={() => scrollToSection('cta')}
                >
                  Start Free Trial
                </Button>
              </div>

              {/* Enterprise */}
              <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">Custom</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {['Unlimited pages', 'Custom integrations', 'SSO & SCIM', 'Dedicated support', 'SLA guarantee', 'On-premise option'].map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#2563eb] flex-shrink-0" />
                      <span className="text-gray-600">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full py-6 rounded-full border-gray-300 hover:border-[#2563eb] hover:text-[#2563eb] font-semibold"
                  onClick={() => scrollToSection('cta')}
                >
                  Talk to Sales
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-24" id="faq">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                    <AccordionTrigger className="text-left hover:no-underline group">
                      <span className="text-gray-900 group-hover:text-[#2563eb] transition-colors duration-200 font-semibold">
                        {faq.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#2563eb] py-24" id="cta">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Your AI Agent?
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              Join 10,000+ organizations using CustomGPT.ai to deliver trusted, accurate answers from their own data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.customgpt.ai/signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#2563eb] text-lg font-semibold rounded-full hover:bg-blue-50 transition-all duration-200 shadow-lg"
              >
                Start Your 7-Day Free Trial
              </a>
              <a
                href="https://customgpt.ai/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white text-lg font-semibold rounded-full hover:bg-white/10 transition-all duration-200"
              >
                Talk to Enterprise Sales
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/customgpt-logo.svg"
                  alt="CustomGPT.ai"
                  width={140}
                  height={32}
                  className="object-contain brightness-200"
                />
              </div>
              <div className="flex items-center gap-6 text-sm">
                <span>SOC2 Type II Certified</span>
                <span className="text-gray-600">|</span>
                <span>GDPR Compliant</span>
              </div>
              <p className="text-sm">
                &copy; 2026 CustomGPT.ai. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
