'use client'

import Link from 'next/link'
import { useFridge } from '@/lib/fridge-store'
import { daysUntil } from '@/lib/expiry'
import { CategoryIcon } from '@/components/fridge/category-icon'
import { ExpiryBadge } from '@/components/fridge/expiry-badge'

export function ExpiringStrip() {
  const { items } = useFridge()
  const urgent = [...items]
    .filter((i) => daysUntil(i.expiresOn) <= 3)
    .sort((a, b) => daysUntil(a.expiresOn) - daysUntil(b.expiresOn))
    .slice(0, 6)

  if (urgent.length === 0) return null

  return (
    <section aria-labelledby="expiring-heading">
      <div className="mb-3 flex items-center justify-between px-5">
        <h2 id="expiring-heading" className="text-base font-bold">
          Spotřebujte brzy
        </h2>
        <Link href="/lednice" className="text-sm font-semibold text-primary">
          Vše
        </Link>
      </div>
      <ul className="flex snap-x scroll-px-5 gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none]">
        {urgent.map((item) => (
          <li key={item.id} className="snap-start">
            <Link
              href="/lednice"
              className="flex w-36 flex-col gap-2.5 rounded-2xl border border-border bg-card p-3"
            >
              <CategoryIcon category={item.category} className="size-9 rounded-lg" />
              <p className="truncate text-sm font-semibold">{item.name}</p>
              <ExpiryBadge expiresOn={item.expiresOn} className="self-start" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
