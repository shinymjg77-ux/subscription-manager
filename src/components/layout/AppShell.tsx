import type { ReactNode } from 'react'
import { Button } from '../ui/Button'

interface AppShellProps {
  children: ReactNode
  onSignOut: () => void
  userEmail: string
  darkMode: boolean
  onToggleDark: () => void
}

export function AppShell({ children, onSignOut, userEmail, darkMode, onToggleDark }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">💳</span>
            <span className="font-semibold text-gray-900 dark:text-white">구독 관리</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleDark}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="다크모드 전환"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <span className="text-sm text-gray-400 hidden sm:block">{userEmail}</span>
            <Button variant="ghost" size="sm" onClick={onSignOut}>로그아웃</Button>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 pb-12">
        {children}
      </main>
    </div>
  )
}
