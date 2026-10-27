import { Refrigerator } from 'lucide-react'
import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25',
        className,
      )}
      aria-hidden="true"
    >
      <Refrigerator className="size-1/2" strokeWidth={2} />
      <span className="absolute -top-1 -right-1 size-4 rounded-full border-[3px] border-background bg-success" />
    </div>
  )
}

export function LogoWordmark({ className }: { className?: string }) {
  return (
    <span className={cn('text-3xl font-extrabold tracking-tight text-foreground', className)}>
      e-<span className="text-primary">Lednice</span>
    </span>
  )
}
