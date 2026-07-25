import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import SmoothScroll from './lib/SmoothScroll'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import { applyTheme, getInitialTheme, persistTheme } from './utils/theme'

export default function App() {
  const location = useLocation()
  const [theme, setTheme] = useState(() => getInitialTheme())
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  function handleToggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    persistTheme(nextTheme)
  }

  return (
    <SmoothScroll>
      <div className="page">
        <Navbar
          theme={theme}
          onToggleTheme={handleToggleTheme}
          menuOpen={menuOpen}
          onToggleMenu={() => setMenuOpen((open) => !open)}
          onCloseMenu={() => setMenuOpen(false)}
        />

        <main className="main-content loaded">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route
                path="*"
                element={
                  <motion.div className="container not-found" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h1 className="section-title">Page not found.</h1>
                    <p className="section-lead">That route does not exist. Use Home or Projects in the nav.</p>
                  </motion.div>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  )
}
