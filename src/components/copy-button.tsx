'use client'

import { useState } from 'react'

import { toast } from 'sonner'

import { Icons } from '@/components/icons'
import { Button, type ButtonProps } from '@/components/ui/button'

interface CopyButtonProps extends ButtonProps {
  value: string
  messageWhenCopied?: string
}

export default function CopyButton({
  value,
  messageWhenCopied = 'Copied!',
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={(e) => {
        e.stopPropagation()
        setCopied(true)
        navigator.clipboard
          .writeText(value)
          .then(() => toast.success(messageWhenCopied))
        setTimeout(() => setCopied(false), 3000)
      }}
      className="group h-8 w-8 rounded-full border"
      {...props}
    >
      <span className="sr-only">Copy</span>
      {copied ? (
        <Icons.copied className="h-3.5 w-3.5 transition-all group-hover:text-primary/80" />
      ) : (
        <Icons.copy className="h-3.5 w-3.5 transition-all group-hover:text-primary/80" />
      )}
    </Button>
  )
}
