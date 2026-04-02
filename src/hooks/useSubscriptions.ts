import { useState, useEffect, useCallback } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { Subscription, SubscriptionFormData } from '../types'

export function useSubscriptions(session: Session | null) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!session) return
    setLoading(true)
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .order('next_payment_date')
    if (error) setError(error.message)
    else setSubscriptions(data as Subscription[])
    setLoading(false)
  }, [session])

  useEffect(() => { load() }, [load])

  async function add(data: SubscriptionFormData) {
    const optimistic: Subscription = { ...data, id: crypto.randomUUID(), user_id: session!.user.id, created_at: new Date().toISOString() }
    setSubscriptions((prev) => [...prev, optimistic].sort((a, b) => a.next_payment_date.localeCompare(b.next_payment_date)))
    const { error } = await supabase.from('subscriptions').insert({ ...data, user_id: session!.user.id })
    if (error) { setError(error.message); load() }
    else load()
  }

  async function update(id: string, data: Partial<SubscriptionFormData>) {
    setSubscriptions((prev) => prev.map((s) => s.id === id ? { ...s, ...data } : s))
    const { error } = await supabase.from('subscriptions').update(data).eq('id', id)
    if (error) { setError(error.message); load() }
    else load()
  }

  async function remove(id: string) {
    setSubscriptions((prev) => prev.filter((s) => s.id !== id))
    const { error } = await supabase.from('subscriptions').delete().eq('id', id)
    if (error) { setError(error.message); load() }
  }

  async function toggleActive(id: string) {
    const sub = subscriptions.find((s) => s.id === id)
    if (!sub) return
    await update(id, { active: !sub.active })
  }

  function openModal(id?: string) {
    setEditingId(id ?? null)
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
    setEditingId(null)
  }

  return { subscriptions, loading, error, add, update, remove, toggleActive, isModalOpen, editingId, openModal, closeModal }
}
