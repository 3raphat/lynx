'use client'

import { useEffect, useState } from 'react'

import {
  DashboardHeader,
  DashboardShell,
  LinkItem,
} from '@/components/dashboard'
import CreateLinkButton from '@/components/modal/create-link-button'
import DeleteAllLinksButton from '@/components/modal/delete-all-links-button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { api } from '@/trpc/react'

type SortOption = 'createdAt' | 'clicks' | 'key'

export default function Page() {
  const [sort, setSort] = useState<SortOption>('createdAt')

  // click = most clicks first (desc)
  // createdAt = latest first (desc)
  // key = a-z (asc)
  const links = api.link.getAll.useSuspenseQuery({
    orderBy: sort,
    orderDirection: sort === 'key' ? 'asc' : 'desc',
  })

  useEffect(() => {
    links[1].refetch()
  }, [links])

  return (
    <DashboardShell>
      <DashboardHeader heading="Links" text="Create and manage links.">
        <div className="flex space-x-2">
          <Select
            onValueChange={(value: SortOption) => setSort(value)}
            value={sort}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Date added</SelectItem>
              <SelectItem value="clicks">Number of clicks</SelectItem>
              <SelectItem value="key">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
          <DeleteAllLinksButton />
          <CreateLinkButton />
        </div>
      </DashboardHeader>
      {links[0].length ? (
        <div className="divide-y divide-border rounded-md border">
          {links[0].map((link) => (
            <LinkItem key={link.key} link={link} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center p-4">
          <p className="text-lg text-muted-foreground">No links yet.</p>
        </div>
      )}
    </DashboardShell>
  )
}
