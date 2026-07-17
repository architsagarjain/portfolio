import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

export function Reveal({ children, delay = 0, y = 28, ...rest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      {...rest}
    >{children}</motion.div>
  )
}

export function Stagger({ children, gap = 0.09, ...rest }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }} {...rest}>
      {children}
    </motion.div>
  )
}
export const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

/* Giant headline: each line slides up from a clip mask */
export function LineReveal({ lines, delay = 0, className = '', accentIndex = -1 }) {
  return (
    <h1 className={className} aria-label={lines.join(' ')}>
      {lines.map((line, i) => (
        <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
          <motion.span
            style={{ display: 'block', color: i === accentIndex ? 'var(--mint)' : 'inherit' }}
            className={i === accentIndex ? 'glow' : ''}
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1, delay: delay + i * 0.14, ease: EASE }}
          >{line}</motion.span>
        </span>
      ))}
    </h1>
  )
}

export function CountUp({ to, prefix = '', suffix = '', decimals = 0, duration = 1.8 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration, ease: EASE, onUpdate: v => setVal(v) })
    return () => c.stop()
  }, [inView, to, duration])
  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>
}

export function Magnetic({ children, strength = 0.32 }) {
  const ref = useRef(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 14 })
  const sy = useSpring(y, { stiffness: 180, damping: 14 })
  return (
    <motion.div ref={ref}
      onMouseMove={e => {
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ x: sx, y: sy, display: 'inline-block' }}
    >{children}</motion.div>
  )
}

export function Ticker({ items, speed = 34 }) {
  const row = items.join('      ')
  const render = (key) => (
    <span key={key}>
      {row.split('▲').map((part, i) => i === 0
        ? <span key={i}>{part}</span>
        : <span key={i}><span className="up">▲</span>{part}</span>)}
      {'      '}
    </span>
  )
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--bg-2)' }}>
      <motion.div style={{ display: 'inline-block', padding: '11px 0' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
        className="mono">
        <span style={{ fontSize: 11.5, letterSpacing: '.16em', color: 'var(--fg-dim)' }}>
          {render('a')}{render('b')}
        </span>
      </motion.div>
    </div>
  )
}

/* Animated candlestick + glowing trend line canvas for the hero backdrop */
export function MarketCanvas({ opacity = 0.5 }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    let raf, w, h, dpr
    const N = 46
    const candles = []
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.offsetWidth; h = canvas.offsetHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)
    let base = 0.66
    for (let i = 0; i < N; i++) {
      const drift = (Math.random() - 0.4) * 0.05
      const open = base
      base = Math.min(0.9, Math.max(0.16, base - drift))
      candles.push({
        open, close: base,
        hi: Math.min(open, base) - Math.random() * 0.045,
        lo: Math.max(open, base) + Math.random() * 0.045,
      })
    }
    let t = 0
    function draw() {
      ctx.clearRect(0, 0, w, h)
      const cw = w / N
      ctx.strokeStyle = 'rgba(30,40,51,.9)'
      ctx.lineWidth = 1
      for (let gy = 1; gy < 6; gy++) {
        ctx.beginPath(); ctx.moveTo(0, (h / 6) * gy); ctx.lineTo(w, (h / 6) * gy); ctx.stroke()
      }
      for (let i = 0; i < N; i++) {
        const c = candles[i]
        const x = i * cw + cw * 0.5
        const flick = reduced ? 0 : Math.sin(t * 0.02 + i) * 0.004
        const yO = (c.open + flick) * h, yC = (c.close + flick) * h
        const up = yC < yO
        ctx.strokeStyle = up ? 'rgba(59,224,139,.45)' : 'rgba(240,86,74,.35)'
        ctx.fillStyle = up ? 'rgba(59,224,139,.25)' : 'rgba(240,86,74,.18)'
        ctx.beginPath(); ctx.moveTo(x, c.hi * h); ctx.lineTo(x, c.lo * h); ctx.stroke()
        const bw = Math.max(3, cw * 0.42)
        ctx.fillRect(x - bw / 2, Math.min(yO, yC), bw, Math.max(2, Math.abs(yC - yO)))
      }
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(159,248,222,.6)'
      ctx.lineWidth = 1.6
      ctx.shadowColor = 'rgba(159,248,222,.45)'
      ctx.shadowBlur = 10
      for (let i = 0; i < N; i++) {
        const c = candles[i]
        const x = i * cw + cw * 0.5
        const y = ((c.open + c.close) / 2 + (reduced ? 0 : Math.sin(t * 0.02 + i) * 0.004)) * h
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.shadowBlur = 0
      const last = candles[N - 1]
      const lx = (N - 1) * cw + cw * 0.5
      const ly = ((last.open + last.close) / 2) * h
      const pulse = reduced ? 3 : 3 + Math.abs(Math.sin(t * 0.04)) * 6
      ctx.beginPath(); ctx.fillStyle = 'rgba(159,248,222,.95)'; ctx.arc(lx, ly, 3, 0, 7); ctx.fill()
      ctx.beginPath(); ctx.strokeStyle = 'rgba(159,248,222,.3)'; ctx.arc(lx, ly, pulse, 0, 7); ctx.stroke()
      t++
      if (!reduced) raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity, pointerEvents: 'none' }} />
}

/* Typed terminal line */
export function Typed({ text, delay = 0, speed = 24, className = '' }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let iv
    const to = setTimeout(() => {
      iv = setInterval(() => setN(v => {
        if (v >= text.length) { clearInterval(iv); return v }
        return v + 1
      }), speed)
    }, delay)
    return () => { clearTimeout(to); clearInterval(iv) }
  }, [text, delay, speed])
  return <span className={className}>{text.slice(0, n)}{n < text.length && <span className="cursor-blink" style={{ width: '.5em', height: '.85em' }} />}</span>
}
