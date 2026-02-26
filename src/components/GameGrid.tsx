import type { SteamGame } from '../types'
import { GameCard } from './GameCard'

interface GameGridProps {
  games: SteamGame[]
  isLoading: boolean
  error: Error | null
}

export function GameGrid({ games, isLoading, error }: GameGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 animate-pulse">
            <div className="aspect-[460/215] bg-zinc-800" />
            <div className="p-3 space-y-2">
              <div className="h-4 bg-zinc-800 rounded w-3/4" />
              <div className="h-3 bg-zinc-800 rounded w-1/2" />
              <div className="h-4 bg-zinc-800 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-4xl mb-4">:(</div>
        <h2 className="text-xl font-bold text-white mb-2">Failed to load games</h2>
        <p className="text-zinc-400 max-w-md">
          Steam's API might be rate-limiting or unavailable. Try refreshing in a moment.
        </p>
        <p className="text-zinc-600 text-sm mt-2 font-mono">{error.message}</p>
      </div>
    )
  }

  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-4xl mb-4">0</div>
        <h2 className="text-xl font-bold text-white mb-2">No games match your filters</h2>
        <p className="text-zinc-400">Try loosening your filter criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {games.map((game) => (
        <GameCard key={game.appid} game={game} />
      ))}
    </div>
  )
}
