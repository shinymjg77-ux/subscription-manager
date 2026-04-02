import { useState, useMemo } from 'react'
import { FilterBar } from './FilterBar'
import { SubscriptionCard } from './SubscriptionCard'
import { EmptyState } from './EmptyState'
import { getMonthlyKRW } from '../../utils/currency'
import { getDaysUntil } from '../../utils/date'
import type { Subscription } from '../../types'

type SortOption = 'date' | 'amount' | 'name'

interface SubscriptionListProps {
  subscriptions: Subscription[]
  onEdit: (id: string) => void
  onToggle: (id: string) => void
  onAdd: () => void
}

export function SubscriptionList({ subscriptions, onEdit, onToggle, onAdd }: SubscriptionListProps) {
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState<SortOption>('date')

  const filtered = useMemo(() => {
    let list = category === 'all' ? subscriptions : subscriptions.filter((s) => s.category === category)
    if (sort === 'date') list = [...list].sort((a, b) => getDaysUntil(a.next_payment_date) - getDaysUntil(b.next_payment_date))
    else if (sort === 'amount') list = [...list].sort((a, b) => getMonthlyKRW(b) - getMonthlyKRW(a))
    else list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'ko'))
    return list
  }, [subscriptions, category, sort])

  return (
    <div className="flex flex-col gap-4">
      <FilterBar category={category} sort={sort} onCategory={setCategory} onSort={setSort} />
      {filtered.length === 0 ? (
        subscriptions.length === 0 ? (
          <EmptyState onAdd={onAdd} />
        ) : (
          <div className="text-center py-12 text-gray-400">해당 카테고리에 구독이 없어요</div>
        )
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((sub) => (
            <SubscriptionCard key={sub.id} sub={sub} onEdit={onEdit} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  )
}
