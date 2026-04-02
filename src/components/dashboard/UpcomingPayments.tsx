import { Card } from '../ui/Card'
import { formatDate, getDaysUntil, getUpcomingPayments } from '../../utils/date'
import { formatAmount } from '../../utils/currency'
import type { Subscription } from '../../types'

interface UpcomingPaymentsProps {
  subscriptions: Subscription[]
  onEdit: (id: string) => void
}

export function UpcomingPayments({ subscriptions, onEdit }: UpcomingPaymentsProps) {
  const upcoming = getUpcomingPayments(subscriptions, 30)

  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">30일 이내 결제 예정</h3>
      {upcoming.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">30일 이내 결제 예정 없음</p>
      ) : (
        <div className="flex flex-col gap-2">
          {upcoming.map((sub) => {
            const days = getDaysUntil(sub.next_payment_date)
            const daysColor = days <= 3 ? 'text-red-500 bg-red-50 dark:bg-red-950' : days <= 7 ? 'text-amber-500 bg-amber-50 dark:bg-amber-950' : 'text-gray-500 bg-gray-100 dark:bg-gray-700'
            const daysLabel = days === 0 ? 'D-day' : `D-${days}`
            return (
              <button
                key={sub.id}
                onClick={() => onEdit(sub.id)}
                className="flex items-center gap-3 text-left hover:bg-gray-50 dark:hover:bg-gray-750 rounded-lg p-2 -m-2 transition-colors"
              >
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: sub.color }} />
                <span className="flex-1 text-sm text-gray-800 dark:text-gray-200 truncate">{sub.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(sub.next_payment_date)}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${daysColor}`}>{daysLabel}</span>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{formatAmount(sub.amount, sub.currency)}</span>
              </button>
            )
          })}
        </div>
      )}
    </Card>
  )
}
