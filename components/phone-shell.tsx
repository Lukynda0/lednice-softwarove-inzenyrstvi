import { cn } from '@/lib/utils'

export function PhoneShell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[oklch(0.93_0.015_200)] sm:py-8">
      <div
        className={cn(
          'relative flex h-dvh w-full flex-col overflow-hidden bg-background',
          'sm:h-[844px] sm:max-h-[calc(100dvh-4rem)] sm:w-[390px] sm:rounded-[2.75rem] sm:border-[10px] sm:border-foreground sm:shadow-2xl',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
