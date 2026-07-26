import { motion } from 'motion/react'
import { workItems } from '../../data/work'
import { fadeUp, prefersReducedMotion, staggerChildren } from '../../lib/motion'

export default function WorkShowcase() {
  const reduce = prefersReducedMotion()

  return (
    <section className="work-showcase" aria-labelledby="work-heading">
      <div className="container">
        <motion.div
          className="work-showcase-head"
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerChildren}
        >
          <motion.h2 id="work-heading" className="section-title" variants={fadeUp}>
            Selected work
          </motion.h2>
          <motion.p className="section-lead" variants={fadeUp}>
            A few pieces I’ve been shaping lately.
          </motion.p>
        </motion.div>

        <motion.ul
          className="work-list"
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren}
        >
          {workItems.map((item) => (
            <motion.li className="work-row" key={item.id} variants={fadeUp}>
              <div className="work-row-top">
                <h3 className="work-row-title">{item.title}</h3>
                <span className="work-row-meta">
                  {item.tag} · {item.year}
                </span>
              </div>
              <p className="work-row-summary">{item.summary}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
