'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'

const items = [
  {
    title: 'Links',
    href: '/dashboard',
    icon: Icons.link,
  },
]

export default function SideNav() {
  const path = usePathname()

  return (
    <nav className="flex flex-row gap-4 md:flex-col">
      {items.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className={cn(
            'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground',
            path === item.href ? 'bg-accent' : 'bg-transparent'
          )}
        >
          <item.icon className="mr-2 h-5 w-5" />
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
