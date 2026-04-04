import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const getMediaType = (item, defaultType = 'anime') => {
  if (item.mediaType) return item.mediaType
  if (item.chapters !== undefined || item.volumes !== undefined) return 'manga'
  if (item.type && ['Manga', 'Novel', 'Light Novel', 'One-shot', 'Doujinshi', 'Manhwa', 'Manhua', 'OEL'].includes(item.type)) return 'manga'
  return defaultType
}

export const useWatchlistStore = create(
  persist(
    (set, get) => ({
      watchlist: [],

      addToWatchlist: (item, type = 'anime') => {
        const generatedType = getMediaType(item, type)
        const itemWithType = { ...item, mediaType: generatedType }
        const exists = get().watchlist.find((a) => a.mal_id === item.mal_id && getMediaType(a, 'anime') === generatedType)
        if (!exists) {
          set((state) => ({ watchlist: [...state.watchlist, itemWithType] }))
        }
      },

      removeFromWatchlist: (mal_id, type = 'anime') => {
        set((state) => ({
          watchlist: state.watchlist.filter((a) => !(a.mal_id === mal_id && getMediaType(a, 'anime') === type)),
        }))
      },

      isInWatchlist: (mal_id, type = 'anime') => {
        return get().watchlist.some((a) => a.mal_id === mal_id && getMediaType(a, 'anime') === type)
      },

      clearWatchlist: () => set({ watchlist: [] }),
    }),
    {
      name: 'waifubinge-watchlist',
    }
  )
)
