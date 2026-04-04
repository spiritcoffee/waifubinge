import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { PlayCircle, BookOpen } from 'lucide-react'

// Import images
import animeBg from '@/assets/pngs/ZeroTwo3.png'
import mangaBg from '@/assets/pngs/Miku.png'

const Landing = () => {
  const [hovered, setHovered] = useState(null)
  const navigate = useNavigate()

  const handleDragStart = (e) => e.preventDefault()

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-[#0A0A0A] selection:bg-pink-500/30">
      {/* Brand Overlay */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none drop-shadow-2xl">
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-white drop-shadow-2xl flex items-center justify-center gap-1">
          Waifu<span className="text-pink-500">Binge</span>
        </h1>
      </div>

      {/* Anime Half */}
      <motion.div
        className="relative h-full cursor-pointer flex items-center justify-center group overflow-hidden"
        initial={{ flex: 1 }}
        animate={{ flex: hovered === 'anime' ? 1.5 : hovered === 'manga' ? 0.5 : 1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        onMouseEnter={() => setHovered('anime')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => navigate('/anime')}
      >
        {/* Background Image */}
        <motion.img
          src={animeBg}
          alt="Anime"
          onDragStart={handleDragStart}
          className="absolute inset-0 w-full h-full object-cover object-top origin-[center_20%]"
          animate={{
            scale: hovered === 'anime' ? 1.05 : 1,
            filter: hovered === 'anime' ? 'brightness(0.9) saturate(1.2)' : hovered === 'manga' ? 'brightness(0.2) grayscale(0.5)' : 'brightness(0.6)'
          }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-pink-900/10 mix-blend-overlay pointer-events-none" />

        {/* Content */}
        <motion.div 
          className="relative z-10 flex flex-col items-center justify-center text-white p-4 text-center mt-[20vh]"
          animate={{
            y: hovered === 'anime' ? -10 : 0,
            scale: hovered === 'anime' ? 1.02 : 1
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="mb-6 p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-pink-500/20 group-hover:border-pink-500/50 shadow-[0_0_40px_rgba(236,72,153,0)] group-hover:shadow-[0_0_40px_rgba(236,72,153,0.3)]">
            <PlayCircle className="w-12 h-12 text-pink-400 group-hover:text-pink-300 transition-colors" />
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-widest drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            Anime
          </h2>
          
          <motion.div 
            className="mt-8 px-8 py-3 rounded-full border border-pink-500/30 bg-pink-500/10 backdrop-blur-md text-pink-100 font-bold uppercase tracking-widest text-sm shadow-xl"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: hovered === 'anime' ? 1 : 0, y: hovered === 'anime' ? 0 : 10 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore Shows
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Manga Half */}
      <motion.div
        className="relative h-full cursor-pointer flex items-center justify-center group overflow-hidden"
        initial={{ flex: 1 }}
        animate={{ flex: hovered === 'manga' ? 1.5 : hovered === 'anime' ? 0.5 : 1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        onMouseEnter={() => setHovered('manga')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => navigate('/manga')}
      >
        {/* Background Image */}
        <motion.img
          src={mangaBg}
          alt="Manga"
          onDragStart={handleDragStart}
          className="absolute inset-0 w-full h-full object-cover object-[center_15%] origin-[center_15%]"
          animate={{
            scale: hovered === 'manga' ? 1.05 : 1,
            filter: hovered === 'manga' ? 'brightness(0.9) saturate(1.2)' : hovered === 'anime' ? 'brightness(0.2) grayscale(0.5)' : 'brightness(0.6)'
          }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-cyan-900/10 mix-blend-overlay pointer-events-none" />

        {/* Content */}
        <motion.div 
          className="relative z-10 flex flex-col items-center justify-center text-white p-4 text-center mt-[20vh]"
          animate={{
            y: hovered === 'manga' ? -10 : 0,
            scale: hovered === 'manga' ? 1.02 : 1
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="mb-6 p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 shadow-[0_0_40px_rgba(6,182,212,0)] group-hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]">
            <BookOpen className="w-12 h-12 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-widest drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            Manga
          </h2>
          
          <motion.div 
            className="mt-8 px-8 py-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md text-cyan-100 font-bold uppercase tracking-widest text-sm shadow-xl"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: hovered === 'manga' ? 1 : 0, y: hovered === 'manga' ? 0 : 10 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Read Chapters
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Central Separator Line */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10 pointer-events-none z-20 
                      transform -translate-x-1/2 mix-blend-overlay" />
    </div>
  )
}

export default Landing
