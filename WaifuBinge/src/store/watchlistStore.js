import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useWatchlistStore = create(
  persist(
    (set, get) => ({
      watchlist: [],

      addToWatchlist: (anime) => {
        const exists = get().watchlist.find((a) => a.mal_id === anime.mal_id)
        if (!exists) {
          set((state) => ({ watchlist: [...state.watchlist, anime] }))
        }
      },

      removeFromWatchlist: (mal_id) => {
        set((state) => ({
          watchlist: state.watchlist.filter((a) => a.mal_id !== mal_id),
        }))
      },

      isInWatchlist: (mal_id) => {
        return get().watchlist.some((a) => a.mal_id === mal_id)
      },

      clearWatchlist: () => set({ watchlist: [] }),
    }),
    {
      name: 'waifubinge-watchlist',
    }
  )
)
