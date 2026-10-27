'use client'

import { CalendarDays, Package, Tag, Trash2 } from 'lucide-react'
import { BottomSheet } from '@/components/bottom-sheet'
import { Button } from '@/components/ui/button'
import { CategoryIcon } from '@/components/fridge/category-icon'
import { ExpiryBadge } from '@/components/fridge/expiry-badge'
import { CATEGORIES, type FridgeItem, useFridge } from '@/lib/fridge-store'
import { formatCzechDate } from '@/lib/expiry'

export function ItemDetailSheet({
  item,
  onClose,
}: {
  item: FridgeItem | null
  onClose: () => void
}) {
  const { removeItem } = useFridge()

  return (
    <BottomSheet open={item !== null} onClose={onClose} title="Detail potraviny">
      {item && (
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <CategoryIcon category={item.category} className="size-14 rounded-2xl" />
            <div className="min-w-0">
              <p className="truncate text-xl font-bold">{item.name}</p>
              <ExpiryBadge expiresOn={item.expiresOn} className="mt-1.5" />
            </div>
          </div>

          <dl className="divide-y divide-border rounded-2xl border border-border">
            <Row icon={CalendarDays} label="Spotřebujte do" value={formatCzechDate(item.expiresOn)} />
            <Row icon={Package} label="Množství" value={item.quantity} />
            <Row
              icon={Tag}
              label="Kategorie"
              value={CATEGORIES.find((c) => c.id === item.category)?.label ?? ''}
            />
          </dl>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-12 rounded-xl text-sm font-semibold"
              onClick={onClose}
            >
              Zavřít
            </Button>
            <Button
              variant="destructive"
              className="h-12 rounded-xl text-sm font-semibold"
              onClick={() => {
                removeItem(item.id)
                onClose()
              }}
            >
              <Trash2 className="size-4" aria-hidden="true" />
              Odebrat
            </Button>
          </div>
        </div>
      )}
    </BottomSheet>
  )
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="ml-auto text-sm font-semibold">{value}</dd>
    </div>
  )
}
