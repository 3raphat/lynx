'use client'

import { type ReactNode } from 'react'

import { Analytics } from '@vercel/analytics/react'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'

import { TooltipProvider } from '@/components/ui/tooltip'

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <TooltipProvider delayDuration={200}>
          {children}
          <Toaster closeButton />
          <Analytics />
        </TooltipProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}
