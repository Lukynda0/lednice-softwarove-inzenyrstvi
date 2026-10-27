import { AuthForm } from '@/components/auth/auth-form'
import { LogoMark, LogoWordmark } from '@/components/logo'
import { PhoneShell } from '@/components/phone-shell'

export default function LoginPage() {
  return (
    <PhoneShell>
      <main className="flex flex-1 flex-col overflow-y-auto">
        <header className="relative flex flex-col items-center gap-3 overflow-hidden bg-secondary px-6 pt-14 pb-10 text-center">
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-20 size-64 rounded-full bg-primary/10"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 -left-16 size-56 rounded-full bg-primary/10"
          />
          <LogoMark className="relative" />
          <h1 className="relative">
            <LogoWordmark />
          </h1>
          <p className="relative max-w-64 text-sm leading-relaxed text-secondary-foreground/80">
            Vaše lednice pod kontrolou. Méně plýtvání, více dobrého jídla.
          </p>
        </header>

        <section className="-mt-5 flex-1 rounded-t-3xl bg-background px-6 pt-7 pb-8">
          <AuthForm />
        </section>
      </main>
    </PhoneShell>
  )
}
