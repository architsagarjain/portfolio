import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Reveal, Stagger, item, Magnetic } from '../components/motion.jsx'
import { deals } from '../data.js'

const statusColor = { LIVE: 'var(--up)', ACTIVE: 'var(--amber)', EXITED: 'var(--fg-dim)' }

export default function Deals() {
  return (
    <>
      <section className="wrap" style={{ padding: 'clamp(56px,7vw,92px) clamp(20px,4vw,52px) 26px' }}>
        <Reveal><div className="eyebrow"><span className="idx">02</span> — DEAL SHEET · SELECTED SITUATIONS</div></Reveal>
        <Reveal delay={0.08}>
          <h1 className="h-page" style={{ marginTop: 20 }}>Six situations.<br /><span className="mint">All marked up.</span></h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p style={{ marginTop: 24, maxWidth: 640, color: 'var(--fg-dim)' }}>
            Launches, turnarounds, value unlocks and builds — the projects behind the position history,
            each with the number that mattered.
          </p>
        </Reveal>
      </section>

      <section className="wrap" style={{ padding: '26px clamp(20px,4vw,52px) clamp(56px,8vw,96px)' }}>
        <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,330px),1fr))', gap: 18 }}>
          {deals.map(d => (
            <motion.article variants={item} key={d.id} className="panel"
              whileHover={{ y: -6, borderColor: 'var(--line-bright)' }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              style={{ padding: 'clamp(22px,2.8vw,32px)', display: 'flex', flexDirection: 'column', gap: 0 }}>
              <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 10.5, letterSpacing: '.16em' }}>
                <span style={{ color: 'var(--fg-faint)' }}>{d.id}</span>
                <span style={{ color: statusColor[d.status] }}>● {d.status}</span>
              </div>
              <h2 className="h-card" style={{ marginTop: 16 }}>{d.name}</h2>
              <div className="mono" style={{ fontSize: 10.5, letterSpacing: '.16em', color: 'var(--mint)', marginTop: 8 }}>
                {d.role.toUpperCase()} · {d.period}
              </div>
              <p style={{ marginTop: 14, fontSize: 15, color: '#B9C2CC', flexGrow: 1 }}>{d.body}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
                {d.tags.map(t => <span className="chip" key={t}>{t}</span>)}
              </div>
            </motion.article>
          ))}
        </Stagger>
      </section>

      <section style={{ borderTop: '1px solid var(--line)', background: 'var(--bg-2)' }}>
        <div className="wrap" style={{ padding: 'clamp(44px,6vw,64px) clamp(20px,4vw,52px)', display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between' }}>
          <Reveal><p className="h-card" style={{ maxWidth: 620 }}>The research desk publishes too — field notes from inside these deals.</p></Reveal>
          <Reveal delay={0.1}><Magnetic><Link to="/research" className="btn"><span>03/RESEARCH →</span></Link></Magnetic></Reveal>
        </div>
      </section>
    </>
  )
}
