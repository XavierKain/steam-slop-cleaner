export interface SteamGame {
  appid: number
  name: string
  header_image: string
  developer?: string
  publisher?: string
  tags: SteamTag[]
  review_score?: number
  review_count?: number
  is_free: boolean
  price?: string
  has_demo: boolean
}

export interface SteamTag {
  id: number
  name: string
}

export interface Filters {
  hideAI: boolean
  hideAssetFlip: boolean
  minReviews: number
  minRating: number
  priceFilter: 'all' | 'free' | 'paid'
  demoOnly: boolean
}

export const TAG_IDS = {
  AI_GENERATED: 493,
  ASSET_FLIP: 1773,
} as const

export const DEFAULT_FILTERS: Filters = {
  hideAI: true,
  hideAssetFlip: true,
  minReviews: 0,
  minRating: 0,
  priceFilter: 'all',
  demoOnly: false,
}
