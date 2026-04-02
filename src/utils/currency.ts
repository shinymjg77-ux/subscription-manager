import { EXCHANGE_RATES, CURRENCY_SYMBOLS } from '../constants'
import type { Subscription } from '../types'

export function convertToKRW(amount: number, currency: string): number {
  return amount * (EXCHANGE_RATES[currency] ?? 1)
}

export function normalizeToMonthly(amount: number, cycle: string): number {
  switch (cycle) {
    case 'yearly': return amount / 12
    case 'weekly': return amount * 4.33
    default: return amount
  }
}

export function getMonthlyKRW(sub: Subscription): number {
  return normalizeToMonthly(convertToKRW(sub.amount, sub.currency), sub.cycle)
}

export function formatAmount(amount: number, currency: string): string {
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency
  if (currency === 'KRW') {
    return `${symbol}${Math.round(amount).toLocaleString('ko-KR')}`
  }
  return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function formatKRW(amount: number): string {
  return `₩${Math.round(amount).toLocaleString('ko-KR')}`
}
