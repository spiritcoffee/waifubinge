import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useWatchlistStore = create(
  persist(
    (set, get) => ({
      watchlist: [],

      addToWatchlist: (item, type = 'anime') => {
        const itemWithType = { ...item, mediaType: type }
        const exists = get().watchlist.find((a) => a.mal_id === item.mal_id && (a.mediaType === type || (!a.mediaType && type === 'anime')))
        if (!exists) {
          set((state) => ({ watchlist: [...state.watchlist, itemWithType] }))
        }
      },

      removeFromWatchlist: (mal_id, type = 'anime') => {
        set((state) => ({
          watchlist: state.watchlist.filter((a) => !(a.mal_id === mal_id && (a.mediaType === type || (!a.mediaType && type === 'anime')))),
        }))
      },

      isInWatchlist: (mal_id, type = 'anime') => {
        return get().watchlist.some((a) => a.mal_id === mal_id && (a.mediaType === type || (!a.mediaType && type === 'anime')))
      },

      clearWatchlist: () => set({ watchlist: [] }),
    }),
    {
      name: 'waifubinge-watchlist',
    }
  )
)
