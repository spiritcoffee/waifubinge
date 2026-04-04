import { useQuery } from '@tanstack/react-query'
import { searchAnime } from '@/lib/api'

/**
 * Hook to search anime by query string
 * @param {string} query
 * @param {number} page
 */
export function useSearch(query, page = 1) {
  return useQuery({
    queryKey: ['searchAnime', query, page],
    queryFn: () => searchAnime(query, page, 24),
    enabled: query.trim().length >= 2,
    staleTime: 1000 * 60 * 2, // 2 minutes
    keepPreviousData: true,
  })
}
