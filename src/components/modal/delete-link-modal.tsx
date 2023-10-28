import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { type DialogProps } from '@radix-ui/react-alert-dialog'
import { Loader, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { buttonVariants } from '@/components/ui/button'
import { cn, handleError } from '@/lib/utils'
import { type LinkType } from '@/lib/validation/link'
import { api } from '@/trpc/react'

interface DeleteLinkModalProps extends DialogProps {
  link: LinkType
}

export default function DeleteLinkModal({
  link,
  ...props
}: DeleteLinkModalProps) {
  const router = useRouter()

  const [isDeleteLoading, setIsDeleteLoading] = useState(false)

  const deleteLink = api.link.delete.useMutation({
    onSuccess: () => {
      toast.success('Link deleted!')
    },
    onError: (error) => {
      handleError(error)
    },
  })

  const handleDelete = () => {
    setIsDeleteLoading(true)
    deleteLink.mutate({
      key: link.key,
    })
    setIsDeleteLoading(false)
    router.refresh()
  }
  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this link?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className={cn(buttonVariants({ variant: 'destructive' }))}
          >
            {isDeleteLoading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="mr-2 h-4 w-4" />
            )}
            <span>Delete</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
