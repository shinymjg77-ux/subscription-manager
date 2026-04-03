export const EXCHANGE_RATES: Record<string, number> = {
  KRW: 1,
  USD: 1350,
  EUR: 1480,
}

export const CATEGORY_CONFIG = {
  streaming: { label: '스트리밍', color: '#ef4444', icon: '🎬' },
  software: { label: '소프트웨어', color: '#3b82f6', icon: '💻' },
  game: { label: '게임', color: '#8b5cf6', icon: '🎮' },
  shopping: { label: '쇼핑', color: '#f59e0b', icon: '🛍️' },
  other: { label: '기타', color: '#6b7280', icon: '📦' },
} as const

export const CURRENCY_SYMBOLS: Record<string, string> = {
  KRW: '₩',
  USD: '$',
  EUR: '€',
}

export const CYCLE_LABELS: Record<string, string> = {
  monthly: '월간',
  yearly: '연간',
  weekly: '주간',
}

export const PAYMENT_METHODS = [
  { value: '신용카드', label: '신용카드' },
  { value: '체크카드', label: '체크카드' },
  { value: '카카오페이', label: '카카오페이' },
  { value: '네이버페이', label: '네이버페이' },
  { value: '토스', label: '토스' },
  { value: '페이팔', label: '페이팔' },
  { value: '기타', label: '기타' },
]

export const CARD_ISSUERS = [
  '현대카드', '삼성카드', '신한카드', 'KB국민카드', '롯데카드',
  '하나카드', '우리카드', 'NH농협카드', 'BC카드',
  '카카오뱅크', '토스뱅크', '케이뱅크', '기타',
]

export const PRESET_COLORS = [
  '#6366f1',
  '#ef4444',
  '#f59e0b',
  '#10b981',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
]

export const CATEGORIES = Object.entries(CATEGORY_CONFIG).map(([value, cfg]) => ({
  value,
  ...cfg,
}))
