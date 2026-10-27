import Link from 'next/link'
import { CalendarDays, ChefHat, ScanLine, ShoppingBasket } from 'lucide-react'
import { cn } from '@/lib/utils'

const FEATURES = [
  {
    href: '#skenovat',
    title: 'Skenovat',
    description: 'Přidejte potravinu čárovým kódem',
    icon: ScanLine,
    tint: 'bg-[oklch(0.93_0.04_190)] text-[oklch(0.38_0.08_195)]',
  },
  {
    href: '#recepty',
    title: 'Recepty',
    description: 'Uvařte z toho, co máte doma',
    icon: ChefHat,
    tint: 'bg-[oklch(0.94_0.05_75)] text-[oklch(0.45_0.1_60)]',
  },
  {
    href: '#kalendar',
    title: 'Kalendář',
    description: 'Plán jídel a data spotřeby',
    icon: CalendarDays,
    tint: 'bg-[oklch(0.94_0.03_280)] text-[oklch(0.42_0.1_280)]',
  },
  {
    href: '#nakup',
    title: 'Nakoupit',
    description: 'Objednat přes Košík nebo Rohlík',
    icon: ShoppingBasket,
    tint: 'bg-[oklch(0.94_0.04_150)] text-[oklch(0.42_0.1_155)]',
  },
]

export function FeatureGrid() {
  return (
    <section aria-labelledby="features-heading" className="px-5">
      <h2 id="features-heading" className="mb-3 text-base font-bold">
        Co chcete udělat?
      </h2>
      <ul className="grid grid-cols-2 gap-3">
        {FEATURES.map(({ href, title, description, icon: Icon, tint }) => (
          <li key={title}>
            <Link
              href={href}
              className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 active:scale-[0.98]"
            >
              <span
                aria-hidden="true"
                className={cn('flex size-11 items-center justify-center rounded-xl', tint)}
              >
                <Icon className="size-5" />
              </span>
              <span>
                <span className="block text-base font-bold">{title}</span>
                <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                  {description}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
