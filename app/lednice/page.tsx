import type { Metadata } from 'next'
import { BottomNav } from '@/components/bottom-nav'
import { FridgeView } from '@/components/fridge/fridge-view'
import { PhoneShell } from '@/components/phone-shell'

export const metadata: Metadata = {
  title: 'Moje lednice – e-Lednice',
}

export default function FridgePage() {
  return (
    <PhoneShell>
      <FridgeView />
      <BottomNav />
    </PhoneShell>
  )
}
