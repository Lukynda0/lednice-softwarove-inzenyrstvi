'use client'

import Link from 'next/link'
import { ChevronRight, Refrigerator } from 'lucide-react'
import { useFridge } from '@/lib/fridge-store'
import { daysUntil } from '@/lib/expiry'

export function FridgeHero() {
  const { items } = useFridge()
  const expired = items.filter((i) => daysUntil(i.expiresOn) < 0).length
  const soon = items.filter((i) => {
    const d = daysUntil(i.expiresOn)
    return d >= 0 && d <= 2
  }).length

  return (
    <Link
      href="/lednice"
      className="group relative block overflow-hidden rounded-3xl bg-primary p-5 text-primary-foreground shadow-xl shadow-primary/20"
    >
      <div
        aria-hidden="true"
        className="absolute -top-10 -right-10 size-40 rounded-full bg-primary-foreground/10"
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-primary-foreground/75">Moje lednice</p>
          <p className="mt-1 text-4xl font-extrabold tracking-tight">
            {items.length}
            <span className="ml-1.5 text-base font-semibold text-primary-foreground/75">
              položek
            </span>
          </p>
        </div>
        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary-foreground/15">
          <Refrigerator className="size-6" aria-hidden="true" />
        </span>
      </div>

      <div className="relative mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-primary-foreground/12 px-3 py-2.5">
          <p className="text-xl font-bold">{soon}</p>
          <p className="text-xs text-primary-foreground/80">brzy expiruje</p>
        </div>
        <div className="rounded-2xl bg-primary-foreground/12 px-3 py-2.5">
          <p className="text-xl font-bold">{expired}</p>
          <p className="text-xs text-primary-foreground/80">po datu spotřeby</p>
        </div>
      </div>

      <p className="relative mt-4 flex items-center gap-1 text-sm font-semibold">
        Otevřít lednici
        <ChevronRight
          className="size-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </p>
    </Link>
  )
}
