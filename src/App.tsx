import { useState, useEffect } from 'react'
import './index.css'
import { useAuth } from './hooks/useAuth'
import { useSubscriptions } from './hooks/useSubscriptions'
import { useCards } from './hooks/useCards'
import { AuthPage } from './pages/AuthPage'
import { DashboardPage } from './pages/DashboardPage'
import { SubscriptionsPage } from './pages/SubscriptionsPage'
import { CardsPage } from './pages/CardsPage'
import { AppShell } from './components/layout/AppShell'
import { TabNav } from './components/layout/TabNav'
import type { Tab } from './components/layout/TabNav'
import { SubscriptionModal } from './components/modal/SubscriptionModal'

function App() {
  const { session, loading: authLoading, signIn, signUp, signOut } = useAuth()
  const {
    subscriptions,
    add, update, remove, toggleActive,
    isModalOpen, editingId, openModal, closeModal,
  } = useSubscriptions(session)
  const { cards, add: addCard, remove: removeCard } = useCards(session)

  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) return saved === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', String(darkMode))
  }, [darkMode])

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-400 text-sm">불러오는 중...</div>
      </div>
    )
  }

  if (!session) {
    return <AuthPage onSignIn={signIn} onSignUp={signUp} />
  }

  const editingSub = editingId ? subscriptions.find((s) => s.id === editingId) ?? null : null

  return (
    <AppShell
      onSignOut={signOut}
      userEmail={session.user.email ?? ''}
      darkMode={darkMode}
      onToggleDark={() => setDarkMode((d) => !d)}
    >
      <TabNav active={activeTab} onChange={setActiveTab} />

      <div className={activeTab === 'dashboard' ? 'block' : 'hidden'}>
        <DashboardPage subscriptions={subscriptions} onEdit={openModal} />
      </div>
      <div className={activeTab === 'subscriptions' ? 'block' : 'hidden'}>
        <SubscriptionsPage
          subscriptions={subscriptions}
          onEdit={openModal}
          onToggle={toggleActive}
          onAdd={() => openModal()}
        />
      </div>
      <div className={activeTab === 'cards' ? 'block' : 'hidden'}>
        <CardsPage
          cards={cards}
          onAdd={({ issuer, nickname, lastDigits }) => addCard({ issuer, nickname: nickname || undefined, last_digits: lastDigits || undefined })}
          onRemove={removeCard}
        />
      </div>

      <SubscriptionModal
        open={isModalOpen}
        editingSubscription={editingSub}
        onClose={closeModal}
        cards={cards}
        onSave={async (data) => {
          if (editingId) await update(editingId, data)
          else await add(data)
        }}
        onDelete={remove}
      />
    </AppShell>
  )
}

export default App
