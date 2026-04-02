import { differenceInDays, format, parseISO, isValid } from 'date-fns'
import { ko } from 'date-fns/locale'
import type { Subscription } from '../types'

export function getDaysUntil(dateStr: string): number {
  const date = parseISO(dateStr)
  if (!isValid(date)) return Infinity
  return differenceInDays(date, new Date())
}

export function formatDate(dateStr: string): string {
  const date = parseISO(dateStr)
  if (!isValid(date)) return '-'
  return format(date, 'yyyy.MM.dd', { locale: ko })
}

export function getUpcomingPayments(subscriptions: Subscription[], days = 30): Subscription[] {
  return subscriptions
    .filter((s) => s.active && getDaysUntil(s.next_payment_date) <= days && getDaysUntil(s.next_payment_date) >= 0)
    .sort((a, b) => getDaysUntil(a.next_payment_date) - getDaysUntil(b.next_payment_date))
    .slice(0, 10)
}

export function todayISO(): string {
  return format(new Date(), 'yyyy-MM-dd')
}

export function nextMonthISO(): string {
  const d = new Date()
  d.setMonth(d.getMonth() + 1)
  return format(d, 'yyyy-MM-dd')
}
