export type Tab = 'dashboard' | 'subscriptions' | 'cards'

interface TabNavProps {
  active: Tab
  onChange: (tab: Tab) => void
}

const tabs = [
  { id: 'dashboard' as Tab, label: '대시보드' },
  { id: 'subscriptions' as Tab, label: '구독 목록' },
  { id: 'cards' as Tab, label: '카드' },
]

export function TabNav({ active, onChange }: TabNavProps) {
  return (
    <div className="flex border-b border-gray-200 dark:border-gray-700">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            active === tab.id
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
