import { useMemo } from 'react'
import { SummaryCards } from '../components/dashboard/SummaryCards'
import { CategoryPieChart } from '../components/dashboard/CategoryPieChart'
import { UpcomingPayments } from '../components/dashboard/UpcomingPayments'
import { getMonthlyKRW } from '../utils/currency'
import { CATEGORY_CONFIG } from '../constants'
import type { Subscription, DashboardStats } from '../types'

interface DashboardPageProps {
  subscriptions: Subscription[]
  onEdit: (id: string) => void
}

export function DashboardPage({ subscriptions, onEdit }: DashboardPageProps) {
  const stats = useMemo<DashboardStats>(() => {
    const active = subscriptions.filter((s) => s.active)
    const monthlyTotal = active.reduce((sum, s) => sum + getMonthlyKRW(s), 0)

    const byCategory = (Object.keys(CATEGORY_CONFIG) as Array<keyof typeof CATEGORY_CONFIG>)
      .map((cat) => {
        const items = active.filter((s) => s.category === cat)
        return {
          category: cat,
          label: CATEGORY_CONFIG[cat].label,
          color: CATEGORY_CONFIG[cat].color,
          total: items.reduce((sum, s) => sum + getMonthlyKRW(s), 0),
          count: items.length,
        }
      })
      .filter((c) => c.total > 0)

    return {
      monthlyTotal,
      yearlyTotal: monthlyTotal * 12,
      activeCount: active.length,
      byCategory,
    }
  }, [subscriptions])

  return (
    <div className="flex flex-col gap-4 pt-4">
      <SummaryCards stats={stats} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CategoryPieChart data={stats.byCategory} />
        <UpcomingPayments subscriptions={subscriptions} onEdit={onEdit} />
      </div>
    </div>
  )
}
