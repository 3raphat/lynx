import {
  DashboardHeader,
  DashboardShell,
  LinkItem,
} from '@/components/dashboard'
import CreateLinkButton from '@/components/modal/create-link-button'
import DeleteAllLinksButton from '@/components/modal/delete-all-links-button'
import { api } from '@/trpc/server'

export default async function Page() {
  const links = await api.link.getAll.query()

  return (
    <DashboardShell>
      <DashboardHeader heading="Links" text="Create and manage links.">
        <div className="flex space-x-2">
          <DeleteAllLinksButton />
          <CreateLinkButton />
        </div>
      </DashboardHeader>
      {links.length ? (
        <div className="divide-y divide-border rounded-md border">
          {links.map((link) => (
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
