'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Flame, Loader, Trash2 } from 'lucide-react'
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
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn, handleError } from '@/lib/utils'
import { api } from '@/trpc/react'

export default function DeleteAllLinks() {
  const router = useRouter()

  const [isDeleteLoading, setIsDeleteLoading] = useState(false)

  const deleteAllLinks = api.link.deleteAll.useMutation({
    onSuccess: () => {
      toast.success('All links deleted!')
    },
    onError: (error) => {
      handleError(error)
    },
  })

  const handleDelete = () => {
    setIsDeleteLoading(true)
    deleteAllLinks.mutate()
    setIsDeleteLoading(false)
    router.refresh()
  }

  return (
    <>
      <AlertDialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="destructive">
                <Flame className="h-5 w-5" />
              </Button>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove all links</p>
          </TooltipContent>
        </Tooltip>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete all of your links?
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
              <span>Delete All</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
