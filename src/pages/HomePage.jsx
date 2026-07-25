import { motion } from 'motion/react'
import AboutStrip from '../components/home/AboutStrip'
import IntroHero from '../components/home/IntroHero'
import WorkShowcase from '../components/home/WorkShowcase'
import { pageFade, prefersReducedMotion } from '../lib/motion'

export default function HomePage() {
  const reduce = prefersReducedMotion()

  return (
    <motion.div
      className="page-view"
      initial={reduce ? false : 'initial'}
      animate="animate"
      exit="exit"
      variants={pageFade}
    >
      <IntroHero />
      <WorkShowcase />
      <AboutStrip />
    </motion.div>
  )
}
