'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import { dateFromToday } from '@/lib/expiry'

export type CategoryId =
  | 'mlecne'
  | 'zelenina'
  | 'ovoce'
  | 'maso'
  | 'napoje'
  | 'ostatni'

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'mlecne', label: 'Mléčné' },
  { id: 'zelenina', label: 'Zelenina' },
  { id: 'ovoce', label: 'Ovoce' },
  { id: 'maso', label: 'Maso a ryby' },
  { id: 'napoje', label: 'Nápoje' },
  { id: 'ostatni', label: 'Ostatní' },
]

export type FridgeItem = {
  id: string
  name: string
  category: CategoryId
  quantity: string
  expiresOn: string
}

export type NewFridgeItem = Omit<FridgeItem, 'id'>

const INITIAL_ITEMS: FridgeItem[] = [
  { id: '1', name: 'Polotučné mléko', category: 'mlecne', quantity: '1 l', expiresOn: dateFromToday(1) },
  { id: '2', name: 'Řecký jogurt', category: 'mlecne', quantity: '2 ks', expiresOn: dateFromToday(-1) },
  { id: '3', name: 'Eidam 30 %', category: 'mlecne', quantity: '200 g', expiresOn: dateFromToday(9) },
  { id: '4', name: 'Kuřecí prsa', category: 'maso', quantity: '500 g', expiresOn: dateFromToday(0) },
  { id: '5', name: 'Rajčata cherry', category: 'zelenina', quantity: '250 g', expiresOn: dateFromToday(3) },
  { id: '6', name: 'Paprika červená', category: 'zelenina', quantity: '3 ks', expiresOn: dateFromToday(6) },
  { id: '7', name: 'Jablka', category: 'ovoce', quantity: '6 ks', expiresOn: dateFromToday(12) },
  { id: '8', name: 'Pomerančový džus', category: 'napoje', quantity: '1 l', expiresOn: dateFromToday(5) },
  { id: '9', name: 'Vejce', category: 'ostatni', quantity: '10 ks', expiresOn: dateFromToday(14) },
  { id: '10', name: 'Máslo', category: 'mlecne', quantity: '250 g', expiresOn: dateFromToday(2) },
]

type FridgeContextValue = {
  items: FridgeItem[]
  addItem: (item: NewFridgeItem) => void
  removeItem: (id: string) => void
}

const FridgeContext = createContext<FridgeContextValue | null>(null)

export function FridgeProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<FridgeItem[]>(INITIAL_ITEMS)

  const value = useMemo<FridgeContextValue>(
    () => ({
      items,
      addItem: (item) =>
        setItems((prev) => [{ ...item, id: crypto.randomUUID() }, ...prev]),
      removeItem: (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
    }),
    [items],
  )

  return <FridgeContext.Provider value={value}>{children}</FridgeContext.Provider>
}

export function useFridge() {
  const ctx = useContext(FridgeContext)
  if (!ctx) throw new Error('useFridge must be used within FridgeProvider')
  return ctx
}
