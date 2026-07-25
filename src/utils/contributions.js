export async function fetchContributionYear(username) {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
  )
  if (!response.ok) throw new Error(`Contributions API error: ${response.status}`)
  const data = await response.json()
  return {
    total: data.total?.lastYear ?? 0,
    contributions: Array.isArray(data.contributions) ? data.contributions : [],
  }
}

export function groupContributionsByWeek(days) {
  if (!days.length) return []

  const weeks = []
  let week = []
  const first = new Date(`${days[0].date}T00:00:00`)
  const pad = first.getDay()

  for (let i = 0; i < pad; i += 1) week.push(null)

  days.forEach((day) => {
    week.push(day)
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  })

  if (week.length) {
    while (week.length < 7) week.push(null)
    weeks.push(week)
  }

  return weeks
}

export function getMonthLabels(weeks) {
  const labels = []
  let lastMonth = -1

  weeks.forEach((week, weekIndex) => {
    const day = week.find((cell) => cell)
    if (!day) return
    const month = new Date(`${day.date}T00:00:00`).getMonth()
    if (month !== lastMonth) {
      labels.push({
        weekIndex,
        label: new Date(`${day.date}T00:00:00`).toLocaleString('en', { month: 'short' }),
      })
      lastMonth = month
    }
  })

  return labels
}
