import { useQuery } from '@tanstack/react-query'
import { fetchTopManga, fetchMangaByGenre, fetchMangaById } from '@/lib/api'

/**
 * Hook to fetch top manga
 * @param {number} page
 */
export function useTopManga(page = 1) {
  return useQuery({
    queryKey: ['topManga', page],
    queryFn: () => fetchTopManga(page, 24),
    staleTime: 1000 * 60 * 5, // 5 minutes
    keepPreviousData: true,
  })
}

/**
 * Hook to fetch manga by genre (mood-based)
 * @param {string|null} genreIds - comma-separated genre IDs or null
 * @param {number} page
 */
export function useMangaByMood(genreIds, page = 1) {
  return useQuery({
    queryKey: ['mangaByMood', genreIds, page],
    queryFn: () => fetchMangaByGenre(genreIds, page, 24),
    enabled: !!genreIds,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  })
}

/**
 * Hook to fetch manga by ID
 * @param {number|string} id 
 */
export function useMangaById(id) {
  return useQuery({
    queryKey: ['mangaById', id],
    queryFn: () => fetchMangaById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })
}
