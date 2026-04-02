import { Card } from '../ui/Card'
import { formatKRW } from '../../utils/currency'
import type { DashboardStats } from '../../types'

interface SummaryCardsProps {
  stats: DashboardStats
}

export function SummaryCards({ stats }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Card className="p-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">월간 지출</p>
        <p className="text-xl font-bold text-gray-900 dark:text-white">{formatKRW(stats.monthlyTotal)}</p>
      </Card>
      <Card className="p-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">연간 지출</p>
        <p className="text-xl font-bold text-gray-900 dark:text-white">{formatKRW(stats.yearlyTotal)}</p>
      </Card>
      <Card className="p-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">활성 구독</p>
        <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.activeCount}<span className="text-sm font-normal text-gray-400 ml-1">개</span></p>
      </Card>
    </div>
  )
}
