import { SubscriptionList } from '../components/subscriptions/SubscriptionList'
import type { Subscription } from '../types'

interface SubscriptionsPageProps {
  subscriptions: Subscription[]
  onEdit: (id: string) => void
  onToggle: (id: string) => void
  onAdd: () => void
}

export function SubscriptionsPage({ subscriptions, onEdit, onToggle, onAdd }: SubscriptionsPageProps) {
  return (
    <div className="flex flex-col gap-4 pt-4 pb-24 sm:pb-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-900 dark:text-white">내 구독 <span className="text-gray-400 font-normal text-sm">{subscriptions.length}개</span></h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors"
        >
          <span>+</span> 추가
        </button>
      </div>
      <SubscriptionList subscriptions={subscriptions} onEdit={onEdit} onToggle={onToggle} onAdd={onAdd} />

      {/* FAB - 모바일 전용 */}
      <button
        onClick={onAdd}
        className="sm:hidden fixed bottom-6 right-4 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-colors z-40"
        aria-label="구독 추가"
      >
        +
      </button>
    </div>
  )
}
