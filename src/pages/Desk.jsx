import React from 'react'
import { motion } from 'framer-motion'
import { Reveal, Stagger, item, Magnetic, Ticker } from '../components/motion.jsx'
import { profile, buyers } from '../data.js'

export default function Desk() {
  return (
    <>
      <section className="wrap" style={{ padding: 'clamp(56px,7vw,92px) clamp(20px,4vw,52px) 26px' }}>
        <Reveal><div className="eyebrow"><span className="idx">05</span> — THE DESK · WHY ALLOCATE</div></Reveal>
        <Reveal delay={0.08}>
          <h1 className="h-page" style={{ marginTop: 20 }}>Initiate<br />a <span className="mint">position.</span></h1>
        </Reveal>
      </section>

      <section className="wrap" style={{ padding: '26px clamp(20px,4vw,52px) clamp(40px,5vw,64px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))', gap: 18 }}>
          {buyers.map((b, i) => (
            <Reveal key={b.key} delay={i * 0.08}>
              <div className="panel" style={{ padding: 'clamp(24px,3vw,38px)', height: '100%' }}>
                <div className="mono" style={{ fontSize: 11, letterSpacing: '.2em', color: 'var(--mint)' }}>{b.key}</div>
                <p className="h-card" style={{ marginTop: 14 }}>{b.thesis}</p>
                <ul style={{ marginTop: 20, listStyle: 'none', display: 'grid', gap: 14 }}>
                  {b.proof.map(p => (
                    <li key={p} style={{ display: 'flex', gap: 12, fontSize: 15, color: '#B9C2CC' }}>
                      <span className="up mono" style={{ fontSize: 12, lineHeight: 1.8 }}>▲</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap" style={{ padding: '0 clamp(20px,4vw,52px) clamp(56px,8vw,92px)' }}>
        <Reveal><div className="eyebrow"><span className="idx">EXH 03</span> — EXECUTION CHANNELS</div></Reveal>
        <Stagger style={{ marginTop: 24, maxWidth: 760 }}>
          {[
            ['EMAIL', profile.email, 'mailto:' + profile.email + '?subject=Initiating%20a%20conversation'],
            ['LINKEDIN', '/in/archit-sagar-jain', profile.linkedin],
            ['BASED IN', profile.location, null],
          ].map(([label, value, href]) => (
            <motion.div variants={item} key={label}>
              {href ? (
                <a className="rowlink" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{ gridTemplateColumns: '130px 1fr auto' }}>
                  <span className="mono" style={{ fontSize: 10.5, letterSpacing: '.2em', color: 'var(--fg-faint)' }}>{label}</span>
                  <span className="h-card">{value}</span>
                  <span className="mono" style={{ color: 'var(--mint)' }}>↗</span>
                </a>
              ) : (
                <div className="rowlink" style={{ gridTemplateColumns: '130px 1fr auto', cursor: 'default' }}>
                  <span className="mono" style={{ fontSize: 10.5, letterSpacing: '.2em', color: 'var(--fg-faint)' }}>{label}</span>
                  <span className="h-card">{value}</span>
                  <span />
                </div>
              )}
            </motion.div>
          ))}
        </Stagger>
        <Reveal delay={0.12}>
          <div style={{ marginTop: 40 }}>
            <Magnetic>
              <a className="btn solid" href={'mailto:' + profile.email + '?subject=Initiating%20a%20conversation'}><span>Open a line →</span></a>
            </Magnetic>
          </div>
        </Reveal>
      </section>

      <Ticker items={[
        'RATING: STRONG BUY', 'COVERAGE: ACTIVE', 'LIQUIDITY: REPLIES WITHIN 24H',
        "OPEN TO: FOUNDER'S OFFICE ▲ VC ▲ STRATEGY & GROWTH",
      ]} speed={26} />
    </>
  )
}
