import '@/styles/globals.css'

import { type ReactNode } from 'react'
import { headers } from 'next/headers'

import Providers from '@/components/providers'
import { cn, getBaseUrl } from '@/lib/utils'
import { inter, satoshi } from '@/styles/fonts'
import { TRPCReactProvider } from '@/trpc/react'

export const metadata = {
  title: {
    default: 'Lynx - URL Shortener',
    template: `%s | Lynx`,
  },
  description:
    'Lynx is a URL shortener that allows you to create custom short links for any URL',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  openGraph: {
    title: 'Lynx - URL Shortener',
    description:
      'Lynx is a URL shortener that allows you to create custom short links for any URL',
    type: 'website',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Lynx - URL Shortener',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lynx - URL Shortener',
    description:
      'Lynx is a URL shortener that allows you to create custom short links for any URL',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Lynx - URL Shortener',
      },
    ],
  },
  metadataBase: new URL(getBaseUrl()),
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
          satoshi.variable
        )}
      >
        <TRPCReactProvider headers={headers()}>
          <Providers>{children}</Providers>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
