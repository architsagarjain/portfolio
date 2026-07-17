import React from 'react'
import { motion } from 'framer-motion'
import { Reveal, Stagger, item } from '../components/motion.jsx'
import { notes, profile } from '../data.js'

const typeLabel = { essay: 'ESSAY', linkedin: 'LINKEDIN NOTE' }

export default function Research() {
  return (
    <>
      <section className="wrap" style={{ padding: 'clamp(56px,7vw,92px) clamp(20px,4vw,52px) 26px' }}>
        <Reveal><div className="eyebrow"><span className="idx">03</span> — RESEARCH NOTES · WRITING</div></Reveal>
        <Reveal delay={0.08}>
          <h1 className="h-page" style={{ marginTop: 20 }}>Analyst notes<br />from <span className="mint">inside the trade.</span></h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p style={{ marginTop: 24, maxWidth: 640, color: 'var(--fg-dim)' }}>
            Essays and LinkedIn notes on growth, mobility, consulting and building —
            written from the operator's seat, not the sidelines.
          </p>
        </Reveal>
      </section>

      <section className="wrap" style={{ padding: '26px clamp(20px,4vw,52px) clamp(56px,8vw,96px)' }}>
        <Stagger>
          {notes.map(n => (
            <motion.div variants={item} key={n.title}>
              <a className="rowlink" href={n.href} target="_blank" rel="noreferrer">
                <span className="mono" style={{ fontSize: 10.5, letterSpacing: '.14em', color: 'var(--fg-faint)' }}>{n.date}</span>
                <span>
                  <span className="mono" style={{ fontSize: 10, letterSpacing: '.18em', color: 'var(--mint)' }}>{typeLabel[n.type] || 'NOTE'}</span>
                  <span className="h-card" style={{ display: 'block', marginTop: 6 }}>{n.title}</span>
                  <span style={{ display: 'block', marginTop: 8, fontSize: 14.5, color: 'var(--fg-dim)', maxWidth: 680 }}>{n.summary}</span>
                </span>
                <span className="mono" style={{ fontSize: 13, color: 'var(--fg-dim)' }}>↗</span>
              </a>
            </motion.div>
          ))}
        </Stagger>
        <Reveal delay={0.1}>
          <a href={profile.linkedin + 'recent-activity/all/'} target="_blank" rel="noreferrer" className="mono"
            style={{ display: 'inline-block', marginTop: 34, fontSize: 11, letterSpacing: '.18em', color: 'var(--fg-dim)', borderBottom: '1px solid var(--line-bright)' }}>
            FULL FEED ON LINKEDIN →
          </a>
        </Reveal>
      </section>
    </>
  )
}
