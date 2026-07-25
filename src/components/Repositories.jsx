import { languageConfig } from '../data/languageConfig'
import { useReveal } from '../hooks/useReveal'
import { getLiveSiteUrl, hasLiveSite } from '../utils/repos'
import { formatRelativeTime } from '../utils/time'

export default function Repositories({ sections }) {
  const containerRef = useReveal([sections])

  if (!sections.length) {
    return null
  }

  return (
    <section id="repositories" aria-label="Repositories by language" ref={containerRef}>
      {sections.map(({ language, repos }) => {
        const config = languageConfig[language] || languageConfig.Other
        return (
          <div className="language-section" key={language}>
            <div className="language-header">
              <div className="language-icon" style={{ background: config.color }}>
                {config.icon}
              </div>
              <div className="language-title">{language}</div>
              <div className="badge-secondary">{repos.length} repos</div>
            </div>
            <div className="repos-grid">
              {repos.map((repo) => (
                <article className="repo-card" key={repo.id}>
                  <div className="repo-name">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      {repo.name}
                    </a>
                    {hasLiveSite(repo) ? (
                      <span className="live-badge">
                        <span className="live-dot" aria-hidden="true" />
                        Live
                      </span>
                    ) : null}
                  </div>
                  <p className="repo-description">
                    {repo.description || 'No description available'}
                  </p>
                  <div className="repo-stats">
                    <div className="stat">
                      <span aria-hidden="true">★</span>
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="stat">
                      <span aria-hidden="true">⑂</span>
                      <span>{repo.forks_count}</span>
                    </div>
                    <div
                      className="stat"
                      title={new Date(repo.pushed_at || repo.updated_at).toLocaleString()}
                    >
                      <span aria-hidden="true">↻</span>
                      <span>
                        {formatRelativeTime(repo.pushed_at || repo.updated_at) ||
                          new Date(repo.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="repo-buttons">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-secondary"
                    >
                      View code
                    </a>
                    {hasLiveSite(repo) ? (
                      <a
                        href={getLiveSiteUrl(repo)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary"
                      >
                        Live site
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}
