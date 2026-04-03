import { useState, useEffect, useCallback } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { UserCard, UserCardFormData } from '../types'

export function useCards(session: Session | null) {
  const [cards, setCards] = useState<UserCard[]>([])

  const load = useCallback(async () => {
    if (!session) return
    const { data } = await supabase.from('cards').select('*').order('created_at')
    if (data) setCards(data as UserCard[])
  }, [session])

  useEffect(() => { load() }, [load])

  async function add(data: UserCardFormData) {
    const { error } = await supabase.from('cards').insert({ ...data, user_id: session!.user.id })
    if (!error) load()
  }

  async function remove(id: string) {
    setCards((prev) => prev.filter((c) => c.id !== id))
    await supabase.from('cards').delete().eq('id', id)
  }

  return { cards, add, remove }
}
