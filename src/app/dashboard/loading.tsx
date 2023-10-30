import { DashboardHeader, DashboardShell } from '@/components/dashboard'
import CreateLinkButton from '@/components/modal/create-link-button'
import DeleteAllLinks from '@/components/modal/delete-all-links'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Links" text="Create and manage links.">
        <div className="flex space-x-2">
          <DeleteAllLinks disabled />
          <CreateLinkButton disabled />
        </div>
      </DashboardHeader>
      <div className="divide-y rounded-md border">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4">
            <div className="space-y-3">
              <Skeleton className="h-5 w-2/5" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}
