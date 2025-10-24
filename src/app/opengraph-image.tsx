import { ImageResponse } from 'next/og'

export const alt = 'Kai Faust - Portfolio'
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
          fontSize: 64,
          background: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: 24 }}>
          Kai Faust
        </div>
        <div style={{ fontSize: 32, color: '#94a3b8' }}>
          Engineering, design, AI
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
