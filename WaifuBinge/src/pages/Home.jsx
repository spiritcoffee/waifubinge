import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, TrendingUp, AlertCircle, RefreshCw, ChevronLeft, ChevronRight, Flame } from 'lucide-react'
import AnimeCard from '@/components/AnimeCard'
import MoodSelector from '@/components/MoodSelector'
import { LoadingGrid } from '@/components/LoadingSkeleton'
import { Button } from '@/components/ui/button'
import AnimeLeaderboard from '@/components/AnimeLeaderboard'
import { useTopAnime, useAnimeByMood } from '@/hooks/useAnime'
import { useSearch } from '@/hooks/useSearch'
import { MOOD_GENRES } from '@/lib/constants'

function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-destructive" />
      </div>
      <div>
        <p className="text-lg font-semibold text-foreground">Oops, something went wrong</p>
        <p className="text-sm text-muted-foreground mt-1">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      )}
    </div>
  )
}

function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <span className="text-6xl">🔍</span>
      <div>
        <p className="text-lg font-semibold text-foreground">No results found</p>
        <p className="text-sm text-muted-foreground mt-1">{message}</p>
      </div>
    </div>
  )
}

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <Button
        id="prev-page"
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="gap-1"
      >
        <ChevronLeft className="w-4 h-4" />
        Prev
      </Button>
      <span className="text-sm text-muted-foreground px-4">
        Page <span className="font-semibold text-foreground">{page}</span> of{' '}
        <span className="font-semibold text-foreground">{Math.min(totalPages, 10)}</span>
      </span>
      <Button
        id="next-page"
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page >= Math.min(totalPages, 10)}
        className="gap-1"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}

function Home({ searchQuery }) {
  const [activeMood, setActiveMood] = useState(null)
  const [page, setPage] = useState(1)

  const isSearchMode = searchQuery.trim().length >= 2
  const isMoodMode = !!activeMood && !isSearchMode

  const genreIds = activeMood ? MOOD_GENRES[activeMood]?.genreIds : null

  const topAnimeQuery = useTopAnime(page)
  const moodQuery = useAnimeByMood(genreIds, page)
  const searchQuery_ = useSearch(searchQuery, page)

  // Resolve the active query
  const activeQuery = isSearchMode
    ? searchQuery_
    : isMoodMode
    ? moodQuery
    : topAnimeQuery

  const animeList = activeQuery.data?.data ?? []
  const pagination = activeQuery.data?.pagination

  const handleMoodChange = (mood) => {
    setActiveMood(mood)
    setPage(1)
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Section heading
  const sectionTitle = useMemo(() => {
    if (isSearchMode) return `Search: "${searchQuery}"`
    if (activeMood) {
      const Icon = MOOD_GENRES[activeMood].icon
      return (
        <span className="flex items-center gap-2">
          <Icon className="w-5 h-5 icon-glow" />
          {MOOD_GENRES[activeMood].name} Vibes
        </span>
      )
    }
    return (
      <span className="flex items-center gap-2">
        <Flame className="w-5 h-5 text-orange-500 icon-glow" /> Top Anime
      </span>
    )
  }, [isSearchMode, searchQuery, activeMood])

  return (
    <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:pr-0 py-8">
      <div className="flex gap-5 items-start">
        {/* Main content */}
        <main className="flex-1 min-w-0 flex flex-col gap-10">
          {/* Hero */}
          {!isSearchMode && (
            <motion.section
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-6"
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Mood-Powered Anime Discovery
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-3">
                Find Anime for{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Your Mood
                </span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Powered by the Jikan API · {(pagination?.items?.total ?? 0).toLocaleString()}+ titles
              </p>
            </motion.section>
          )}

          {/* Mood Selector */}
          {!isSearchMode && (
            <MoodSelector activeMood={activeMood} onMoodSelect={handleMoodChange} />
          )}

          {/* Results section */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">{sectionTitle}</h2>
              {activeQuery.isLoading && (
                <div className="ml-auto w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              )}
            </div>

            <AnimatePresence mode="wait">
              {activeQuery.isLoading ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <LoadingGrid count={24} />
                </motion.div>
              ) : activeQuery.isError ? (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ErrorState
                    message={
                      activeQuery.error?.response?.status === 429
                        ? 'Rate limit hit — please wait a moment and try again.'
                        : 'Failed to fetch anime. Check your connection.'
                    }
                    onRetry={activeQuery.refetch}
                  />
                </motion.div>
              ) : animeList.length === 0 ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <EmptyState message={`No anime found for "${searchQuery || activeMood}"`} />
                </motion.div>
              ) : (
                <motion.div
                  key={`${activeMood}-${searchQuery}-${page}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                >
                  {animeList.map((anime, idx) => (
                    <motion.div
                      key={anime.mal_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(idx * 0.03, 0.5) }}
                    >
                      <AnimeCard anime={anime} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {!activeQuery.isLoading && !activeQuery.isError && animeList.length > 0 && (
              <Pagination
                page={page}
                totalPages={pagination?.last_visible_page ?? 1}
                onPageChange={handlePageChange}
              />
            )}
          </section>
        </main>

        {/* Right Sidebar — Leaderboard */}
        <AnimeLeaderboard />
      </div>
    </div>
  )
}

export default Home
