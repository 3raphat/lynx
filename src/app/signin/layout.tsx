import { type ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {children}
    </div>
  )
}
