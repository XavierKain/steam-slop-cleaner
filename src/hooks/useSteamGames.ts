import { useQuery } from '@tanstack/react-query'
import type { SteamGame, SteamTag } from '../types'

interface FeaturedApp {
  id: number
  name: string
  header_image: string
  large_capsule_image?: string
  small_capsule_image?: string
  discounted: boolean
  discount_percent: number
  original_price?: number
  final_price?: number
}

interface FeaturedCategory {
  id: string
  name: string
  items?: FeaturedApp[]
}

interface AppDetailsResponse {
  [appid: string]: {
    success: boolean
    data?: {
      steam_appid: number
      name: string
      is_free: boolean
      header_image: string
      developers?: string[]
      publishers?: string[]
      price_overview?: {
        final_formatted: string
      }
      demos?: { appid: number }[]
      categories?: { id: number; description: string }[]
      genres?: { id: string; description: string }[]
    }
  }
}

async function fetchFeaturedGames(): Promise<number[]> {
  const res = await fetch('/api/steam/featuredcategories/?cc=us&l=en')
  if (!res.ok) throw new Error('Failed to fetch featured categories')
  const data = await res.json()

  const appIds = new Set<number>()
  for (const key of Object.keys(data)) {
    const category = data[key] as FeaturedCategory
    if (category?.items) {
      for (const item of category.items) {
        appIds.add(item.id)
      }
    }
  }
  return Array.from(appIds)
}

async function fetchAppDetails(appids: number[]): Promise<SteamGame[]> {
  // Steam API limits to ~20 apps per request in practice
  const batchSize = 20
  const games: SteamGame[] = []

  for (let i = 0; i < appids.length; i += batchSize) {
    const batch = appids.slice(i, i + batchSize)
    const results = await Promise.all(
      batch.map(async (appid) => {
        try {
          const res = await fetch(`/api/steam/appdetails?appids=${appid}&cc=us&l=en`)
          if (!res.ok) return null
          const data: AppDetailsResponse = await res.json()
          const info = data[String(appid)]
          if (!info?.success || !info.data) return null

          const d = info.data
          const tags: SteamTag[] = [
            ...(d.genres?.map((g) => ({ id: parseInt(g.id), name: g.description })) ?? []),
            ...(d.categories?.map((c) => ({ id: c.id, name: c.description })) ?? []),
          ]

          const game: SteamGame = {
            appid: d.steam_appid,
            name: d.name,
            header_image: d.header_image,
            developer: d.developers?.[0],
            publisher: d.publishers?.[0],
            tags,
            is_free: d.is_free,
            price: d.price_overview?.final_formatted ?? (d.is_free ? 'Free' : undefined),
            has_demo: (d.demos?.length ?? 0) > 0,
          }
          return game
        } catch {
          return null
        }
      })
    )
    games.push(...results.filter((g): g is SteamGame => g !== null))
  }

  return games
}

async function fetchTagsForApps(appids: number[]): Promise<Map<number, number[]>> {
  const tagMap = new Map<number, number[]>()
  const batchSize = 20

  for (let i = 0; i < appids.length; i += batchSize) {
    const batch = appids.slice(i, i + batchSize)
    await Promise.all(
      batch.map(async (appid) => {
        try {
          const res = await fetch(
            `https://store.steampowered.com/api/appdetails?appids=${appid}&filters=basic`,
            { mode: 'no-cors' }
          )
          if (!res.ok) return
          const data = await res.json()
          const info = data[String(appid)]
          if (info?.success && info.data?.genres) {
            tagMap.set(
              appid,
              info.data.genres.map((g: { id: string }) => parseInt(g.id))
            )
          }
        } catch {
          // skip failures
        }
      })
    )
  }

  return tagMap
}

export function useSteamGames() {
  return useQuery({
    queryKey: ['steam-games'],
    queryFn: async () => {
      const appIds = await fetchFeaturedGames()
      const games = await fetchAppDetails(appIds)
      // Also try to get Steam user tags (for AI/Asset Flip detection)
      const tagIds = await fetchTagsForApps(appIds).catch(() => new Map<number, number[]>())
      // Merge tag IDs into games
      return games.map((game) => {
        const extraTagIds = tagIds.get(game.appid) ?? []
        const extraTags: SteamTag[] = extraTagIds
          .filter((id) => !game.tags.some((t) => t.id === id))
          .map((id) => ({ id, name: `Tag ${id}` }))
        return { ...game, tags: [...game.tags, ...extraTags] }
      })
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  })
}
