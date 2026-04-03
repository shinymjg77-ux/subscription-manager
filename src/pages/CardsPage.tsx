import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { CARD_ISSUERS } from '../constants'
import type { UserCard } from '../types'

interface CardsPageProps {
  cards: UserCard[]
  onAdd: (data: { issuer: string; nickname: string; lastDigits: string }) => Promise<void>
  onRemove: (id: string) => Promise<void>
}

export function cardLabel(card: UserCard) {
  const base = [card.issuer, card.nickname].filter(Boolean).join(' ')
  return card.last_digits ? `${base} (${card.last_digits}*)` : base
}

export function CardsPage({ cards, onAdd, onRemove }: CardsPageProps) {
  const [issuer, setIssuer] = useState(CARD_ISSUERS[0])
  const [nickname, setNickname] = useState('')
  const [lastDigits, setLastDigits] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await onAdd({ issuer, nickname: nickname.trim(), lastDigits: lastDigits.trim() })
    setNickname('')
    setLastDigits('')
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-4 pt-4">
      <h2 className="font-semibold text-gray-900 dark:text-white">
        카드 관리 <span className="text-gray-400 font-normal text-sm">{cards.length}개</span>
      </h2>

      {/* 추가 폼 */}
      <form onSubmit={handleAdd} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-3">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">새 카드 등록</p>
        <div className="flex gap-2">
          <select
            value={issuer}
            onChange={(e) => setIssuer(e.target.value)}
            className="input w-36"
          >
            {CARD_ISSUERS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="input flex-1"
            placeholder="카드 이름 (선택, 예: 샵페이)"
          />
          <input
            type="text"
            value={lastDigits}
            onChange={(e) => setLastDigits(e.target.value)}
            className="input w-24"
            placeholder="뒷자리"
            maxLength={6}
            inputMode="numeric"
          />
        </div>
        <Button type="submit" disabled={loading} className="self-end">
          {loading ? '추가 중...' : '추가'}
        </Button>
      </form>

      {/* 카드 목록 */}
      {cards.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-sm">등록된 카드가 없어요</div>
      ) : (
        <div className="flex flex-col gap-2">
          {cards.map((card) => (
            <div key={card.id} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3">
              <span className="text-sm text-gray-900 dark:text-white">{cardLabel(card)}</span>
              <button
                onClick={() => onRemove(card.id)}
                className="text-sm text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors px-2 py-1"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
