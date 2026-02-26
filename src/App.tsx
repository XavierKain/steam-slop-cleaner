import { useState, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FilterPanel } from './components/FilterPanel'
import { GameGrid } from './components/GameGrid'
import { useSteamGames } from './hooks/useSteamGames'
import { DEFAULT_FILTERS, TAG_IDS } from './types'
import type { Filters } from './types'

const queryClient = new QueryClient()

function AppContent() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { data: games = [], isLoading, error } = useSteamGames()

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      if (filters.hideAI && game.tags.some((t) => t.id === TAG_IDS.AI_GENERATED)) return false
      if (filters.hideAssetFlip && game.tags.some((t) => t.id === TAG_IDS.ASSET_FLIP)) return false
      if (filters.minReviews > 0 && (game.review_count ?? 0) < filters.minReviews) return false
      if (filters.minRating > 0 && (game.review_score ?? 0) < filters.minRating) return false
      if (filters.priceFilter === 'free' && !game.is_free) return false
      if (filters.priceFilter === 'paid' && game.is_free) return false
      if (filters.demoOnly && !game.has_demo) return false
      return true
    })
  }, [games, filters])

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 -ml-2 text-zinc-400 hover:text-white"
              aria-label="Toggle filters"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm4 6a1 1 0 011-1h8a1 1 0 010 2H8a1 1 0 01-1-1zm2 6a1 1 0 011-1h4a1 1 0 010 2h-4a1 1 0 01-1-1z" />
              </svg>
            </button>
            <h1 className="text-lg font-bold tracking-tight">
              <span className="text-blue-400">Steam</span> Slop Cleaner
            </h1>
          </div>
          <p className="text-xs text-zinc-500 hidden sm:block">
            Clean discovery for indie games
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed top-14 left-0 z-50 h-[calc(100vh-3.5rem)] w-72 bg-zinc-950 border-r border-zinc-800 p-5 overflow-y-auto transition-transform lg:static lg:translate-x-0 lg:h-auto lg:border-r-0 lg:p-0 lg:w-64 lg:shrink-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            totalCount={games.length}
            filteredCount={filteredGames.length}
          />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <GameGrid games={filteredGames} isLoading={isLoading} error={error} />
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
}
