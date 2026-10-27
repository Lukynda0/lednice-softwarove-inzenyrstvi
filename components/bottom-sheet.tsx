'use client'

import { useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'

export function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    panelRef.current?.focus({ preventScroll: true })
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      previouslyFocused?.focus({ preventScroll: true })
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <button
        type="button"
        aria-label="Zavřít"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 animate-in fade-in"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative max-h-[90%] overflow-y-auto rounded-t-3xl bg-card px-5 pt-3 pb-8 shadow-2xl outline-none animate-in slide-in-from-bottom duration-300"
      >
        <div aria-hidden="true" className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-border" />
        <div className="mb-5 flex items-center justify-between">
          <h2 id={titleId} className="text-lg font-bold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Zavřít"
            className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
