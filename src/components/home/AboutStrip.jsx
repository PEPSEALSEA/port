import { motion } from 'motion/react'
import { profile } from '../../data/profile'
import { fadeUp, prefersReducedMotion, staggerChildren } from '../../lib/motion'

export default function AboutStrip() {
  const reduce = prefersReducedMotion()

  return (
    <section className="about-strip" aria-labelledby="about-heading">
      <div className="container about-strip-inner">
        <motion.div
          className="about-copy"
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={staggerChildren}
        >
          <motion.h2 id="about-heading" className="section-title" variants={fadeUp}>
            About
          </motion.h2>
          <motion.p className="about-text" variants={fadeUp}>
            {profile.about}
          </motion.p>
          <motion.a
            className="text-link"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
          >
            github.com/{profile.githubUsername}
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
