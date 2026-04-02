import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card } from '../ui/Card'
import { formatKRW } from '../../utils/currency'
import type { CategorySummary } from '../../types'

interface CategoryPieChartProps {
  data: CategorySummary[]
}

export function CategoryPieChart({ data }: CategoryPieChartProps) {
  if (data.length === 0) {
    return (
      <Card className="p-6 text-center text-gray-400 text-sm">
        구독을 추가하면 카테고리별 분포가 표시됩니다
      </Card>
    )
  }

  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">카테고리별 지출</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="total"
            nameKey="label"
          >
            {data.map((entry) => (
              <Cell key={entry.category} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => formatKRW(Number(value))}
            contentStyle={{
              backgroundColor: 'var(--tooltip-bg, #fff)',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '13px',
            }}
          />
          <Legend
            formatter={(value) => <span className="text-xs text-gray-600 dark:text-gray-400">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}
