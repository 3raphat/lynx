'use client'

import { useState } from 'react'

import CreateLinkModal from '@/components/modal/create-link-modal'
import { Button } from '@/components/ui/button'

interface CreateLinkButtonProps {}

export default function CreateLinkButton({}: CreateLinkButtonProps) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Create Link</Button>
      <CreateLinkModal open={open} onOpenChange={setOpen} />
    </>
  )
}
