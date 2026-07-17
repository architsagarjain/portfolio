import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Reveal, Stagger, item, CountUp, Magnetic, Ticker, MarketCanvas, LineReveal, Typed } from '../components/motion.jsx'
import { profile, heroStats, tickerTape, buyers } from '../data.js'

export default function Terminal() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
        <MarketCanvas opacity={0.45} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(7,9,12,.2) 0%, rgba(7,9,12,.75) 62%, var(--bg) 100%)', pointerEvents: 'none' }} />

        <div className="wrap" style={{ position: 'relative', width: '100%', paddingTop: 'clamp(44px,6vw,80px)', paddingBottom: 'clamp(36px,5vw,64px)' }}>
          <div className="mono" style={{ fontSize: 11.5, letterSpacing: '.22em', color: 'var(--fg-dim)', minHeight: 20 }}>
            <Typed text={'> INITIATING COVERAGE :: NSE:ARCHT :: HUMAN CAPITAL DESK'} delay={250} />
          </div>

          <div className="hero-grid" style={{ marginTop: 'clamp(22px,3vw,40px)' }}>
            <div>
              <LineReveal className="h-giant" lines={['Archit', 'Sagar', 'Jain.']} accentIndex={2} delay={0.55} />
              <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginTop: 26, maxWidth: 560, color: 'var(--fg-dim)', fontSize: 'clamp(16px,1.5vw,19px)' }}>
                {profile.title}. {profile.oneLiner}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', gap: 14, marginTop: 34, flexWrap: 'wrap' }}>
                <Magnetic><Link className="btn solid" to="/positions"><span>Open the book →</span></Link></Magnetic>
                <Magnetic><Link className="btn" to="/desk"><span>Why allocate</span></Link></Magnetic>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}
                className="mono" style={{ display: 'flex', gap: 22, flexWrap: 'wrap', marginTop: 30, fontSize: 10.5, letterSpacing: '.16em', color: 'var(--fg-dim)' }}>
                <span><span className="up">■</span> 8+ YEARS OPERATING</span>
                <span><span className="up">■</span> BASED IN JAMMU / GURUGRAM</span>
                <span><span className="amber">■</span> OPEN TO FOUNDER'S OFFICE & VC</span>
              </motion.div>
            </div>

            <motion.div className="hero-card"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              <div className="photo-frame">
                <div style={{ aspectRatio: '4/5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/archit.jpg" alt="Archit Sagar Jain" className="dither"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.innerHTML = '<span style="font-family:JetBrains Mono;font-size:10px;letter-spacing:.24em;color:#57626F">AWAITING FEED — ARCHT.JPG</span>' }} />
                </div>
              </div>
              <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, fontSize: 10.5, letterSpacing: '.14em', color: 'var(--fg-dim)' }}>
                <span>NSE: {profile.ticker}</span>
                <motion.span initial={{ scale: 1.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.9, type: 'spring', stiffness: 280, damping: 13 }}
                  className="up" style={{ border: '1px solid var(--up)', padding: '3px 9px', fontWeight: 500 }}>
                  ▲ {profile.rating}
                </motion.span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Ticker items={tickerTape} />

      {/* ── KEY METRICS ─────────────────────────────────── */}
      <section className="wrap" style={{ padding: 'clamp(56px,8vw,96px) clamp(20px,4vw,52px)' }}>
        <Reveal><div className="eyebrow"><span className="idx">EXH 01</span> — KEY METRICS · AUDITED</div></Reveal>
        <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 1, marginTop: 30, background: 'var(--line)', border: '1px solid var(--line)' }}>
          {heroStats.map(s => (
            <motion.div variants={item} key={s.label} style={{ background: 'var(--panel)', padding: 'clamp(22px,2.8vw,34px)' }}>
              <div className="stat-num"><CountUp to={s.n} prefix={s.prefix || ''} suffix={s.suffix || ''} /></div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </Stagger>
      </section>

      {/* ── THESIS ──────────────────────────────────────── */}
      <section style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--bg-2)' }}>
        <div className="wrap" style={{ padding: 'clamp(64px,9vw,120px) clamp(20px,4vw,52px)', textAlign: 'center' }}>
          <Reveal><div className="eyebrow"><span className="idx">01</span> — INVESTMENT THESIS</div></Reveal>
          <Reveal delay={0.1}>
            <p className="display" style={{ fontSize: 'clamp(26px,3.8vw,48px)', fontWeight: 600, lineHeight: 1.2, maxWidth: 920, margin: '26px auto 0', textWrap: 'balance' }}>
              Rare small-cap exposure to <span className="mint glow">strategy, growth and execution</span> in a single instrument. Under-covered. Aggressively compounding.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── BUYERS TEASER ───────────────────────────────── */}
      <section className="wrap" style={{ padding: 'clamp(56px,8vw,96px) clamp(20px,4vw,52px)' }}>
        <Reveal><div className="eyebrow"><span className="idx">02</span> — ALLOCATION GUIDANCE</div></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: 22, marginTop: 30 }}>
          {buyers.map((b, i) => (
            <Reveal key={b.key} delay={i * 0.08}>
              <motion.div className="panel" whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                style={{ padding: 'clamp(24px,3vw,36px)', height: '100%' }}>
                <div className="mono" style={{ fontSize: 11, letterSpacing: '.2em', color: 'var(--mint)' }}>{b.key}</div>
                <p className="h-card" style={{ marginTop: 14 }}>{b.thesis}</p>
                <Link to="/desk" className="mono" style={{ display: 'inline-block', marginTop: 20, fontSize: 11, letterSpacing: '.16em', color: 'var(--fg-dim)', borderBottom: '1px solid var(--line-bright)' }}>
                  READ THE FULL CASE →
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 46 }}>
            <Magnetic><Link to="/deals" className="btn"><span>View the deal sheet →</span></Link></Magnetic>
          </div>
        </Reveal>
      </section>
    </>
  )
}
