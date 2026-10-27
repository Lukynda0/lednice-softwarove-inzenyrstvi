import { daysUntil, expiryLabel, expiryTone } from '@/lib/expiry'
import { cn } from '@/lib/utils'

const TONE_CLASS = {
  expired: 'bg-destructive/12 text-destructive',
  soon: 'bg-warning/25 text-warning-foreground',
  ok: 'bg-success/12 text-[oklch(0.42_0.1_160)]',
} as const

export function ExpiryBadge({
  expiresOn,
  className,
}: {
  expiresOn: string
  className?: string
}) {
  const days = daysUntil(expiresOn)
  const tone = expiryTone(days)
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap',
        TONE_CLASS[tone],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'size-1.5 rounded-full',
          tone === 'expired' && 'bg-destructive',
          tone === 'soon' && 'bg-warning',
          tone === 'ok' && 'bg-success',
        )}
      />
      {expiryLabel(days)}
    </span>
  )
}
