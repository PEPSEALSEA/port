export default function Stats({ stats }) {
  if (!stats) return null

  return (
    <section id="stats-overview" className="stats-overview" aria-label="Repository statistics">
      <div className="stat-card">
        <div className="stat-number">{stats.totalRepos}</div>
        <div className="stat-label">Repositories</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">{stats.languageCount}</div>
        <div className="stat-label">Languages</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">{stats.totalStars}</div>
        <div className="stat-label">Total Stars</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">{stats.totalForks}</div>
        <div className="stat-label">Total Forks</div>
      </div>
    </section>
  )
}
