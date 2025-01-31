import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Apoio Jurídico Imigração'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #ffffff, #f3f4f6)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '60px',
              fontWeight: 'bold',
              color: '#1e3a8a',
              marginBottom: '20px',
            }}
          >
            Apoio Jurídico Imigração
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: '#4b5563',
              maxWidth: '800px',
              lineHeight: 1.4,
            }}
          >
            Assistência jurídica especializada para garantir sua consulta na AIMA
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 