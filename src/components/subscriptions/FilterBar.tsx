import { CATEGORIES } from '../../constants'

type SortOption = 'date' | 'amount' | 'name'

interface FilterBarProps {
  category: string
  sort: SortOption
  onCategory: (c: string) => void
  onSort: (s: SortOption) => void
}

export function FilterBar({ category, sort, onCategory, onSort }: FilterBarProps) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => onCategory('all')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            category === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          전체
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onCategory(cat.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              category === cat.value
                ? 'text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            style={category === cat.value ? { backgroundColor: cat.color } : undefined}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>
      <select
        value={sort}
        onChange={(e) => onSort(e.target.value as SortOption)}
        className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="date">결제일순</option>
        <option value="amount">금액순</option>
        <option value="name">이름순</option>
      </select>
    </div>
  )
}
