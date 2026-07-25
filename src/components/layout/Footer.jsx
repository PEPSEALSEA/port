import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <Link to="/" className="nav-brand" aria-label="PEPSEALSEA home">
              <span className="nav-brand-mark" aria-hidden="true">
                PS
              </span>
              PEPSEALSEA
            </Link>
            <p className="footer-brand-text">
              Developer portfolio showcasing products, experiments, and open-source work on GitHub.
            </p>
          </div>
          <div>
            <p className="footer-col-title">Navigate</p>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/projects">Projects</Link>
              </li>
              <li>
                <a href="https://github.com/PEPSEALSEA" target="_blank" rel="noopener noreferrer">
                  GitHub Profile
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Resources</p>
            <ul className="footer-links">
              <li>
                <a href="https://docs.github.com/en/rest" target="_blank" rel="noopener noreferrer">
                  GitHub API
                </a>
              </li>
              <li>
                <a href="https://pages.github.com/" target="_blank" rel="noopener noreferrer">
                  GitHub Pages
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Connect</p>
            <ul className="footer-links">
              <li>
                <a href="https://github.com/PEPSEALSEA" target="_blank" rel="noopener noreferrer">
                  github.com/PEPSEALSEA
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© PEPSEALSEA · Built with React + Vite</p>
        </div>
      </div>
    </footer>
  )
}
