import { motion, AnimatePresence } from 'framer-motion'
import { Bookmark, Trash2, BookmarkX } from 'lucide-react'
import { toast } from 'sonner'
import AnimeCard from '@/components/AnimeCard'
import MangaCard from '@/components/MangaCard'
import { Button } from '@/components/ui/button'
import { useWatchlistStore } from '@/store/watchlistStore'
import { Link } from 'react-router-dom'

function Watchlist() {
  const { watchlist, clearWatchlist } = useWatchlistStore()

  const animeList = watchlist.filter((item) => {
    if (item.mediaType === 'anime') return true
    if (item.mediaType === 'manga') return false
    // Legacy support: if missing mediaType, guess from Jikan API structure
    if (item.chapters !== undefined || item.volumes !== undefined) return false
    if (item.type && ['Manga', 'Novel', 'Light Novel', 'One-shot', 'Doujinshi', 'Manhwa', 'Manhua', 'OEL'].includes(item.type)) return false
    return true
  })

  const mangaList = watchlist.filter((item) => {
    if (item.mediaType === 'manga') return true
    if (item.mediaType === 'anime') return false
    // Legacy support: if missing mediaType, guess from Jikan API structure
    if (item.chapters !== undefined || item.volumes !== undefined) return true
    if (item.type && ['Manga', 'Novel', 'Light Novel', 'One-shot', 'Doujinshi', 'Manhwa', 'Manhua', 'OEL'].includes(item.type)) return true
    return false
  })

  const handleClearAll = () => {
    clearWatchlist()
    toast.info('Watchlist cleared', { icon: '🗑️' })
  }

  return (
    <main className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Bookmark className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Watchlist</h1>
            <p className="text-sm text-muted-foreground">
              {watchlist.length} {watchlist.length === 1 ? 'anime' : 'titles'} saved
            </p>
          </div>
        </div>

        {watchlist.length > 0 && (
          <Button
            id="clear-watchlist"
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {watchlist.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-32 gap-5 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <BookmarkX className="w-10 h-10 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xl font-semibold text-foreground">Your watchlist is empty</p>
              <p className="text-muted-foreground mt-1">
                Browse anime and hit the bookmark icon to save titles here.
              </p>
            </div>
            <Link to="/">
              <Button id="browse-anime" className="gap-2">
                Browse Anime
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-12">
            {animeList.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">Anime</h2>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                >
                  <AnimatePresence>
                    {animeList.map((anime) => (
                      <motion.div
                        key={`anime-${anime.mal_id}`}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <AnimeCard anime={anime} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </section>
            )}

            {mangaList.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">Manga</h2>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                >
                  <AnimatePresence>
                    {mangaList.map((manga) => (
                      <motion.div
                        key={`manga-${manga.mal_id}`}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MangaCard manga={manga} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </section>
            )}
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default Watchlist
