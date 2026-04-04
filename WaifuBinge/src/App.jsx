import { BrowserRouter, Routes, Route, useOutletContext } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
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
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeWithContext />} />
          <Route path="watchlist" element={<Watchlist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
