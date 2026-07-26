import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { profile } from '../../data/profile'
import { fadeUp, prefersReducedMotion, staggerChildren } from '../../lib/motion'

export default function IntroHero() {
  const reduce = prefersReducedMotion()

  return (
    <section className="intro-hero" aria-labelledby="intro-brand">
      <div className="intro-hero-horizon" aria-hidden="true" />
      <div className="container intro-hero-inner">
        <motion.div
          className="intro-hero-copy"
          initial={reduce ? false : 'hidden'}
          animate="visible"
          variants={staggerChildren}
        >
          <motion.p className="intro-eyebrow" variants={fadeUp}>
            {profile.role}
          </motion.p>
          <motion.h1 id="intro-brand" className="intro-brand" variants={fadeUp}>
            {profile.name}
          </motion.h1>
          <motion.p className="intro-headline" variants={fadeUp}>
            {profile.headline}
          </motion.p>
          <motion.p className="intro-lead" variants={fadeUp}>
            {profile.lead}
          </motion.p>
          <motion.div className="intro-actions" variants={fadeUp}>
            <Link to="/projects" className="btn btn-lg btn-primary">
              View projects
            </Link>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
