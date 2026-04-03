export interface Subscription {
  id: string
  user_id: string
  name: string
  amount: number
  currency: 'KRW' | 'USD' | 'EUR'
  cycle: 'monthly' | 'yearly' | 'weekly'
  category: 'streaming' | 'software' | 'game' | 'shopping' | 'other'
  next_payment_date: string
  color: string
  active: boolean
  notes?: string
  payment_method?: string
  card_name?: string
  created_at: string
}

export type SubscriptionFormData = Omit<Subscription, 'id' | 'user_id' | 'created_at'>

export interface UserCard {
  id: string
  user_id: string
  issuer: string
  nickname?: string
  last_digits?: string
  created_at: string
}

export type UserCardFormData = Pick<UserCard, 'issuer' | 'nickname' | 'last_digits'>

export interface CategorySummary {
  category: string
  total: number
  count: number
  color: string
  label: string
}

export interface DashboardStats {
  monthlyTotal: number
  yearlyTotal: number
  activeCount: number
  byCategory: CategorySummary[]
}
