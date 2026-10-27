'use client'

import { useState } from 'react'
import { ScanLine } from 'lucide-react'
import { BottomSheet } from '@/components/bottom-sheet'
import { Button } from '@/components/ui/button'
import { CATEGORIES, type CategoryId, useFridge } from '@/lib/fridge-store'
import { dateFromToday } from '@/lib/expiry'
import { cn } from '@/lib/utils'

const QUICK_DATES = [
  { label: '+3 dny', days: 3 },
  { label: '+1 týden', days: 7 },
  { label: '+2 týdny', days: 14 },
]

const inputClass =
  'h-12 w-full rounded-xl border border-input bg-background px-4 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15'

export function AddItemSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { addItem } = useFridge()
  const [category, setCategory] = useState<CategoryId>('mlecne')
  const [expiresOn, setExpiresOn] = useState(() => dateFromToday(7))

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    if (!name || !expiresOn) return
    addItem({
      name,
      category,
      quantity: String(data.get('quantity') ?? '').trim() || '1 ks',
      expiresOn,
    })
    setCategory('mlecne')
    setExpiresOn(dateFromToday(7))
    onClose()
  }

  return (
    <BottomSheet open={open} onClose={onClose} title="Přidat potravinu">
      <button
        type="button"
        className="mb-5 flex w-full items-center gap-3 rounded-2xl border border-dashed border-primary/40 bg-secondary px-4 py-3 text-left"
      >
        <ScanLine className="size-6 text-primary" aria-hidden="true" />
        <span>
          <span className="block text-sm font-bold text-secondary-foreground">
            Naskenovat čárový kód
          </span>
          <span className="block text-xs text-muted-foreground">
            Rychlejší než ruční vyplnění
          </span>
        </span>
      </button>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="item-name" className="text-sm font-semibold">
            Název
          </label>
          <input
            id="item-name"
            name="name"
            required
            placeholder="např. Tvaroh měkký"
            className={inputClass}
          />
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-1.5 text-sm font-semibold">Kategorie</legend>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={category === c.id}
                onClick={() => setCategory(c.id)}
                className={cn(
                  'h-9 rounded-full border px-3.5 text-sm font-medium transition-colors',
                  category === c.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary/40',
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="grid grid-cols-[1fr_1.4fr] gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="item-qty" className="text-sm font-semibold">
              Množství
            </label>
            <input id="item-qty" name="quantity" placeholder="1 ks" className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="item-date" className="text-sm font-semibold">
              Spotřebujte do
            </label>
            <input
              id="item-date"
              type="date"
              required
              value={expiresOn}
              onChange={(e) => setExpiresOn(e.target.value)}
              className={cn(inputClass, 'px-3')}
            />
          </div>
        </div>

        <div className="flex gap-2" aria-label="Rychlá volba data">
          {QUICK_DATES.map((q) => (
            <button
              key={q.days}
              type="button"
              onClick={() => setExpiresOn(dateFromToday(q.days))}
              className="h-8 rounded-full bg-muted px-3 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              {q.label}
            </button>
          ))}
        </div>

        <Button type="submit" className="mt-2 h-12 rounded-xl text-base font-semibold">
          Uložit do lednice
        </Button>
      </form>
    </BottomSheet>
  )
}
