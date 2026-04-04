import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, TrendingUp, Crown, PanelRightClose, PanelRightOpen } from 'lucide-react'
import { fetchTopManga } from '@/lib/api'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'

function useMangaLeaderboard() {
  return useQuery({
    queryKey: ['mangaLeaderboard'],
    queryFn: () => fetchTopManga(1, 10),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

const RANK_STYLES = [
  { bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', text: 'text-yellow-400', icon: <Crown className="w-3 h-3" /> },
  { bg: 'bg-zinc-400/15', border: 'border-zinc-400/30', text: 'text-zinc-300', icon: null },
  { bg: 'bg-amber-700/20', border: 'border-amber-700/40', text: 'text-amber-500', icon: null },
]

function RankBadge({ rank }) {
  const style = rank <= 3 ? RANK_STYLES[rank - 1] : null
  return (
    <span
      className={`
        inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-black shrink-0
        border
        ${style
          ? `${style.bg} ${style.border} ${style.text}`
          : 'bg-muted/50 border-border text-muted-foreground'}
      `}
    >
      {rank <= 3 && style?.icon ? style.icon : rank}
    </span>
  )
}

function LeaderboardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2.5 p-2">
          <Skeleton className="w-6 h-6 rounded-full shrink-0" />
          <Skeleton className="w-9 h-12 rounded shrink-0" />
          <div className="flex-1 flex flex-col gap-1.5">
            <Skeleton className="h-3 w-full rounded" />
            <Skeleton className="h-3 w-2/3 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function MangaLeaderboard() {
  const { data, isLoading, isError } = useMangaLeaderboard()
  const mangaList = data?.data ?? []
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (isCollapsed) {
    return (
      <aside className="w-12 shrink-0 hidden xl:flex flex-col gap-0 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-hidden h-full">
        <div 
          onClick={() => setIsCollapsed(false)}
          className="flex-1 flex flex-col items-center gap-4 py-4 bg-card border border-border rounded-l-xl cursor-pointer hover:bg-accent/50 transition-colors"
          title="Expand Leaderboard"
        >
          <PanelRightOpen className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
          <div className="h-px w-6 bg-border mx-auto shrink-0" />
          <Trophy className="w-4 h-4 text-yellow-400 icon-glow-sm shrink-0" />
          <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-2 whitespace-nowrap">
            Top Leaderboard
          </span>
        </div>
      </aside>
    )
  }

  return (
    <aside className="w-[380px] shrink-0 hidden xl:flex flex-col gap-0 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-hidden">
      {/* Header */}
      <div 
        className="flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-tl-xl border-b-0 cursor-pointer hover:bg-accent/30 transition-colors select-none"
        onClick={() => setIsCollapsed(true)}
        title="Collapse Leaderboard"
      >
        <Trophy className="w-4 h-4 text-yellow-400 icon-glow-sm" />
        <h3 className="text-sm font-bold text-foreground tracking-wide uppercase">Top Leaderboard</h3>
        <Badge variant="secondary" className="ml-auto mr-1 text-[10px] px-1.5 py-0">
          <TrendingUp className="w-2.5 h-2.5 mr-1" />
          Live
        </Badge>
        <PanelRightClose className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
      </div>

      {/* Divider line with gradient */}
      <div className="h-px bg-gradient-to-r from-purple-500/60 via-pink-500/40 to-transparent mx-0" />

      {/* List */}
      <div className="flex-1 overflow-y-auto bg-card border border-t-0 border-border rounded-bl-xl p-3 scrollbar-thin">
        {isLoading ? (
          <LeaderboardSkeleton />
        ) : isError ? (
          <p className="text-xs text-muted-foreground text-center py-6">Failed to load leaderboard</p>
        ) : (
          <ol className="flex flex-col gap-1">
            {mangaList.map((manga, idx) => (
              <motion.li
                key={manga.mal_id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.3 }}
              >
                <a
                  href={manga.url}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    group flex items-center gap-2.5 p-2 rounded-lg
                    hover:bg-accent/60 transition-all duration-200
                    border border-transparent hover:border-border
                  "
                >
                  {/* Rank */}
                  <RankBadge rank={idx + 1} />

                  {/* Thumbnail */}
                  <div className="w-9 h-12 rounded overflow-hidden shrink-0 bg-muted border border-border">
                    <img
                      src={manga.images?.webp?.small_image_url || manga.images?.jpg?.small_image_url}
                      alt={manga.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {manga.title_english || manga.title}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-[10px] font-bold text-yellow-400">
                        {manga.score?.toFixed(1) ?? 'N/A'}
                      </span>
                      <span className="text-[10px] text-muted-foreground ml-1">
                        · {(manga.members / 1000).toFixed(0)}K
                      </span>
                    </div>
                  </div>
                </a>
              </motion.li>
            ))}
          </ol>
        )}
      </div>

      {/* Footer note */}
      <p className="text-[10px] text-muted-foreground text-center mt-2 px-2">
        Powered by Jikan · Updates every 10 min
      </p>
    </aside>
  )
}
