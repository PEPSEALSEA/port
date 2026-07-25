export function formatRelativeTime(dateInput) {
  if (!dateInput) return null

  const date = new Date(dateInput)
  if (Number.isNaN(date.getTime())) return null

  const seconds = Math.round((date.getTime() - Date.now()) / 1000)
  const absSeconds = Math.abs(seconds)
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'always' })

  if (absSeconds < 60) return rtf.format(seconds, 'second')
  const minutes = Math.round(seconds / 60)
  if (Math.abs(minutes) < 60) return rtf.format(minutes, 'minute')
  const hours = Math.round(minutes / 60)
  if (Math.abs(hours) < 24) return rtf.format(hours, 'hour')
  const days = Math.round(hours / 24)
  if (Math.abs(days) < 30) return rtf.format(days, 'day')
  const months = Math.round(days / 30)
  if (Math.abs(months) < 12) return rtf.format(months, 'month')
  const years = Math.round(months / 12)
  return rtf.format(years, 'year')
}

export function getLatestPushedAt(repos) {
  let latest = null
  for (const repo of repos) {
    const value = repo.pushed_at || repo.updated_at
    if (!value) continue
    if (!latest || new Date(value) > new Date(latest)) latest = value
  }
  return latest
}
