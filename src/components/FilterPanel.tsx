import type { Filters } from '../types'

interface FilterPanelProps {
  filters: Filters
  onChange: (filters: Filters) => void
  totalCount: number
  filteredCount: number
}

export function FilterPanel({ filters, onChange, totalCount, filteredCount }: FilterPanelProps) {
  const update = (patch: Partial<Filters>) => onChange({ ...filters, ...patch })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white mb-1">Filters</h2>
        <p className="text-sm text-zinc-400">
          Showing {filteredCount} of {totalCount} games
        </p>
      </div>

      {/* Slop Filters */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">
          Slop Detection
        </legend>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={filters.hideAI}
            onChange={(e) => update({ hideAI: e.target.checked })}
            className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-red-500 focus:ring-red-500 focus:ring-offset-zinc-900"
          />
          <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
            Hide AI-generated content
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={filters.hideAssetFlip}
            onChange={(e) => update({ hideAssetFlip: e.target.checked })}
            className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-red-500 focus:ring-red-500 focus:ring-offset-zinc-900"
          />
          <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
            Hide asset flips
          </span>
        </label>
      </fieldset>

      {/* Quality Filters */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">
          Quality
        </legend>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">
            Min. reviews: {filters.minReviews}
          </label>
          <input
            type="range"
            min={0}
            max={500}
            step={10}
            value={filters.minReviews}
            onChange={(e) => update({ minReviews: Number(e.target.value) })}
            className="w-full accent-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">
            Min. rating: {filters.minRating}%
          </label>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={filters.minRating}
            onChange={(e) => update({ minRating: Number(e.target.value) })}
            className="w-full accent-blue-500"
          />
        </div>
      </fieldset>

      {/* Price Filters */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">
          Price
        </legend>

        <div className="flex gap-2 flex-wrap">
          {(['all', 'free', 'paid'] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => update({ priceFilter: opt })}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filters.priceFilter === opt
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={filters.demoOnly}
            onChange={(e) => update({ demoOnly: e.target.checked })}
            className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-zinc-900"
          />
          <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
            Demo available only
          </span>
        </label>
      </fieldset>
    </div>
  )
}
