interface EmptyStateProps {
  onAdd: () => void
}

export function EmptyState({ onAdd }: EmptyStateProps) {
  return (
    <div className="text-center py-20 text-gray-400">
      <div className="text-6xl mb-4">💳</div>
      <p className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">구독 서비스가 없어요</p>
      <p className="text-sm mb-6">구독 중인 서비스를 추가해 비용을 한눈에 파악하세요</p>
      <button
        onClick={onAdd}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
      >
        첫 구독 추가하기
      </button>
    </div>
  )
}
