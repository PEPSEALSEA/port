import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import EmptyState from '../components/EmptyState'
import ErrorCard from '../components/ErrorCard'
import Loading from '../components/Loading'
import Repositories from '../components/Repositories'
import Stats from '../components/Stats'
import Toolbar from '../components/Toolbar'
import { getLanguagePriority } from '../data/languageConfig'
import { pageFade, prefersReducedMotion } from '../lib/motion'
import { groupReposByLanguage } from '../utils/repos'
import { getLatestPushedAt, formatRelativeTime } from '../utils/time'

export default function ProjectsPage() {
  const reduce = prefersReducedMotion()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reposByLanguage, setReposByLanguage] = useState({})
  const [sortedLanguages, setSortedLanguages] = useState([])
  const [stats, setStats] = useState(null)
  const [lastCommitAt, setLastCommitAt] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeLanguage, setActiveLanguage] = useState('All')

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

  const lastCommitRelative = formatRelativeTime(lastCommitAt)

  return (
    <motion.div
      className="page-view"
      initial={reduce ? false : 'initial'}
      animate="animate"
      exit="exit"
      variants={pageFade}
    >
      <div className="mesh-gradient" aria-hidden="true" />
      <Loading hidden={!loading} />

      <section className="projects-hero" aria-labelledby="projects-title">
        <div className="container">
          <p className="section-eyebrow">GitHub</p>
          <h1 id="projects-title" className="projects-title">
            Repositories, organized.
          </h1>
          <p className="projects-lead">
            Live repos from GitHub, grouped by language and ranked by activity.{' '}
            <Link to="/">Back to intro</Link>
          </p>
          {lastCommitRelative ? (
            <p
              className="hero-last-commit"
              title={lastCommitAt ? new Date(lastCommitAt).toLocaleString() : undefined}
            >
              Last commit {lastCommitRelative}
            </p>
          ) : null}
        </div>
      </section>

      <div className={`container projects-body${loading ? ' hidden-until-load' : ' loaded'}`}>
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
        <EmptyState
          visible={!error && !loading && sections.length === 0}
          onClear={() => {
            setSearchQuery('')
            setActiveLanguage('All')
          }}
        />
      </div>
    </motion.div>
  )
}
