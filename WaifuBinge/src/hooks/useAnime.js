import { useQuery } from '@tanstack/react-query'
import { fetchTopAnime, fetchAnimeByGenre } from '@/lib/api'

/**
 * Hook to fetch top anime
 * @param {number} page
 */
export function useTopAnime(page = 1) {
  return useQuery({
    queryKey: ['topAnime', page],
    queryFn: () => fetchTopAnime(page, 24),
    staleTime: 1000 * 60 * 5, // 5 minutes
    keepPreviousData: true,
  })
}

/**
 * Hook to fetch anime by genre (mood-based)
 * @param {string|null} genreIds - comma-separated genre IDs or null
 * @param {number} page
 */
export function useAnimeByMood(genreIds, page = 1) {
  return useQuery({
    queryKey: ['animeByMood', genreIds, page],
    queryFn: () => fetchAnimeByGenre(genreIds, page, 24),
    enabled: !!genreIds,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  })
}
