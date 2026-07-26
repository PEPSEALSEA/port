import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-bar">
        <Link to="/" className="footer-name">
          PEPSEALSEA
        </Link>
        <nav className="footer-nav" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <a href="https://github.com/PEPSEALSEA" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </nav>
        <p className="footer-copy">© PEPSEALSEA</p>
      </div>
    </footer>
  )
}
