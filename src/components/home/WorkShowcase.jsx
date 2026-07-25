import { useLayoutEffect, useRef } from 'react'
import { motion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { workItems } from '../../data/work'
import { fadeUp, prefersReducedMotion, staggerChildren } from '../../lib/motion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function WorkShowcase() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const reduce = prefersReducedMotion()

  useGSAP(
    () => {
      if (reduce || !sectionRef.current || !trackRef.current) return

      const cards = trackRef.current.querySelectorAll('.work-panel')
      gsap.fromTo(
        cards,
        { y: 48, opacity: 0.35, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 20%',
            scrub: 0.6,
          },
        },
      )

      cards.forEach((card) => {
        const media = card.querySelector('.work-panel-media')
        if (!media) return
        gsap.to(media, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    },
    { scope: sectionRef, dependencies: [reduce] },
  )

  useLayoutEffect(() => {
    ScrollTrigger.refresh()
  }, [])

  return (
    <section className="work-showcase" ref={sectionRef} aria-labelledby="work-heading">
      <div className="container">
        <motion.div
          className="work-showcase-head"
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerChildren}
        >
          <motion.p className="section-eyebrow" variants={fadeUp}>
            Selected work
          </motion.p>
          <motion.h2 id="work-heading" className="section-title" variants={fadeUp}>
            Projects in motion.
          </motion.h2>
          <motion.p className="section-lead" variants={fadeUp}>
            Placeholder case studies with room for real photography later. Drop images into{' '}
            <code>public/work/</code> when ready.
          </motion.p>
        </motion.div>

        <div className="work-track" ref={trackRef}>
          {workItems.map((item, index) => (
            <article className="work-panel" key={item.id} style={{ '--i': index }}>
              <div className="work-panel-media" style={{ background: item.cover }} aria-hidden="true">
                <span className="work-panel-index">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="work-panel-body">
                <div className="work-panel-meta">
                  <span>{item.tag}</span>
                  <span>{item.year}</span>
                </div>
                <h3 className="work-panel-title">{item.title}</h3>
                <p className="work-panel-summary">{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
