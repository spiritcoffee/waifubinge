import { BookOpen } from 'lucide-react'

function Manga() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <BookOpen className="w-10 h-10 text-primary" />
      </div>
      <h1 className="text-4xl font-black tracking-tight text-foreground">
        Manga Section
      </h1>
      <p className="text-xl text-muted-foreground max-w-md">
        The Manga reading / discovery feature is currently under development. Stay tuned!
      </p>
    </div>
  )
}

export default Manga
