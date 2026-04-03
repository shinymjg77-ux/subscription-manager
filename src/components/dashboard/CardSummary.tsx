import { useMemo } from 'react'
import { Card } from '../ui/Card'
import { formatKRW, getMonthlyKRW } from '../../utils/currency'
import type { Subscription } from '../../types'

interface CardSummaryProps {
  subscriptions: Subscription[]
}

export function CardSummary({ subscriptions }: CardSummaryProps) {
  const groups = useMemo(() => {
    const active = subscriptions.filter((s) => s.active)
    const map = new Map<string, { label: string; count: number; total: number }>()

    for (const s of active) {
      const key = s.card_name
        ? `${s.payment_method ?? ''}__${s.card_name}`
        : s.payment_method ?? '미지정'
      const label = s.card_name
        ? `${s.payment_method ? `${s.payment_method} · ` : ''}${s.card_name}`
        : s.payment_method ?? '결제수단 미지정'

      const existing = map.get(key)
      if (existing) {
        existing.count++
        existing.total += getMonthlyKRW(s)
      } else {
        map.set(key, { label, count: 1, total: getMonthlyKRW(s) })
      }
    }

    return [...map.values()].sort((a, b) => b.total - a.total)
  }, [subscriptions])

  if (groups.length === 0) return null

  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">결제수단별 월간 지출</h3>
      <div className="flex flex-col gap-2">
        {groups.map((g) => (
          <div key={g.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm text-gray-800 dark:text-gray-200 truncate">{g.label}</span>
              <span className="text-xs text-gray-400 flex-shrink-0">{g.count}개</span>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white flex-shrink-0 ml-3">
              {formatKRW(g.total)}<span className="text-xs font-normal text-gray-400">/월</span>
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
