'use client'

import Link from 'next/link'

import { useSession } from 'next-auth/react'

import CommandMenu from '@/components/command-menu'
import { Icons } from '@/components/icons'
import UserMenu from '@/components/user-menu'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-center border-b bg-background">
      <div className="container flex max-w-7xl items-center justify-between">
        <Link href="/">
          <div className="flex cursor-pointer items-center">
            <Icons.link className="mr-2" />
            <h1 className="font-heading text-xl font-black">Lynx</h1>
          </div>
        </Link>
        <div className="flex items-center space-x-6">
          <CommandMenu />
          <UserMenu session={session} />
        </div>
      </div>
    </header>
  )
}
