'use client'

import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'
import { TypeAnimation } from 'react-type-animation'
import Balancer from 'react-wrap-balancer'

import { Icons } from '@/components/icons'
import Navbar from '@/components/navbar'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  return (
    <>
      <Navbar />
      <div className="mt-24 flex flex-col items-center justify-center space-y-6 text-center">
        <TypeAnimation
          preRenderFirstString={true}
          sequence={[
            'Make your links shorter.',
            1000,
            'Make your links sweeter.',
            1000,
            'Make your links more shareable.',
            1000,
          ]}
          wrapper="h1"
          speed={50}
          className="font-heading text-5xl font-black tracking-tight md:text-7xl"
          repeat={Infinity}
        />
        <Balancer className="text-lg text-muted-foreground">
          Lynx is a free and open source URL shortener that allows you to create
          custom links for any website.
        </Balancer>
        <div className="flex gap-4">
          <Button
            onClick={() =>
              session ? router.push('/dashboard') : router.push('/signin')
            }
          >
            Get started
          </Button>

          <a
            className={cn(
              buttonVariants({ variant: 'secondary' }),
              'hover:cursor-pointer'
            )}
            rel="noopener noreferrer"
            href="https://github.com/3raphat/lynx"
          >
            <Icons.star className="h-4 w-4 text-yellow-500" />
            <span className="ml-2">Star on GitHub</span>
          </a>
        </div>
      </div>
    </>
  )
}
