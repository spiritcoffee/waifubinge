import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Star, BookOpen, Bookmark, BookmarkCheck } from 'lucide-react'
import { toast } from 'sonner'
import { useWatchlistStore } from '@/store/watchlistStore'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

function MangaCard({ manga }) {
  const navigate = useNavigate()
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore()
  const inWatchlist = isInWatchlist(manga.mal_id)

  const handleWatchlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWatchlist) {
      removeFromWatchlist(manga.mal_id)
      toast.info(`Removed "${manga.title}" from readlist`, {
        icon: '🗑️',
      })
    } else {
      addToWatchlist(manga)
      toast.success(`Added "${manga.title}" to readlist!`, {
        icon: '✅',
      })
    }
  }

  const score = manga.score ? manga.score.toFixed(1) : 'N/A'
  const chapters = manga.chapters ?? '?'
  const imageUrl =
    manga.images?.webp?.image_url ||
    manga.images?.jpg?.image_url ||
    '/placeholder.webp'

  const scoreColor =
    score >= 8 ? 'text-green-400' : score >= 6 ? 'text-yellow-400' : 'text-muted-foreground'

  return (
    <motion.div
      onClick={() => navigate(`/manga/${manga.mal_id}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative flex flex-col rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-colors duration-300 shadow-md hover:shadow-xl hover:shadow-primary/10 cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={manga.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src =
              'https://via.placeholder.com/225x318/111116/8b5cf6?text=No+Image'
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Score badge top-right */}
        <div className="absolute top-2 right-2">
          <Badge
            variant="secondary"
            className="flex items-center gap-1 bg-black/80 text-yellow-400 border-yellow-500/30 backdrop-blur-sm"
          >
            <Star className="w-3 h-3 fill-yellow-400" />
            <span className="text-xs font-bold">{score}</span>
          </Badge>
        </div>

        {/* Rank badge top-left */}
        {manga.rank && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-primary/80 backdrop-blur-sm text-xs">
              #{manga.rank}
            </Badge>
          </div>
        )}

        {/* Watchlist button - hover reveal */}
        <motion.button
          onClick={handleWatchlist}
          whileTap={{ scale: 0.9 }}
          className={cn(
            'absolute bottom-3 right-3 p-2 rounded-full backdrop-blur-sm border transition-all duration-200',
            inWatchlist
              ? 'bg-primary/90 border-primary text-white'
              : 'bg-black/70 border-border text-muted-foreground hover:border-primary hover:text-primary',
            'opacity-0 group-hover:opacity-100'
          )}
          title={inWatchlist ? 'Remove from readlist' : 'Add to readlist'}
        >
          {inWatchlist ? (
            <BookmarkCheck className="w-4 h-4" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
        </motion.button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 p-3 flex-1">
        <h3
          className="text-sm font-semibold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors"
          title={manga.title}
        >
          {manga.title}
        </h3>

        <div className="flex items-center gap-2 mt-auto pt-1">
          {/* Chapters */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <BookOpen className="w-3 h-3" />
            <span>{chapters} chp</span>
          </div>

          {/* Score */}
          <div className={cn('flex items-center gap-1 text-xs font-medium ml-auto', scoreColor)}>
            <Star className="w-3 h-3 fill-current" />
            <span>{score}</span>
          </div>
        </div>

        {/* Genres */}
        {manga.genres && manga.genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {manga.genres.slice(0, 2).map((genre) => (
              <Badge
                key={genre.mal_id}
                variant="outline"
                className="text-[10px] px-1.5 py-0 h-4 text-muted-foreground"
              >
                {genre.name}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Watchlist indicator strip */}
      {inWatchlist && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-l-xl" />
      )}
    </motion.div>
  )
}

export default MangaCard
