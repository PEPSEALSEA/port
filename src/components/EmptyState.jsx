export default function EmptyState({ visible, onClear }) {
  if (!visible) return null

  return (
    <div id="empty-state" className="empty-state" role="status">
      <div className="empty-state-icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <h3>No repositories found</h3>
      <p>Try adjusting your search query or selecting a different language filter.</p>
      <button id="clear-filters" className="btn btn-sm btn-secondary" type="button" onClick={onClear}>
        Clear filters
      </button>
    </div>
  )
}
