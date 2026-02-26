import type { SteamGame } from '../types'
import { TAG_IDS } from '../types'

interface GameCardProps {
  game: SteamGame
}

export function GameCard({ game }: GameCardProps) {
  const hasAITag = game.tags.some((t) => t.id === TAG_IDS.AI_GENERATED)
  const hasAssetFlipTag = game.tags.some((t) => t.id === TAG_IDS.ASSET_FLIP)
  const steamUrl = `https://store.steampowered.com/app/${game.appid}`

  return (
    <a
      href={steamUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all hover:shadow-lg hover:shadow-black/30 hover:-translate-y-0.5"
    >
      <div className="relative aspect-[460/215] overflow-hidden bg-zinc-800">
        <img
          src={game.header_image}
          alt={game.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {(hasAITag || hasAssetFlipTag) && (
          <div className="absolute top-2 right-2 flex gap-1">
            {hasAITag && (
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-600/90 text-white">
                AI
              </span>
            )}
            {hasAssetFlipTag && (
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-orange-600/90 text-white">
                Flip
              </span>
            )}
          </div>
        )}
        {game.has_demo && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-bold bg-green-600/90 text-white">
            Demo
          </span>
        )}
      </div>

      <div className="p-3 space-y-2">
        <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2 group-hover:text-blue-400 transition-colors">
          {game.name}
        </h3>

        {game.developer && (
          <p className="text-xs text-zinc-500 truncate">{game.developer}</p>
        )}

        <div className="flex items-center justify-between">
          <span
            className={`text-sm font-bold ${game.is_free ? 'text-green-400' : 'text-white'}`}
          >
            {game.price ?? 'N/A'}
          </span>

          {game.review_score !== undefined && game.review_score > 0 && (
            <span
              className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                game.review_score >= 70
                  ? 'bg-green-900/50 text-green-400'
                  : game.review_score >= 40
                    ? 'bg-yellow-900/50 text-yellow-400'
                    : 'bg-red-900/50 text-red-400'
              }`}
            >
              {game.review_score}%
            </span>
          )}
        </div>

        {game.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {game.tags.slice(0, 4).map((tag) => (
              <span
                key={tag.id}
                className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  )
}
