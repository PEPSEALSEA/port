const THEME_COOKIE = 'portfolio_theme'

export function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

export function getCookie(name) {
  const row = document.cookie.split('; ').find((item) => item.startsWith(`${name}=`))
  return row ? decodeURIComponent(row.split('=')[1]) : null
}

export function getInitialTheme() {
  const savedTheme = getCookie(THEME_COOKIE)
  if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  const metaTheme = document.querySelector('meta[name="theme-color"]')
  if (metaTheme) {
    metaTheme.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#fafafa')
  }
}

export function persistTheme(theme) {
  setCookie(THEME_COOKIE, theme, 365)
}
