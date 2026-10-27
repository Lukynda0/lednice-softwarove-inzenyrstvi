'use client'

import { useCallback, useMemo, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Plus, Search, Trash2 } from 'lucide-react'
import { CATEGORIES, type CategoryId, type FridgeItem, useFridge } from '@/lib/fridge-store'
import { daysUntil } from '@/lib/expiry'
import { cn } from '@/lib/utils'
import { CategoryIcon } from './category-icon'
import { ExpiryBadge } from './expiry-badge'
import { AddItemSheet } from './add-item-sheet'
import { ItemDetailSheet } from './item-detail-sheet'

type Filter = CategoryId | 'vse'

export function FridgeView() {
  const { items, removeItem } = useFridge()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('vse')
  const [adding, setAdding] = useState(false)
  const [selected, setSelected] = useState<FridgeItem | null>(null)

  const closeAdd = useCallback(() => setAdding(false), [])
  const closeDetail = useCallback(() => setSelected(null), [])

  const visible = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('cs')
    return items
      .filter((i) => filter === 'vse' || i.category === filter)
      .filter((i) => !q || i.name.toLocaleLowerCase('cs').includes(q))
      .sort((a, b) => daysUntil(a.expiresOn) - daysUntil(b.expiresOn))
  }, [items, query, filter])

  const filters: { id: Filter; label: string }[] = [
    { id: 'vse', label: 'Vše' },
    ...CATEGORIES,
  ]

  return (
    <>
      <header className="shrink-0 px-5 pt-6 pb-3">
        <div className="flex items-center gap-3">
          <Link
            href="/domu"
            aria-label="Zpět na domovskou obrazovku"
            className="flex size-10 items-center justify-center rounded-full border border-border bg-card"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </Link>
          <div className="flex-1">
            <h1 className="text-xl leading-tight font-bold">Moje lednice</h1>
            <p className="text-sm text-muted-foreground">
              {items.length} {pluralItems(items.length)}
            </p>
          </div>
        </div>

        <div className="relative mt-4">
          <Search
            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <label htmlFor="fridge-search" className="sr-only">
            Hledat v lednici
          </label>
          <input
            id="fridge-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hledat potravinu…"
            className="h-12 w-full rounded-xl border border-input bg-card pr-4 pl-11 text-base placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/15 focus:outline-none"
          />
        </div>

        <div
          role="group"
          aria-label="Filtrovat podle kategorie"
          className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none]"
        >
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'h-9 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors',
                filter === f.id
                  ? 'bg-foreground text-background'
                  : 'border border-border bg-card text-muted-foreground hover:text-foreground',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-5 pt-1 pb-24">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <p className="font-semibold">Nic jsme nenašli</p>
            <p className="max-w-60 text-sm text-muted-foreground">
              Zkuste jiný název nebo přidejte novou potravinu tlačítkem níže.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-2.5" aria-label="Potraviny v lednici">
            {visible.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-1 rounded-2xl border border-border bg-card pr-1.5"
              >
                <button
                  type="button"
                  onClick={() => setSelected(item)}
                  className="flex min-w-0 flex-1 items-center gap-3 p-3 text-left"
                >
                  <CategoryIcon category={item.category} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-semibold">{item.name}</span>
                    <span className="mt-1 flex items-center gap-2">
                      <ExpiryBadge expiresOn={item.expiresOn} />
                      <span className="truncate text-xs text-muted-foreground">
                        {item.quantity}
                      </span>
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Odebrat ${item.name}`}
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="size-[18px]" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>

      <button
        type="button"
        onClick={() => setAdding(true)}
        className="absolute right-5 bottom-28 z-10 flex h-14 items-center gap-2 rounded-2xl bg-primary pr-5 pl-4 font-semibold text-primary-foreground shadow-xl shadow-primary/30"
      >
        <Plus className="size-5" aria-hidden="true" />
        Přidat
      </button>

      <AddItemSheet open={adding} onClose={closeAdd} />
      <ItemDetailSheet item={selected} onClose={closeDetail} />
    </>
  )
}

function pluralItems(n: number) {
  if (n === 1) return 'položka'
  if (n >= 2 && n <= 4) return 'položky'
  return 'položek'
}
