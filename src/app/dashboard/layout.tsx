import { type ReactNode } from 'react'

import Navbar from '@/components/navbar'
import SideNav from '@/components/side-nav'

interface LayoutProps {
  children: ReactNode
}

export const metadata = {
  title: 'Dashboard',
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <div className="container grid max-w-7xl gap-5 px-20 py-10 md:grid-cols-5 ">
        <aside>
          <SideNav />
        </aside>
        <main className="col-span-4">{children}</main>
      </div>
    </>
  )
}
