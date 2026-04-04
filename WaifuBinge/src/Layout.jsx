import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import Navbar from '@/components/Navbar'

function Layout() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="flex-1">
        <Outlet context={{ searchQuery, setSearchQuery }} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <span>
            Built with ❤️ using{' '}
            <a
              href="https://jikan.moe"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              Jikan API
            </a>
          </span>
          <span>WaifuBinge © {new Date().getFullYear()}</span>
        </div>
      </footer>

      <Toaster
        position="bottom-right"
        theme="dark"
        richColors
        toastOptions={{
          style: {
            background: '#111116',
            border: '1px solid #27272a',
            color: '#fafafa',
          },
        }}
      />
    </div>
  )
}

export default Layout
