import { useEffect, useRef } from 'react'

export function useReveal(deps = []) {
  const containerRef = useRef(null)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )

    const frame = requestAnimationFrame(() => {
      root.querySelectorAll('.language-section, .repo-card').forEach((el) => observer.observe(el))
    })

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, deps)

  return containerRef
}
