export default function Navbar({ theme, onToggleTheme, menuOpen, onToggleMenu, onCloseMenu }) {
  return (
    <>
      <nav className="nav-bar" aria-label="Main navigation">
        <div className="nav-inner">
          <a href="#" className="nav-brand" aria-label="PEPSEALSEA home">
            <span className="nav-brand-mark" aria-hidden="true">
              PS
            </span>
            PEPSEALSEA
          </a>
          <div className="nav-links">
            <a href="#repositories" className="nav-link">
              Projects
            </a>
            <a href="#stats-overview" className="nav-link">
              Stats
            </a>
            <a
              href="https://github.com/PEPSEALSEA"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              GitHub
            </a>
          </div>
          <div className="nav-actions">
            <button
              id="theme-toggle"
              className="nav-cta nav-cta-ghost"
              type="button"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={onToggleTheme}
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
            <a
              href="https://github.com/PEPSEALSEA"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta nav-cta-primary"
            >
              View Profile
            </a>
            <button
              id="nav-hamburger"
              className="nav-hamburger"
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={onToggleMenu}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M2 4h12M2 8h12M2 12h12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        aria-label="Mobile navigation"
      >
        <a href="#repositories" className="nav-link mobile-nav-link" onClick={onCloseMenu}>
          Projects
        </a>
        <a href="#stats-overview" className="nav-link mobile-nav-link" onClick={onCloseMenu}>
          Stats
        </a>
        <a
          href="https://github.com/PEPSEALSEA"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
          onClick={onCloseMenu}
        >
          GitHub
        </a>
      </div>
    </>
  )
}
