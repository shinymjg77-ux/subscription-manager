import { formatDate, getDaysUntil } from '../../utils/date'
import { formatAmount, formatKRW, getMonthlyKRW } from '../../utils/currency'
import { CYCLE_LABELS } from '../../constants'
import { Badge } from '../ui/Badge'
import type { Subscription } from '../../types'

interface SubscriptionCardProps {
  sub: Subscription
  onEdit: (id: string) => void
  onToggle: (id: string) => void
}

export function SubscriptionCard({ sub, onEdit, onToggle }: SubscriptionCardProps) {
  const days = getDaysUntil(sub.next_payment_date)
  const monthlyKRW = getMonthlyKRW(sub)

  const daysLabel = days === 0 ? '오늘' : days === 1 ? '내일' : `${days}일 후`
  const daysColor = days <= 3 ? 'text-red-500' : days <= 7 ? 'text-amber-500' : 'text-gray-400'

  return (
    <div className={`flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-opacity ${!sub.active ? 'opacity-50' : ''}`}>
      <div className="w-1 h-12 rounded-full flex-shrink-0" style={{ backgroundColor: sub.color }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-gray-900 dark:text-white truncate">{sub.name}</span>
          <Badge category={sub.category} />
        </div>
        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 dark:text-gray-400">
          <span>{CYCLE_LABELS[sub.cycle]}</span>
          {sub.payment_method && (
            <span>{sub.payment_method}{sub.card_name ? ` · ${sub.card_name}` : ''}</span>
          )}
          <span className={daysColor}>{formatDate(sub.next_payment_date)} ({daysLabel})</span>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="font-semibold text-gray-900 dark:text-white">{formatAmount(sub.amount, sub.currency)}</div>
        {sub.currency !== 'KRW' && (
          <div className="text-xs text-gray-400">{formatKRW(monthlyKRW)}/월</div>
        )}
        {sub.currency === 'KRW' && sub.cycle !== 'monthly' && (
          <div className="text-xs text-gray-400">{formatKRW(monthlyKRW)}/월 환산</div>
        )}
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={() => onEdit(sub.id)}
          className="p-2.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          ✏️
        </button>
        <button
          onClick={() => onToggle(sub.id)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${sub.active ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
        >
          <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${sub.active ? 'translate-x-5' : 'translate-x-0.5'}`} />
        </button>
      </div>
    </div>
  )
}
