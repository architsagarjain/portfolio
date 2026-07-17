import React from 'react'
import { motion } from 'framer-motion'
import { Reveal, Stagger, item } from '../components/motion.jsx'
import { coverage, profile } from '../data.js'

export default function Street() {
  return (
    <>
      <section className="wrap" style={{ padding: 'clamp(56px,7vw,92px) clamp(20px,4vw,52px) 26px' }}>
        <Reveal><div className="eyebrow"><span className="idx">04</span> — STREET COVERAGE · TESTIMONIALS</div></Reveal>
        <Reveal delay={0.08}>
          <h1 className="h-page" style={{ marginTop: 20 }}>What the street<br /><span className="mint">is saying.</span></h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p style={{ marginTop: 24, maxWidth: 640, color: 'var(--fg-dim)' }}>
            Voices from clients, colleagues and founders — on video where they were willing,
            on record everywhere.
          </p>
        </Reveal>
      </section>

      <section className="wrap" style={{ padding: '26px clamp(20px,4vw,52px) clamp(56px,8vw,96px)' }}>
        <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: 18 }}>
          {coverage.map((c, i) => (
            <motion.figure variants={item} key={i} className="panel" style={{ padding: 'clamp(22px,2.8vw,32px)', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {c.youtube && (
                <div style={{ aspectRatio: '16/9', background: 'var(--bg)', border: '1px solid var(--line)' }}>
                  <iframe
                    src={'https://www.youtube-nocookie.com/embed/' + c.youtube}
                    title={'Testimonial — ' + c.name}
                    style={{ width: '100%', height: '100%', border: 0 }}
                    allow="accelerometer; encrypted-media; picture-in-picture"
                    allowFullScreen loading="lazy" />
                </div>
              )}
              <blockquote style={{ fontSize: 16.5, lineHeight: 1.6, color: '#C9D1DA', flexGrow: 1 }}>
                <span className="mint" style={{ fontFamily: 'var(--display)', fontSize: 26, lineHeight: 0, verticalAlign: '-8px', marginRight: 6 }}>"</span>
                {c.quote}
              </blockquote>
              <figcaption>
                <div className="mono" style={{ fontSize: 11.5, letterSpacing: '.1em', color: 'var(--fg)' }}>{c.name}</div>
                <div className="mono" style={{ fontSize: 10.5, letterSpacing: '.12em', color: 'var(--fg-dim)', marginTop: 3 }}>{c.role}</div>
                {c.href && <a href={c.href} target="_blank" rel="noreferrer" className="mono" style={{ display: 'inline-block', marginTop: 8, fontSize: 10, letterSpacing: '.16em', color: 'var(--mint)' }}>WATCH ON LINKEDIN ↗</a>}
              </figcaption>
            </motion.figure>
          ))}
        </Stagger>
        <Reveal delay={0.1}>
          <p className="mono" style={{ marginTop: 30, fontSize: 10.5, letterSpacing: '.14em', color: 'var(--fg-faint)' }}>
            MORE ENDORSEMENTS ON <a href={profile.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--fg-dim)', borderBottom: '1px solid var(--line-bright)' }}>LINKEDIN →</a>
          </p>
        </Reveal>
      </section>
    </>
  )
}
