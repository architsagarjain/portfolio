import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Reveal, Stagger, item, Magnetic } from '../components/motion.jsx'
import { positions, education, certs } from '../data.js'

export default function Positions() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.9'] })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })
  return (
    <>
      <section className="wrap" style={{ padding: 'clamp(56px,7vw,92px) clamp(20px,4vw,52px) 26px' }}>
        <Reveal><div className="eyebrow"><span className="idx">01</span> — POSITION HISTORY</div></Reveal>
        <Reveal delay={0.08}>
          <h1 className="h-page" style={{ marginTop: 20 }}>
            Eight years.<br />Six positions. <span className="mint">Zero exits at a loss.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p style={{ marginTop: 24, maxWidth: 640, color: 'var(--fg-dim)' }}>
            Every role held to maturity, every position compounding into the next.
            Read top-down for the current book; bottom-up for the origin story.
          </p>
        </Reveal>
      </section>

      <section className="wrap" ref={ref} style={{ padding: '30px clamp(20px,4vw,52px) clamp(56px,8vw,96px)', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 'clamp(26px,4.6vw,56px)', top: 0, bottom: 0, width: 1, background: 'var(--line)' }} />
        <motion.div style={{ position: 'absolute', left: 'clamp(26px,4.6vw,56px)', top: 0, bottom: 0, width: 1, background: 'var(--mint)', boxShadow: '0 0 10px rgba(159,248,222,.5)', transformOrigin: 'top', scaleY: fill }} />
        <div style={{ display: 'grid', gap: 'clamp(26px,3.6vw,40px)', paddingLeft: 'clamp(28px,5vw,60px)' }}>
          {positions.map(h => (
            <Reveal key={h.org} delay={0.05}>
              <article className="panel" style={{ padding: 'clamp(22px,3vw,34px)', position: 'relative', transition: 'border-color .3s' }}>
                <div style={{ position: 'absolute', left: 'calc(clamp(28px,5vw,60px) * -1 - 4px)', top: 38, width: 9, height: 9, borderRadius: '50%', background: 'var(--bg)', border: '2px solid var(--mint)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }} className="mono">
                  <span style={{ fontSize: 10.5, letterSpacing: '.18em', color: 'var(--fg-dim)' }}>{h.period}</span>
                  <span style={{ fontSize: 10, letterSpacing: '.14em', color: 'var(--amber)' }}>{h.tag}</span>
                </div>
                <h2 className="display" style={{ fontSize: 'clamp(26px,3.2vw,40px)', fontWeight: 700, marginTop: 14, textTransform: 'uppercase', letterSpacing: '-.01em' }}>{h.org}</h2>
                <div className="mono" style={{ fontSize: 10.5, letterSpacing: '.2em', color: 'var(--mint)', marginTop: 6 }}>{h.role}</div>
                <p style={{ marginTop: 16, maxWidth: 680, fontSize: 15.5, color: '#B9C2CC' }}>{h.body}</p>
                <Stagger gap={0.12} style={{ display: 'flex', gap: 36, marginTop: 24, flexWrap: 'wrap' }}>
                  {h.stats.map(([n, l]) => (
                    <motion.div variants={item} key={l}>
                      <div className="display up" style={{ fontSize: 28, fontWeight: 700 }}>{n}</div>
                      <div className="mono" style={{ fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--fg-dim)', marginTop: 5 }}>{l}</div>
                    </motion.div>
                  ))}
                </Stagger>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ borderTop: '1px solid var(--line)', background: 'var(--bg-2)' }}>
        <div className="wrap" style={{ padding: 'clamp(52px,7vw,84px) clamp(20px,4vw,52px)' }}>
          <Reveal><div className="eyebrow"><span className="idx">EXH 02</span> — FUNDAMENTALS · EDUCATION & CREDENTIALS</div></Reveal>
          <Reveal delay={0.1}>
            <div style={{ marginTop: 26, overflowX: 'auto' }}>
              <table>
                <thead><tr><th style={{ width: '15%' }}>Period</th><th style={{ width: '30%' }}>Program</th><th>Institution</th><th style={{ width: '18%' }}>Result</th></tr></thead>
                <tbody>
                  {education.map(([a, b, c, d]) => (
                    <tr key={b}>
                      <td className="mono" style={{ fontSize: 12, color: 'var(--fg-dim)' }}>{a}</td>
                      <td style={{ color: 'var(--fg)' }}>{b}</td>
                      <td style={{ color: '#B9C2CC' }}>{c}</td>
                      <td className="mono" style={{ fontSize: 12 }} >{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Stagger style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 30 }}>
            {certs.map(c => <motion.span variants={item} className="chip" key={c}>{c}</motion.span>)}
          </Stagger>
        </div>
      </section>

      <section className="wrap" style={{ padding: 'clamp(44px,6vw,64px) clamp(20px,4vw,52px)', display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between' }}>
        <Reveal><p className="h-card" style={{ maxWidth: 620 }}>Next: the deal sheet — what these positions actually shipped.</p></Reveal>
        <Reveal delay={0.1}><Magnetic><Link to="/deals" className="btn"><span>02/DEALS →</span></Link></Magnetic></Reveal>
      </section>
    </>
  )
}
