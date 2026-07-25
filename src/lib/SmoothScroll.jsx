import { useEffect } from 'react'
import Lenis from 'lenis'
import { prefersReducedMotion } from './motion'

export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    })

    let frame = 0
    function raf(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return children
}
