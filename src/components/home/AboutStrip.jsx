import { motion } from 'motion/react'
import { profile } from '../../data/profile'
import { fadeUp, prefersReducedMotion, staggerChildren } from '../../lib/motion'

export default function AboutStrip() {
  const reduce = prefersReducedMotion()

  return (
    <section className="about-strip" aria-labelledby="about-heading">
      <div className="container about-strip-grid">
        <motion.div
          className="about-photo"
          initial={reduce ? false : { opacity: 0, scale: 1.04 }}
          whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="about-photo-plane" aria-hidden="true" />
          <span className="about-photo-label">{profile.photoLabel}</span>
        </motion.div>

        <motion.div
          className="about-copy"
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={staggerChildren}
        >
          <motion.p className="section-eyebrow" variants={fadeUp}>
            About
          </motion.p>
          <motion.h2 id="about-heading" className="section-title" variants={fadeUp}>
            Built for developers who ship.
          </motion.h2>
          <motion.p className="about-text" variants={fadeUp}>
            {profile.about}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
