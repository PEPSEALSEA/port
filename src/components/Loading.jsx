export default function Loading({ hidden }) {
  return (
    <div id="loading" className={`loading-overlay${hidden ? ' hidden' : ''}`} role="status" aria-live="polite">
      <div className="loading-card">
        <div className="spinner" aria-hidden="true" />
        <p className="loading-text">Fetching repositories from GitHub</p>
        <p className="loading-mono">api.github.com/users/PEPSEALSEA/repos</p>
      </div>
    </div>
  )
}
