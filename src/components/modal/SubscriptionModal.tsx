import { useState, useEffect } from 'react'
import { Button } from '../ui/Button'
import { CATEGORIES, PRESET_COLORS, CYCLE_LABELS } from '../../constants'
import { nextMonthISO } from '../../utils/date'
import type { Subscription, SubscriptionFormData } from '../../types'

interface SubscriptionModalProps {
  open: boolean
  editingSubscription?: Subscription | null
  onClose: () => void
  onSave: (data: SubscriptionFormData) => Promise<void>
  onDelete?: (id: string) => Promise<void>
}

const EMPTY: SubscriptionFormData = {
  name: '',
  amount: 0,
  currency: 'KRW',
  cycle: 'monthly',
  category: 'other',
  next_payment_date: nextMonthISO(),
  color: PRESET_COLORS[0],
  active: true,
  notes: '',
}

export function SubscriptionModal({ open, editingSubscription, onClose, onSave, onDelete }: SubscriptionModalProps) {
  const [form, setForm] = useState<SubscriptionFormData>(EMPTY)
  const [loading, setLoading] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) {
      if (editingSubscription) {
        const { id, user_id, created_at, ...rest } = editingSubscription
        void id; void user_id; void created_at
        setForm(rest)
      } else {
        setForm({ ...EMPTY, next_payment_date: nextMonthISO() })
      }
      setConfirmDelete(false)
      setError('')
    }
  }, [open, editingSubscription])

  function set<K extends keyof SubscriptionFormData>(key: K, value: SubscriptionFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) { setError('서비스 이름을 입력하세요.'); return }
    if (form.amount <= 0) { setError('금액을 올바르게 입력하세요.'); return }
    setLoading(true)
    try {
      await onSave(form)
      onClose()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '저장 실패')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!editingSubscription || !onDelete) return
    setLoading(true)
    try {
      await onDelete(editingSubscription.id)
      onClose()
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-4" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-gray-900 dark:text-white">
            {editingSubscription ? '구독 수정' : '구독 추가'}
          </h2>
          <button onClick={onClose} className="p-2 -m-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-4 flex flex-col gap-4">
          {/* 서비스 이름 */}
          <div>
            <label className="label">서비스 이름</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              className="input"
              placeholder="Netflix, Spotify..."
              required
            />
          </div>

          {/* 금액 + 통화 */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="label">금액</label>
              <input
                type="number"
                value={form.amount || ''}
                onChange={(e) => set('amount', Number(e.target.value))}
                className="input"
                placeholder="0"
                min="0"
                step="any"
                required
              />
            </div>
            <div className="w-24">
              <label className="label">통화</label>
              <select value={form.currency} onChange={(e) => set('currency', e.target.value as SubscriptionFormData['currency'])} className="input">
                <option value="KRW">₩ KRW</option>
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
              </select>
            </div>
          </div>

          {/* 결제 주기 */}
          <div>
            <label className="label">결제 주기</label>
            <div className="flex gap-2">
              {(Object.entries(CYCLE_LABELS) as [string, string][]).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => set('cycle', value as SubscriptionFormData['cycle'])}
                  className={`flex-1 py-2.5 text-sm rounded-lg border transition-colors ${
                    form.cycle === value
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-indigo-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 다음 결제일 */}
          <div>
            <label className="label">다음 결제일</label>
            <input
              type="date"
              value={form.next_payment_date}
              onChange={(e) => set('next_payment_date', e.target.value)}
              className="input"
              required
            />
          </div>

          {/* 카테고리 */}
          <div>
            <label className="label">카테고리</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => set('category', cat.value as SubscriptionFormData['category'])}
                  className={`py-2.5 text-sm rounded-lg border transition-colors ${
                    form.category === cat.value
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                      : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* 색상 */}
          <div>
            <label className="label">색상</label>
            <div className="flex gap-2 flex-wrap">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => set('color', c)}
                  className={`w-10 h-10 rounded-full transition-transform ${form.color === c ? 'scale-125 ring-2 ring-offset-2 ring-gray-400' : ''}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* 메모 */}
          <div>
            <label className="label">메모 (선택)</label>
            <textarea
              value={form.notes ?? ''}
              onChange={(e) => set('notes', e.target.value)}
              className="input resize-none"
              rows={2}
              placeholder="추가 메모..."
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-2 pt-2">
            {editingSubscription && onDelete && !confirmDelete && (
              <Button type="button" variant="ghost" onClick={() => setConfirmDelete(true)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950">
                삭제
              </Button>
            )}
            {confirmDelete && (
              <Button type="button" variant="danger" onClick={handleDelete} disabled={loading}>
                정말 삭제
              </Button>
            )}
            <div className="flex-1" />
            <Button type="button" variant="secondary" onClick={onClose}>취소</Button>
            <Button type="submit" disabled={loading}>{loading ? '저장 중...' : '저장'}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
