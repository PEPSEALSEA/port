export default function ErrorCard({ error }) {
  if (!error) return null

  return (
    <div id="error" className="error-card" role="alert">
      <h3>Unable to fetch repositories</h3>
      <p>
        <strong>Error:</strong> {error}
      </p>
      <p>Try these alternatives:</p>
      <ul>
        <li>Open from a local web server</li>
        <li>Use a web hosting service</li>
        <li>
          <a href="https://github.com/PEPSEALSEA" target="_blank" rel="noopener noreferrer">
            Visit GitHub profile
          </a>
        </li>
      </ul>
      <button
        type="button"
        className="btn btn-sm btn-primary"
        style={{ marginTop: 16 }}
        onClick={() => window.location.reload()}
      >
        Try again
      </button>
    </div>
  )
}
