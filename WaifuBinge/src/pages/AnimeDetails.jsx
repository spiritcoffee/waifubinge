import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Tv, Clock, Trophy, PlayCircle, ArrowLeft, Bookmark, BookmarkCheck, Calendar, Users, Heart, Loader2 } from 'lucide-react'
import { useAnimeById } from '@/hooks/useAnime'
import { useWatchlistStore } from '@/store/watchlistStore'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

function DetailItem({ icon: Icon, label, value }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground flex items-center gap-1.5 uppercase tracking-wider font-semibold">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}

function AnimeDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isError } = useAnimeById(id)
  
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore()
  
  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-muted-foreground animate-pulse">Loading anime details...</p>
        </div>
      </div>
    )
  }

  if (isError || !data?.data) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <span className="text-2xl">⚠️</span>
        </div>
        <p className="text-xl font-semibold">Anime not found</p>
        <Button variant="outline" onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    )
  }

  const anime = data.data
  const inWatchlist = isInWatchlist(anime.mal_id)

  const handleWatchlist = () => {
    if (inWatchlist) {
      removeFromWatchlist(anime.mal_id)
      toast.info(`Removed "${anime.title}" from watchlist`, { icon: '🗑️' })
    } else {
      addToWatchlist(anime)
      toast.success(`Added "${anime.title}" to watchlist!`, { icon: '✅' })
    }
  }

  const imageUrl = anime.images?.webp?.large_image_url || anime.images?.jpg?.large_image_url || '/placeholder.webp'
  const bannerUrl = anime.trailer?.images?.maximum_image_url || imageUrl

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background pb-12"
    >
      {/* Hero Banner Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        {/* Blurred Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={bannerUrl}
            alt="Banner"
            className="w-full h-full object-cover blur-md opacity-30 transform scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-10 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-[25vh] md:-mt-[30vh]">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left Column (Poster & CTA) */}
          <div className="flex-shrink-0 w-[240px] md:w-[300px] mx-auto md:mx-0 flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl overflow-hidden shadow-2xl border border-border/50 aspect-[3/4] relative group"
            >
              <img
                src={imageUrl}
                alt={anime.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                 {anime.trailer?.url && (
                    <Button 
                      variant="default" 
                      className="gap-2 rounded-full"
                      onClick={() => window.open(anime.trailer.url, '_blank')}
                    >
                      <PlayCircle className="w-4 h-4" /> Watch Trailer
                    </Button>
                 )}
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="flex flex-col gap-3"
            >
              <Button
                size="lg"
                variant={inWatchlist ? "secondary" : "default"}
                onClick={handleWatchlist}
                className={cn("w-full gap-2 font-semibold transition-all", inWatchlist ? "bg-secondary text-secondary-foreground" : "")}
              >
                {inWatchlist ? (
                  <><BookmarkCheck className="w-5 h-5" /> In Watchlist</>
                ) : (
                  <><Bookmark className="w-5 h-5" /> Add to Watchlist</>
                )}
              </Button>
            </motion.div>
          </div>

          {/* Right Column (Info) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 flex flex-col gap-6"
          >
            {/* Title & Badges */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-24">
                {anime.status && (
                   <Badge variant="outline" className={cn("bg-background/50 backdrop-blur-md text-xs font-semibold py-1", anime.status === 'Currently Airing' ? 'text-green-400 border-green-500/30' : 'text-blue-400 border-blue-500/30')}>
                     {anime.status}
                   </Badge>
                )}
                {anime.type && (
                  <Badge variant="secondary" className="bg-background/50 backdrop-blur-md">
                    <Tv className="w-3 h-3 mr-1" /> {anime.type}
                  </Badge>
                )}
                {anime.rating && (
                  <Badge variant="secondary" className="bg-background/50 backdrop-blur-md">
                    {anime.rating.split(' ')[0]}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight drop-shadow-lg">
                {anime.title}
              </h1>
              {anime.title_english && anime.title_english !== anime.title && (
                <h2 className="text-xl md:text-2xl text-muted-foreground font-medium">
                  {anime.title_english}
                </h2>
              )}
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-card border border-border/50 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-500/10 rounded-xl">
                  <Star className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{anime.score || 'N/A'}</div>
                  <div className="text-xs text-muted-foreground">Score</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <Trophy className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{anime.rank ? `#${anime.rank}` : 'N/A'}</div>
                  <div className="text-xs text-muted-foreground">Rank</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-pink-500/10 rounded-xl">
                  <Heart className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{anime.popularity ? `#${anime.popularity}` : 'N/A'}</div>
                  <div className="text-xs text-muted-foreground">Popularity</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-500/10 rounded-xl">
                  <Users className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{anime.members ? (anime.members / 1000).toFixed(1) + 'K' : 'N/A'}</div>
                  <div className="text-xs text-muted-foreground">Members</div>
                </div>
              </div>
            </div>

            {/* Genres */}
            {anime.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {anime.genres.map(genre => (
                  <Badge key={genre.mal_id} className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 text-sm px-3 py-1">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Synopsis */}
            {anime.synopsis && (
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  Synopsis
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-wrap opacity-90">
                  {anime.synopsis}
                </p>
              </div>
            )}

            {/* Detailed Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 p-6 rounded-2xl bg-muted/30 border border-border/50">
              <DetailItem icon={Tv} label="Episodes" value={anime.episodes} />
              <DetailItem icon={Clock} label="Duration" value={anime.duration} />
              <DetailItem icon={Calendar} label="Aired" value={anime.aired?.string} />
              <DetailItem icon={Tv} label="Season" value={anime.season && anime.year ? `${anime.season} ${anime.year}` : null} />
              <DetailItem icon={Tv} label="Studios" value={anime.studios?.map(s => s.name).join(', ')} />
              <DetailItem icon={Star} label="Source" value={anime.source} />
            </div>

            {/* Background Note */}
            {anime.background && (
               <div className="mt-4 p-5 rounded-2xl bg-card border border-border/50">
                 <h4 className="font-bold mb-2">Background Info</h4>
                 <p className="text-sm text-muted-foreground italic">{anime.background}</p>
               </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.main>
  )
}

export default AnimeDetails
