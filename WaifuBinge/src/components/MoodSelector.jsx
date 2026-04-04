import { motion } from 'framer-motion'
import { MOOD_GENRES } from '@/lib/constants'
import { cn } from '@/lib/utils'

const moodKeys = Object.keys(MOOD_GENRES)

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
}

function MoodSelector({ activeMood, onMoodSelect }) {
  return (
    <section className="w-full">
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-xl font-bold text-foreground">🎭 How are you feeling?</h2>
        {activeMood && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => onMoodSelect(null)}
            className="text-xs text-muted-foreground hover:text-foreground border border-border rounded-full px-3 py-1 transition-colors hover:border-primary"
          >
            Clear mood ×
          </motion.button>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2"
      >
        {moodKeys.map((key) => {
          const mood = MOOD_GENRES[key]
          const isActive = activeMood === key

          return (
            <motion.button
              key={key}
              id={`mood-${key}`}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onMoodSelect(isActive ? null : key)}
              className={cn(
                'relative flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all duration-200',
                isActive
                  ? `${mood.bgColor} ${mood.borderColor} ${mood.textColor} shadow-lg`
                  : 'bg-secondary border-border text-muted-foreground hover:border-primary/50 hover:bg-accent hover:text-foreground'
              )}
            >
              {/* Active pulse indicator */}
              {isActive && (
                <motion.div
                  layoutId="mood-active"
                  className={cn(
                    'absolute inset-0 rounded-xl border-2 opacity-60',
                    mood.borderColor
                  )}
                />
              )}

              <span className="text-2xl leading-none">{mood.emoji}</span>
              <span className="text-xs font-semibold leading-tight">{mood.name}</span>
              <span
                className={cn(
                  'text-[10px] leading-tight hidden lg:block',
                  isActive ? 'opacity-80' : 'text-muted-foreground/60'
                )}
              >
                {mood.description}
              </span>
            </motion.button>
          )
        })}
      </motion.div>
    </section>
  )
}

export default MoodSelector
