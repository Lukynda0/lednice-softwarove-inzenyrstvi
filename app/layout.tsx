import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { FridgeProvider } from '@/lib/fridge-store'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-jakarta',
})

export const metadata: Metadata = {
  title: 'e-Lednice – chytrá lednice v mobilu',
  description:
    'Mějte přehled o potravinách v lednici, hlídejte data spotřeby, objevujte recepty a nakupujte přes Košík nebo Rohlík.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f4f8f8',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs" className={`${jakarta.variable} bg-background`}>
      <body className="antialiased">
        <FridgeProvider>{children}</FridgeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
