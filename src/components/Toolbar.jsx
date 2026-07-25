export default function Toolbar({
  searchQuery,
  onSearchChange,
  languages,
  counts,
  activeLanguage,
  onLanguageChange,
  totalCount,
}) {
  return (
    <section className="toolbar" aria-label="Search and filter">
      <div className="toolbar-inner">
        <div className="search-row">
          <div className="search-wrapper">
            <span className="search-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M10.5 10.5L14 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <input
              id="search-input"
              className="form-input"
              type="search"
              placeholder="Search repositories by name or description…"
              aria-label="Search repositories"
              autoComplete="off"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <p className="filter-label">Filter by language</p>
        <div id="filter-tabs" className="filter-tabs" role="tablist" aria-label="Language filters">
          <button
            className={`tab-ghost${activeLanguage === 'All' ? ' active' : ''}`}
            role="tab"
            aria-selected={activeLanguage === 'All'}
            type="button"
            onClick={() => onLanguageChange('All')}
          >
            All<span className="tab-count">{totalCount}</span>
          </button>
          {languages.map((lang) => (
            <button
              key={lang}
              className={`tab-ghost${activeLanguage === lang ? ' active' : ''}`}
              role="tab"
              aria-selected={activeLanguage === lang}
              type="button"
              onClick={() => onLanguageChange(lang)}
            >
              {lang}
              <span className="tab-count">{counts[lang]}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
