import { BrowserRouter, Routes, Route, useOutletContext } from 'react-router-dom'
import Layout from './Layout'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Manga from './pages/Manga'
import Watchlist from './pages/Watchlist'

// Wrapper to pass searchQuery from Layout context into Home
function HomeWithContext() {
  const { searchQuery } = useOutletContext()
  return <Home searchQuery={searchQuery} />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="/anime" element={<HomeWithContext />} />
          <Route path="/manga" element={<Manga />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
