import { type Metadata } from 'next'

import { clsx, type ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
import pluralize from 'pluralize'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
)

export function handleError(error: unknown) {
  if (typeof error === 'string') {
    console.error(error)
    toast.error(error)
  } else if (error instanceof Error) {
    console.error(error.message)
    toast.error(error.message)
  } else {
    console.error('Unknown error')
    toast.error('Unknown error')
  }
}

export function nFormatter(
  num?: number,
  opts: { digits?: number; full?: boolean; suffix?: string } = {
    digits: 1,
  }
) {
  const suffix = opts.suffix ? ' ' + pluralize(opts.suffix, num) : ''

  if (!num) return '0' + suffix
  if (opts.full) {
    return Intl.NumberFormat('en-US').format(num) + suffix
  }
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })

  return item
    ? (num / item.value).toFixed(opts.digits).replace(rx, '$1') +
        item.symbol +
        suffix
    : '0' + suffix
}

export function getBaseUrl() {
  if (typeof window !== 'undefined') return window.location.origin
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const formatDate = (data?: Date) => {
  if (!data) return 'N/A'
  return new Date(data).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
