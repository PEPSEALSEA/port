export function hasLiveSite(repo) {
  const webLanguages = ['HTML', 'CSS', 'JavaScript', 'TypeScript']
  const webKeywords = ['website', 'portfolio', 'landing', 'page', 'site', 'web', 'frontend', 'ui', 'dashboard']
  return (
    webLanguages.includes(repo.language) ||
    webKeywords.some((keyword) => (repo.name + ' ' + (repo.description || '')).toLowerCase().includes(keyword)) ||
    repo.has_pages
  )
}

export function getLiveSiteUrl(repo) {
  return `https://pepsealsea.github.io/${repo.name}/`
}

export function groupReposByLanguage(repos) {
  const reposByLanguage = {}
  let totalRepos = 0
  let totalStars = 0
  let totalForks = 0
  const languages = new Set()

  repos.forEach((repo) => {
    const language = repo.language || 'Other'
    languages.add(language)
    reposByLanguage[language] = reposByLanguage[language] || []
    reposByLanguage[language].push(repo)
    totalRepos++
    totalStars += repo.stargazers_count
    totalForks += repo.forks_count
  })

  return {
    reposByLanguage,
    totalRepos,
    totalStars,
    totalForks,
    languageCount: languages.size,
  }
}
