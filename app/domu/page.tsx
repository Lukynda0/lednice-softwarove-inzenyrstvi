import type { Metadata } from 'next'
import { BottomNav } from '@/components/bottom-nav'
import { ExpiringStrip } from '@/components/home/expiring-strip'
import { FeatureGrid } from '@/components/home/feature-grid'
import { FridgeHero } from '@/components/home/fridge-hero'
import { HomeHeader } from '@/components/home/home-header'
import { PhoneShell } from '@/components/phone-shell'

export const metadata: Metadata = {
  title: 'Domů – e-Lednice',
}

export default function HomePage() {
  return (
    <PhoneShell>
      <HomeHeader />
      <main className="flex flex-1 flex-col gap-7 overflow-y-auto pt-3 pb-6">
        <div className="px-5">
          <FridgeHero />
        </div>
        <ExpiringStrip />
        <FeatureGrid />
      </main>
      <BottomNav />
    </PhoneShell>
  )
}
