'use client'

import { useState } from 'react'

import { signIn } from 'next-auth/react'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { handleError } from '@/lib/utils'

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)

  const hanleSignInWithGitHub = async () => {
    try {
      setIsLoading(true)
      await signIn('github', {
        callbackUrl: '/dashboard',
      })
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="flex flex-col gap-2 text-center">
      <h1 className="font-heading text-4xl font-extrabold">Sign In</h1>
      <p className="text-base text-muted-foreground">
        Sign in to your account to continue using Lynx.
      </p>
      <Button
        onClick={hanleSignInWithGitHub}
        isLoading={isLoading}
        className="mt-2"
      >
        {!isLoading && <Icons.github className="mr-2 h-4 w-4" />}
        {isLoading ? 'Signing in...' : 'Sign in with GitHub'}
      </Button>
    </div>
  )
}
