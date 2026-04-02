import { CATEGORY_CONFIG } from '../../constants'
import type { Subscription } from '../../types'

interface BadgeProps {
  category: Subscription['category']
  size?: 'sm' | 'md'
}

export function Badge({ category, size = 'sm' }: BadgeProps) {
  const cfg = CATEGORY_CONFIG[category]
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClass}`}
      style={{ backgroundColor: cfg.color + '20', color: cfg.color }}
    >
      <span>{cfg.icon}</span>
      {cfg.label}
    </span>
  )
}
