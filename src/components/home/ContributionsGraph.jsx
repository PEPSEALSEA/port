import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { profile } from '../../data/profile'
import { fadeUp, prefersReducedMotion, staggerChildren } from '../../lib/motion'
import {
  fetchContributionYear,
  getMonthLabels,
  groupContributionsByWeek,
} from '../../utils/contributions'

const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

function cellTitle(day) {
  if (!day) return undefined
  const date = new Date(`${day.date}T00:00:00`).toLocaleDateString('en', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const countLabel = day.count === 1 ? '1 contribution' : `${day.count} contributions`
  return `${countLabel} on ${date}`
}

export default function ContributionsGraph() {
  const reduce = prefersReducedMotion()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [total, setTotal] = useState(0)
  const [days, setDays] = useState([])

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await fetchContributionYear(profile.githubUsername)
        if (cancelled) return
        setTotal(data.total)
        setDays(data.contributions)
        setError(null)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const weeks = useMemo(() => groupContributionsByWeek(days), [days])
  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks])

  return (
    <section className="contrib-section" aria-labelledby="contrib-heading">
      <div className="container">
        <motion.div
          className="contrib-head"
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerChildren}
        >
          <motion.p className="section-eyebrow" variants={fadeUp}>
            GitHub activity
          </motion.p>
          <motion.h2 id="contrib-heading" className="section-title" variants={fadeUp}>
            Contributions in the last year.
          </motion.h2>
          <motion.p className="section-lead" variants={fadeUp}>
            {loading
              ? 'Loading contribution graph…'
              : error
                ? 'Could not load the contribution graph right now.'
                : `${total.toLocaleString()} contributions in the last year on GitHub.`}
          </motion.p>
        </motion.div>

        <motion.div
          className="contrib-panel"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {loading ? (
            <div className="contrib-skeleton" aria-hidden="true" />
          ) : error ? (
            <p className="contrib-error">
              {error}{' '}
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                View profile on GitHub
              </a>
            </p>
          ) : (
            <>
              <div className="contrib-scroll">
                <div className="contrib-calendar" role="img" aria-label="GitHub contribution calendar">
                  <div className="contrib-months" style={{ gridTemplateColumns: `repeat(${weeks.length}, 11px)` }}>
                    {monthLabels.map((month) => (
                      <span
                        key={`${month.label}-${month.weekIndex}`}
                        className="contrib-month"
                        style={{ gridColumn: month.weekIndex + 1 }}
                      >
                        {month.label}
                      </span>
                    ))}
                  </div>

                  <div className="contrib-body">
                    <div className="contrib-days" aria-hidden="true">
                      {DAY_LABELS.map((label, index) => (
                        <span key={`day-${index}`}>{label}</span>
                      ))}
                    </div>
                    <div className="contrib-weeks">
                      {weeks.map((week, weekIndex) => (
                        <div className="contrib-week" key={`week-${weekIndex}`}>
                          {week.map((day, dayIndex) =>
                            day ? (
                              <span
                                key={day.date}
                                className={`contrib-cell level-${day.level}`}
                                title={cellTitle(day)}
                              />
                            ) : (
                              <span
                                key={`empty-${weekIndex}-${dayIndex}`}
                                className="contrib-cell empty"
                                aria-hidden="true"
                              />
                            ),
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="contrib-footer">
                <a
                  className="contrib-profile-link"
                  href={`${profile.github}?tab=overview`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
                <div className="contrib-legend" aria-hidden="true">
                  <span>Less</span>
                  <span className="contrib-cell level-0" />
                  <span className="contrib-cell level-1" />
                  <span className="contrib-cell level-2" />
                  <span className="contrib-cell level-3" />
                  <span className="contrib-cell level-4" />
                  <span>More</span>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
