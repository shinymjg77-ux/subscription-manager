import { useState } from 'react'
import { Button } from '../components/ui/Button'
import type { UserCard } from '../types'

interface CardsPageProps {
  cards: UserCard[]
  onAdd: (nickname: string, lastDigits: string) => Promise<void>
  onRemove: (id: string) => Promise<void>
}

export function CardsPage({ cards, onAdd, onRemove }: CardsPageProps) {
  const [nickname, setNickname] = useState('')
  const [lastDigits, setLastDigits] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!nickname.trim()) return
    setLoading(true)
    await onAdd(nickname.trim(), lastDigits.trim())
    setNickname('')
    setLastDigits('')
    setLoading(false)
  }

  function cardLabel(card: UserCard) {
    return card.last_digits ? `${card.nickname} (${card.last_digits}*)` : card.nickname
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
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="input flex-1"
            placeholder="카드 이름 (예: 샵페이, 현대카드)"
            required
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
        <Button type="submit" disabled={loading || !nickname.trim()} className="self-end">
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
