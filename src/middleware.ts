import { NextResponse } from 'next/server'

import { withAuth } from 'next-auth/middleware'

import { api } from '@/trpc/server'

export default withAuth(
  async function middleware(req) {
    const key = req.nextUrl.pathname.includes('/s/')
      ? req.nextUrl.pathname.split('/s/').pop() ?? ''
      : ''

    if (!key) {
      return NextResponse.next()
    }

    const data = await api.link.fetch.query({
      key,
    })

    if (!data) {
      return NextResponse.redirect(new URL('/', req.nextUrl))
    }
    // data.link.clicks += 1
    await api.link.updateClick.query({
      key,
    })

    return NextResponse.redirect(data.url)
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/signin',
    },
  }
)

export const config = {
  matcher: ['/s/:key*'],
}
