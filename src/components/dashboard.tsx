'use client'

import { useState, type HTMLAttributes, type ReactNode } from 'react'

import { MoreVertical } from 'lucide-react'

import CopyButton from '@/components/copy-button'
import { Icons } from '@/components/icons'
import DeleteLinkModal from '@/components/modal/delete-link-modal'
import EditLinkModal from '@/components/modal/edit-link-modal'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn, formatDate, getBaseUrl, nFormatter } from '@/lib/utils'
import { type LinkType } from '@/lib/validation/link'

interface DashboardShellProps extends HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className={cn('grid items-start gap-8', className)} {...props}>
      {children}
    </div>
  )
}

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: ReactNode
}

export function DashboardHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl font-black md:text-4xl">
          {heading}
        </h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
}

interface LinkItemProps {
  link: LinkType
}

export function LinkItem({ link }: LinkItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-4">
          <a
            href={`${getBaseUrl()}/s/${link.key}`}
            className="font-semibold hover:underline"
          >
            {link.key}
          </a>
          <CopyButton value={`${getBaseUrl()}/s/${link.key}`} />
        </div>

        <a
          href={link.url}
          className="text-sm text-muted-foreground hover:underline"
        >
          {link.url.length > 50 ? `${link.url.slice(0, 50)}...` : link.url}
        </a>

        <div className="flex space-x-2">
          <Badge variant="secondary" className="font-normal">
            <Icons.calendar className="mr-1 h-3.5 w-3.5" />
            {formatDate(link.createdAt)}
          </Badge>
          <Badge variant="secondary" className="font-normal">
            <Icons.click className="mr-1 h-3.5 w-3.5" />
            {nFormatter(link.clicks, { suffix: 'click' })}
          </Badge>
        </div>
      </div>

      <LinkOperations
        link={{
          key: link.key,
          url: link.url,
          clicks: link.clicks,
          archived: link.archived,
        }}
      />
    </div>
  )
}

interface LinkOperationsProps {
  link: LinkType
}

export function LinkOperations({ link }: LinkOperationsProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setShowEditModal(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditLinkModal
        link={link}
        open={showEditModal}
        onOpenChange={setShowEditModal}
      />
      <DeleteLinkModal
        link={link}
        open={showDeleteAlert}
        onOpenChange={setShowDeleteAlert}
      />
    </>
  )
}
