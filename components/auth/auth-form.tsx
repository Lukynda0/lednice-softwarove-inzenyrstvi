'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Mode = 'login' | 'register'

export function AuthForm() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (mode === 'register' && data.get('password') !== data.get('confirm')) {
      setError('Hesla se neshodují.')
      return
    }
    setError(null)
    router.push('/domu')
  }

  const isRegister = mode === 'register'

  return (
    <div className="flex flex-col gap-6">
      <div
        role="tablist"
        aria-label="Přihlášení nebo registrace"
        className="grid grid-cols-2 rounded-xl bg-muted p-1"
      >
        {(['login', 'register'] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => {
              setMode(m)
              setError(null)
            }}
            className={cn(
              'h-10 rounded-lg text-sm font-semibold transition-colors',
              mode === m
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {m === 'login' ? 'Přihlášení' : 'Registrace'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate={false}>
        {isRegister && (
          <Field id="name" label="Jméno" icon={User}>
            <input
              id="name"
              name="name"
              required
              autoComplete="name"
              placeholder="Jan Novák"
              className={inputClass}
            />
          </Field>
        )}

        <Field id="email" label="E-mail" icon={Mail}>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jan@email.cz"
            className={inputClass}
          />
        </Field>

        <Field id="password" label="Heslo" icon={Lock}>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            minLength={6}
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            placeholder="Alespoň 6 znaků"
            className={cn(inputClass, 'pr-12')}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? 'Skrýt heslo' : 'Zobrazit heslo'}
          >
            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        </Field>

        {isRegister && (
          <Field id="confirm" label="Potvrzení hesla" icon={Lock}>
            <input
              id="confirm"
              name="confirm"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={6}
              autoComplete="new-password"
              placeholder="Zopakujte heslo"
              className={inputClass}
            />
          </Field>
        )}

        {!isRegister && (
          <button
            type="button"
            className="self-end text-sm font-medium text-primary hover:underline"
          >
            Zapomenuté heslo?
          </button>
        )}

        {error && (
          <p role="alert" className="text-sm font-medium text-destructive">
            {error}
          </p>
        )}

        <Button type="submit" className="mt-2 h-12 rounded-xl text-base font-semibold">
          {isRegister ? 'Vytvořit účet' : 'Přihlásit se'}
          <ArrowRight className="size-5" aria-hidden="true" />
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {isRegister ? 'Už máte účet? ' : 'Ještě nemáte účet? '}
        <button
          type="button"
          onClick={() => setMode(isRegister ? 'login' : 'register')}
          className="font-semibold text-primary hover:underline"
        >
          {isRegister ? 'Přihlaste se' : 'Zaregistrujte se'}
        </button>
      </p>
    </div>
  )
}

const inputClass =
  'h-12 w-full rounded-xl border border-input bg-card pl-11 pr-4 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15'

function Field({
  id,
  label,
  icon: Icon,
  children,
}: {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-foreground">
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
        {children}
      </div>
    </div>
  )
}
