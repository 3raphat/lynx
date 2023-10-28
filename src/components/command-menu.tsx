'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { type DialogProps } from '@radix-ui/react-alert-dialog'
import { useTheme } from 'next-themes'

import CreateLinkModal from '@/components/modal/create-link-modal'
import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'

import { Icons } from './icons'

export default function CommandMenu({ ...props }: DialogProps) {
  const [open, setOpen] = useState(false)
  const [openCreateLink, setOpenCreateLink] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  const router = useRouter()

  const { setTheme } = useTheme()

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          'relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64'
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search commands...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestion">
            <CommandItem
              onSelect={() => runCommand(() => setOpenCreateLink(true))}
            >
              <Icons.plus className="mr-2 h-4 w-4" />
              Create Link
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="General">
            <CommandItem
              onSelect={() => runCommand(() => router.push('/dashboard'))}
            >
              <Icons.dashboard className="mr-2 h-4 w-4" />
              Dashboard
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => router.push('https://github.com/3raphat/lynx'))
              }
            >
              <Icons.github className="mr-2 h-4 w-4" />
              Repository
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <Icons.sun className="mr-2 h-4 w-4" />
              Light Mode
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <Icons.moon className="mr-2 h-4 w-4" />
              Dark Mode
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <Icons.system className="mr-2 h-4 w-4" />
              System Mode
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <CreateLinkModal open={openCreateLink} onOpenChange={setOpenCreateLink} />
    </>
  )
}
