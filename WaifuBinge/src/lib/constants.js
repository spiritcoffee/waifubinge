import { Flame, Smile, Frown, Heart, Coffee, Ghost, HelpCircle, Swords } from 'lucide-react'

/**
 * Mood → Genre mapping
 * Jikan API genre IDs: https://api.jikan.moe/v4/genres/anime
 */
export const MOOD_GENRES = {
  excited: {
    label: 'Excited',
    icon: Flame,
    name: 'Excited',
    description: 'High energy, hype action',
    genreIds: '1,2',   // Action, Adventure
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    textColor: 'text-orange-400',
  },
  happy: {
    label: 'Happy',
    icon: Smile,
    name: 'Happy',
    description: 'Fun, uplifting comedy',
    genreIds: '4',     // Comedy
    color: 'from-yellow-400 to-orange-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    textColor: 'text-yellow-400',
  },
  sad: {
    label: 'Sad',
    icon: Frown,
    name: 'Sad',
    description: 'Emotional, tear-jerking dramas',
    genreIds: '8',     // Drama
    color: 'from-blue-400 to-indigo-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
  },
  romantic: {
    label: 'Romantic',
    icon: Heart,
    name: 'Romantic',
    description: 'Love stories & romance',
    genreIds: '22',    // Romance
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
    textColor: 'text-pink-400',
  },
  chill: {
    label: 'Chill',
    icon: Coffee,
    name: 'Chill',
    description: 'Relaxing slice of life',
    genreIds: '36',    // Slice of Life
    color: 'from-green-400 to-teal-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    textColor: 'text-green-400',
  },
  scared: {
    label: 'Scared',
    icon: Ghost,
    name: 'Scared',
    description: 'Horror & supernatural thrills',
    genreIds: '14',    // Horror
    color: 'from-purple-600 to-gray-800',
    bgColor: 'bg-purple-900/20',
    borderColor: 'border-purple-700/30',
    textColor: 'text-purple-400',
  },
  curious: {
    label: 'Curious',
    icon: HelpCircle,
    name: 'Curious',
    description: 'Mind-bending sci-fi & mystery',
    genreIds: '7,24',  // Mystery, Sci-Fi
    color: 'from-cyan-400 to-blue-600',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    textColor: 'text-cyan-400',
  },
  epic: {
    label: 'Epic',
    icon: Swords,
    name: 'Epic',
    description: 'Fantasy battles & grand adventures',
    genreIds: '10,2',  // Fantasy, Adventure
    color: 'from-violet-500 to-purple-700',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/30',
    textColor: 'text-violet-400',
  },
}

export const SORT_OPTIONS = [
  { value: 'score', label: 'Top Rated' },
  { value: 'popularity', label: 'Most Popular' },
  { value: 'rank', label: 'By Rank' },
  { value: 'members', label: 'Most Members' },
]

export const ANIME_RATINGS = {
  'G': 'All Ages',
  'PG': 'Children',
  'PG-13': 'Teens 13+',
  'R-17+': 'Violence & Profanity',
  'R+': 'Mild Nudity',
  'Rx': 'Hentai',
}
