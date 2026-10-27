import Link from 'next/link'
import { Bell } from 'lucide-react'

export function HomeHeader() {
  return (
    <header className="flex items-center justify-between gap-3 px-5 pt-6 pb-2">
      <div className="flex items-center gap-3">
        <Link
          href="#profil"
          aria-label="Uživatelský profil"
          className="flex size-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
        >
          JN
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">Dobrý den,</p>
          <p className="text-lg leading-tight font-bold">Jan Novák</p>
        </div>
      </div>
      <button
        type="button"
        aria-label="Oznámení (3 nová)"
        className="relative flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground"
      >
        <Bell className="size-5" aria-hidden="true" />
        <span className="absolute top-2.5 right-3 size-2 rounded-full bg-destructive ring-2 ring-card" />
      </button>
    </header>
  )
}
