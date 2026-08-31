import React, { useEffect, useState } from 'react'
import { Routes, Route, NavLink, useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import { profile } from './data.js'
import Terminal from './pages/Terminal.jsx'
import Positions from './pages/Positions.jsx'
import Deals from './pages/Deals.jsx'
import Research from './pages/Research.jsx'
import Street from './pages/Street.jsx'
import Desk from './pages/Desk.jsx'
import CommandBar from './components/CommandBar.jsx'

const nav = [
  { to: '/', label: '00/TERMINAL', end: true },
  { to: '/positions', label: '01/POSITIONS' },
  { to: '/deals', label: '02/DEALS' },
  { to: '/research', label: '03/RESEARCH' },
  { to: '/street', label: '04/STREET' },
  { to: '/desk', label: '05/DESK' },
]

function Masthead() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 60, background: 'rgba(7,9,12,.85)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--line)' }}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '15px clamp(20px,4vw,52px)' }}>
        <Link to="/" className="mono" style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '.2em' }}>
          {profile.ticker} <span className="up">▲</span> <span className="mint">{profile.rating}</span>
        </Link>
        <nav style={{ display: 'flex', gap: 'clamp(8px,2vw,24px)', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {nav.map(n => (
            <NavLink key={n.to} to={n.to} end={n.end} className="mono"
              style={({ isActive }) => ({
                fontSize: 10.5, letterSpacing: '.16em',
                color: isActive ? 'var(--mint)' : 'var(--fg-dim)',
                borderBottom: isActive ? '1px solid var(--mint)' : '1px solid transparent',
                paddingBottom: 2, transition: 'color .2s',
              })}>
              {n.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

function StatusBar() {
  const [time, setTime] = useState('')
  const [scrl, setScrl] = useState('0.00')
  const { scrollYProgress } = useScroll()
  useMotionValueEvent(scrollYProgress, 'change', v => setScrl(v.toFixed(2)))
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }))
    tick()
    const iv = setInterval(tick, 1000)
    return () => clearInterval(iv)
  }, [])
  return (
    <div className="statusbar" role="contentinfo">
      <span>SCRL <b>{scrl}</b></span>
      <span className="hide-m">OPEN TO <b>{profile.openTo}</b></span>
      <span className="hide-m">THEME <b>#9FF8DE</b></span>
      <span className="hide-m"><kbd className="sb-kbd">⌘K</kbd> CMDS</span>
      <span>IST <b>{time}</b> · <span className="up">● LIVE</span></span>
    </div>
  )
}

function Progress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 })
  return <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, transformOrigin: '0 50%', scaleX, background: 'var(--mint)', zIndex: 80, boxShadow: '0 0 12px rgba(159,248,222,.6)' }} />
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', background: 'var(--bg-2)', marginBottom: 34 }}>
      <div className="wrap" style={{ padding: '46px clamp(20px,4vw,52px)', display: 'flex', flexWrap: 'wrap', gap: 26, justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div className="display" style={{ fontSize: 30, fontWeight: 700, letterSpacing: '.02em' }}>{profile.ticker}<span className="mint">.</span></div>
          <div className="mono" style={{ fontSize: 10.5, letterSpacing: '.18em', color: 'var(--fg-dim)', marginTop: 8 }}>
            HUMAN CAPITAL TERMINAL · EST. 2018 · {new Date().getFullYear()}
          </div>
        </div>
        <div className="mono" style={{ fontSize: 10, letterSpacing: '.1em', color: 'var(--fg-faint)', maxWidth: 480, lineHeight: 1.8 }}>
          DISCLOSURE: THE ANALYST HOLDS A 100% POSITION IN THE SUBJECT. PAST PERFORMANCE IS, IN THIS CASE, INDICATIVE OF FUTURE RESULTS.
        </div>
      </div>
    </footer>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  return (
    <>
      <Progress />
      <Masthead />
      <ScrollToTop />
      <CommandBar />
      <AnimatePresence mode="wait">
        <motion.main key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ paddingBottom: 20 }}>
          <Routes location={location}>
            <Route path="/" element={<Terminal />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/research" element={<Research />} />
            <Route path="/street" element={<Street />} />
            <Route path="/desk" element={<Desk />} />
          </Routes>
          <Footer />
        </motion.main>
      </AnimatePresence>
      <StatusBar />
    </>
  )
}
