import { useEffect, useMemo, useState } from 'react'
import EmptyState from './components/EmptyState'
import ErrorCard from './components/ErrorCard'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Loading from './components/Loading'
import Navbar from './components/Navbar'
import Repositories from './components/Repositories'
import Stats from './components/Stats'
import Toolbar from './components/Toolbar'
import { getLanguagePriority } from './data/languageConfig'
import { groupReposByLanguage } from './utils/repos'
import { applyTheme, getInitialTheme, persistTheme } from './utils/theme'
import { getLatestPushedAt } from './utils/time'

export default function App() {
  const [theme, setTheme] = useState(() => getInitialTheme())
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reposByLanguage, setReposByLanguage] = useState({})
  const [sortedLanguages, setSortedLanguages] = useState([])
  const [stats, setStats] = useState(null)
  const [lastCommitAt, setLastCommitAt] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeLanguage, setActiveLanguage] = useState('All')

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    let cancelled = false

    async function fetchRepositories() {
      try {
        const response = await fetch(
          'https://api.github.com/users/PEPSEALSEA/repos?per_page=100&sort=updated',
        )
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`)
        const repos = await response.json()
        if (cancelled) return

        const grouped = groupReposByLanguage(repos)
        const languages = Object.keys(grouped.reposByLanguage).sort((a, b) => {
          const priorityA = getLanguagePriority(a)
          const priorityB = getLanguagePriority(b)
          if (priorityA !== priorityB) return priorityB - priorityA
          return grouped.reposByLanguage[b].length - grouped.reposByLanguage[a].length
        })

        setReposByLanguage(grouped.reposByLanguage)
        setSortedLanguages(languages)
        setStats({
          totalRepos: grouped.totalRepos,
          languageCount: grouped.languageCount,
          totalStars: grouped.totalStars,
          totalForks: grouped.totalForks,
        })
        setLastCommitAt(getLatestPushedAt(repos))
        setError(null)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchRepositories()
    return () => {
      cancelled = true
    }
  }, [])

  const totalCount = useMemo(
    () => Object.values(reposByLanguage).reduce((sum, repos) => sum + repos.length, 0),
    [reposByLanguage],
  )

  const languageCounts = useMemo(() => {
    const counts = {}
    sortedLanguages.forEach((lang) => {
      counts[lang] = reposByLanguage[lang]?.length || 0
    })
    return counts
  }, [reposByLanguage, sortedLanguages])

  const sections = useMemo(() => {
    const languagesToShow =
      activeLanguage === 'All'
        ? sortedLanguages
        : sortedLanguages.filter((lang) => lang === activeLanguage)

    const query = searchQuery.trim().toLowerCase()
    const filtered = []

    languagesToShow.forEach((language) => {
      const repos = (reposByLanguage[language] || []).filter((repo) => {
        if (!query) return true
        return (repo.name + ' ' + (repo.description || '')).toLowerCase().includes(query)
      })
      if (repos.length > 0) filtered.push({ language, repos })
    })

    return filtered.sort((a, b) => {
      const priorityA = getLanguagePriority(a.language)
      const priorityB = getLanguagePriority(b.language)
      if (priorityA !== priorityB) return priorityB - priorityA
      return b.repos.length - a.repos.length
    })
  }, [activeLanguage, reposByLanguage, searchQuery, sortedLanguages])

  function handleToggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    persistTheme(nextTheme)
  }

  function handleClearFilters() {
    setSearchQuery('')
    setActiveLanguage('All')
  }

  return (
    <>
      <div className="mesh-gradient" aria-hidden="true" />
      <Loading hidden={!loading} />

      <div className="page">
        <Navbar
          theme={theme}
          onToggleTheme={handleToggleTheme}
          menuOpen={menuOpen}
          onToggleMenu={() => setMenuOpen((open) => !open)}
          onCloseMenu={() => setMenuOpen(false)}
        />

        <main className={`main-content${loading ? ' hidden-until-load' : ' loaded'}`}>
          <Hero lastCommitAt={lastCommitAt} />
          <div className="container">
            <Toolbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              languages={sortedLanguages}
              counts={languageCounts}
              activeLanguage={activeLanguage}
              onLanguageChange={setActiveLanguage}
              totalCount={totalCount}
            />
            <ErrorCard error={error} />
            {!error ? <Stats stats={stats} /> : null}
            {!error ? <Repositories sections={sections} /> : null}
            <EmptyState visible={!error && !loading && sections.length === 0} onClear={handleClearFilters} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
