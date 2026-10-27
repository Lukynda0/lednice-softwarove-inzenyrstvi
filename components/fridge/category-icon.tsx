import { Apple, Beef, Carrot, CupSoda, Milk, Package } from 'lucide-react'
import type { CategoryId } from '@/lib/fridge-store'
import { cn } from '@/lib/utils'

const ICONS: Record<CategoryId, React.ComponentType<{ className?: string }>> = {
  mlecne: Milk,
  zelenina: Carrot,
  ovoce: Apple,
  maso: Beef,
  napoje: CupSoda,
  ostatni: Package,
}

export function CategoryIcon({
  category,
  className,
}: {
  category: CategoryId
  className?: string
}) {
  const Icon = ICONS[category]
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground',
        className,
      )}
    >
      <Icon className="size-5" />
    </span>
  )
}
