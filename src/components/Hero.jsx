export default function Hero() {
  return (
    <section className="hero-band" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-badge">
          <span className="hero-badge-dot" aria-hidden="true" />
          Open source portfolio
        </div>
        <h1 id="hero-title" className="hero-title">
          GitHub projects, organized.
        </h1>
        <p className="hero-lead">
          A curated dashboard of repositories, grouped by language and ranked by activity. Built for
          developers who ship.
        </p>
        <div className="hero-actions">
          <a href="#repositories" className="btn btn-lg btn-primary">
            Browse projects
          </a>
          <a
            href="https://github.com/PEPSEALSEA"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-secondary"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
