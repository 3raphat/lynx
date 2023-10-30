'use client'

import { useState } from 'react'

import CreateLinkModal from '@/components/modal/create-link-modal'
import { Button, type ButtonProps } from '@/components/ui/button'

export default function CreateLinkButton({ ...props }: ButtonProps) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)} {...props}>
        Create Link
      </Button>
      <CreateLinkModal open={open} onOpenChange={setOpen} />
    </>
  )
}
