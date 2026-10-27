export type ExpiryTone = 'expired' | 'soon' | 'ok'

const DAY_MS = 24 * 60 * 60 * 1000

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function toDateInputValue(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function dateFromToday(offsetDays: number) {
  const today = startOfDay(new Date())
  today.setDate(today.getDate() + offsetDays)
  return toDateInputValue(today)
}

export function parseDate(value: string) {
  const [y, m, d] = value.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function daysUntil(value: string) {
  const diff = parseDate(value).getTime() - startOfDay(new Date()).getTime()
  return Math.round(diff / DAY_MS)
}

export function expiryTone(days: number): ExpiryTone {
  if (days < 0) return 'expired'
  if (days <= 2) return 'soon'
  return 'ok'
}

export function expiryLabel(days: number) {
  if (days < -1) return `Prošlé před ${Math.abs(days)} dny`
  if (days === -1) return 'Prošlé včera'
  if (days === 0) return 'Spotřebujte dnes'
  if (days === 1) return 'Zítra'
  if (days <= 4) return `Za ${days} dny`
  return `Za ${days} dní`
}

export function formatCzechDate(value: string) {
  return parseDate(value).toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
