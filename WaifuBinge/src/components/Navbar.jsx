import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Bookmark, X, Menu, Tv, Sparkles } from 'lucide-react'
import { useWatchlistStore } from '@/store/watchlistStore'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function Navbar({ searchQuery, onSearchChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { watchlist } = useWatchlistStore()
  const inputRef = useRef(null)

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (location.pathname !== '/' && searchQuery.trim().length > 0) {
      navigate('/')
    }
  }

  const clearSearch = () => {
    onSearchChange('')
    inputRef.current?.focus()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            onClick={() => onSearchChange('')}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:block">
              Waifu<span className="text-primary">Binge</span>
            </span>
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-xl"
          >
            <div
              className={cn(
                'relative flex items-center rounded-full border transition-all duration-200',
                isFocused
                  ? 'border-primary bg-accent shadow-lg shadow-primary/10'
                  : 'border-border bg-secondary'
              )}
            >
              <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
              <input
                ref={inputRef}
                id="search-anime"
                type="search"
                placeholder="Search anime..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value)
                  if (location.pathname !== '/' && e.target.value.trim().length > 0) {
                    navigate('/')
                  }
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full bg-transparent pl-9 pr-9 py-2 text-sm text-foreground focus:outline-none"
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Watchlist button */}
            <Link to="/watchlist">
              <Button
                id="open-watchlist"
                variant="outline"
                size="sm"
                className="relative hidden sm:flex items-center gap-2"
              >
                <Bookmark className="w-4 h-4" />
                <span>Watchlist</span>
                {watchlist.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-xs text-white flex items-center justify-center font-bold"
                  >
                    {watchlist.length > 99 ? '99+' : watchlist.length}
                  </motion.span>
                )}
              </Button>
            </Link>

            {/* Mobile watchlist icon */}
            <Link to="/watchlist" className="sm:hidden relative">
              <Button variant="ghost" size="icon">
                <Bookmark className="w-4 h-4" />
              </Button>
              {watchlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-[10px] text-white flex items-center justify-center font-bold">
                  {watchlist.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
