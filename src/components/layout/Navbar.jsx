import { NavLink, Link } from 'react-router-dom'

export default function Navbar({ theme, onToggleTheme, menuOpen, onToggleMenu, onCloseMenu }) {
  return (
    <>
      <nav className="nav-bar" aria-label="Main navigation">
        <div className="nav-inner">
          <Link to="/" className="nav-brand" aria-label="PEPSEALSEA home" onClick={onCloseMenu}>
            <span className="nav-brand-mark" aria-hidden="true">
              PS
            </span>
            PEPSEALSEA
          </Link>
          <div className="nav-links">
            <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              Home
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              Projects
            </NavLink>
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
              className="nav-cta nav-cta-ghost"
              type="button"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={onToggleTheme}
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
            <button
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
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        aria-label="Mobile navigation"
      >
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-link mobile-nav-link${isActive ? ' active' : ''}`}
          onClick={onCloseMenu}
        >
          Home
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => `nav-link mobile-nav-link${isActive ? ' active' : ''}`}
          onClick={onCloseMenu}
        >
          Projects
        </NavLink>
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
