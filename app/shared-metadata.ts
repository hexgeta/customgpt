import type { Metadata } from 'next'

export const defaultMetadata: Metadata = {
  title: {
    default: 'Apoio Jurídico AIMA | Consultas de Imigração Portugal',
    template: '%s | Apoio Jurídico AIMA'
  },
  description: 'Assistência jurídica especializada para garantir sua consulta na AIMA. Apoio profissional com processos administrativos nos tribunais portugueses.',
  keywords: 'AIMA, Imigração Portugal, Marcação de Consulta, Apoio Jurídico, Advogado Imigração, Visto Portugal',
  openGraph: {
    title: 'Notificação Judicial AIMA | Apoio Jurídico Imigração',
    description: 'Assistência jurídica especializada para garantir sua consulta na AIMA. Apoio profissional com processos administrativos nos tribunais portugueses.',
    url: 'https://apoiojuridico-imigracao.com',
    siteName: 'Apoio Jurídico Imigração',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Apoio Jurídico AIMA',
      },
    ],
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apoio Jurídico AIMA | Consultas de Imigração Portugal',
    description: 'Assistência jurídica especializada para garantir sua consulta na AIMA. Apoio profissional com processos administrativos nos tribunais portugueses.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.jpg',
  },
} 