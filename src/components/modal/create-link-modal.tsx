'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { type DialogProps } from '@radix-ui/react-dialog'
import { Dices } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn, getBaseUrl, handleError, nanoid } from '@/lib/utils'
import { linkSchema, type LinkType } from '@/lib/validation/link'
import { api } from '@/trpc/react'

type FormValues = LinkType

interface CreateLinkModalProps extends DialogProps {}

export default function CreateLinkModal({ ...props }: CreateLinkModalProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      key: '',
      url: '',
    },
  })

  const createLink = api.link.create.useMutation({
    onSuccess: () => {
      toast.success('Link created!')
      form.reset()
    },
    onError: (error) => {
      handleError(error)
    },
  })

  // useEffect(() => {
  //   // Copy link to clipboard
  //   if (createLink.isSuccess) {
  //     navigator.clipboard.writeText(
  //       `${window.location.origin}/${createLink.data?.key}`
  //     )
  //     toast.success('Link copied to clipboard!')
  //   }
  // }, [createLink.data?.key, createLink.isSuccess])

  const onSubmit = (values: FormValues) => {
    createLink.mutate(values)
  }

  const [isGeneratingKey, setIsGeneratingKey] = useState(false)

  const handleGenerateRandomKey = () => {
    setIsGeneratingKey(true)
    setTimeout(() => {
      form.setValue('key', nanoid())
      setIsGeneratingKey(false)
    }, 500)
  }
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new link</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Link</FormLabel>
                  <FormControl>
                    <div className="relative flex w-full">
                      <span className="hidden h-10 rounded-md rounded-r-none border border-r-0 border-input px-3 py-2 text-sm text-muted-foreground ring-offset-background sm:block">
                        {`${getBaseUrl().replace(/https?:\/\//, '')}/s/`}
                      </span>
                      <Input
                        placeholder="custom"
                        className="rounded sm:rounded-l-none"
                        {...field}
                      />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            onClick={handleGenerateRandomKey}
                            disabled={isGeneratingKey}
                            size="icon"
                            className="ml-2 aspect-square"
                          >
                            <Dices
                              className={cn(
                                'h-5 w-5',
                                isGeneratingKey && 'animate-spin duration-500'
                              )}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Random Key</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              isLoading={createLink.isLoading}
              className="w-full"
            >
              {createLink.isLoading ? 'Creating...' : 'Create Link'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
