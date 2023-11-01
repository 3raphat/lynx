import { ImageResponse, type NextRequest } from 'next/server'

import { getBaseUrl, truncate } from '@/lib/utils'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const satoshiBlack = await fetch(
    new URL('@/styles/Satoshi-Black.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  const domain = getBaseUrl({ noProtocol: true })

  const hasKey = req.nextUrl.searchParams.has('key')
  const key = req.nextUrl.searchParams.get('key')

  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '90px',
            fontFamily: 'Satoshi Black',
          }}
        >
          {hasKey ? `${domain}/s/${truncate(key, 10)}` : domain}
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Satoshi Black',
          data: satoshiBlack,
          style: 'normal',
        },
      ],
    }
  )
}
