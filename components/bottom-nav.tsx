'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChefHat, House, Refrigerator, ScanLine, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const ITEMS = [
  { href: '/domu', label: 'Domů', icon: House },
  { href: '/lednice', label: 'Lednice', icon: Refrigerator },
  { href: '#skenovat', label: 'Skenovat', icon: ScanLine, primary: true },
  { href: '#recepty', label: 'Recepty', icon: ChefHat },
  { href: '#profil', label: 'Profil', icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Hlavní navigace"
      className="shrink-0 border-t border-border bg-card/95 px-2 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur"
    >
      <ul className="grid grid-cols-5 items-end">
        {ITEMS.map(({ href, label, icon: Icon, primary }) => {
          const active = pathname === href
          if (primary) {
            return (
              <li key={href} className="flex justify-center">
                <Link
                  href={href}
                  className="-mt-7 flex flex-col items-center gap-1 text-[11px] font-semibold text-foreground"
                >
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-background">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  {label}
                </Link>
              </li>
            )
          }
          return (
            <li key={href} className="flex justify-center">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex w-full flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-semibold transition-colors',
                  active ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <Icon className="size-6" aria-hidden="true" strokeWidth={active ? 2.4 : 2} />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
