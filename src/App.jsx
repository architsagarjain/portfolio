import { useRef, useState, useEffect } from 'react'
import {
  motion, useScroll, useTransform, useSpring, useMotionValue,
  useInView, animate, AnimatePresence, useReducedMotion
} from 'framer-motion'
import photo from './assets/archit.jpg'

/* ============ tiny building blocks ============ */

function Marquee({ children, speed = 40, className }) {
  const reduce = useReducedMotion()
  return (
    <div className={className}>
      <motion.div
        className="row"
        animate={reduce ? {} : { x: ['0%', '-50%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        {children}{children}
      </motion.div>
    </div>
  )
}

function CountUp({ to, pre = '', post = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, to, {
      duration: 1.6, ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setVal(v)
    })
    return () => controls.stop()
  }, [inView, to, reduce])
  const fmt = v => v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return <span ref={ref}>{pre}{fmt(val)}{post}</span>
}

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] } }
}
const stagger = { show: { transition: { staggerChildren: 0.12 } } }

function Reveal({ children, ...rest }) {
  return (
    <motion.div variants={rise} initial="hidden" whileInView="show"
      viewport={{ once: true, margin: '-70px' }} {...rest}>
      {children}
    </motion.div>
  )
}

function Magnetic({ children }) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 16 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 16 })
  const reduce = useReducedMotion()
  const onMove = e => {
    if (reduce) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.35)
    y.set((e.clientY - r.top - r.height / 2) * 0.45)
  }
  const reset = () => { x.set(0); y.set(0) }
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset}
      style={{ x, y, display: 'inline-block' }}>
      {children}
    </motion.div>
  )
}

/* ============ hero photo card with 3D tilt ============ */

function TiltCard() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })
  const onMove = e => {
    if (reduce) return
    const r = ref.current.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14)
  }
  const reset = () => { rx.set(0); ry.set(0) }
  return (
    <motion.aside
      ref={ref}
      className="rating-box"
      style={{ rotateX: rx, rotateY: ry, perspective: 900 }}
      onMouseMove={onMove} onMouseLeave={reset}
      initial={{ opacity: 0, y: 40, rotate: -1.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: 0.9, duration: 0.9, ease: [0.2, 0.75, 0.2, 1] }}
    >
      <div className="photo-frame">
        <img className="photo" src={photo} alt="Archit Sagar Jain, smiling in a dark suit and maroon tie" />
      </div>
      <div className="rb-body">
        {[
          ['RATING', 'STRONG BUY', true],
          ['SECTOR', 'Strategy × Growth × Risk'],
          ['USERS SCALED', '20,000+ / 60 days', true],
          ['COST SAVED', '₹6+ Cr', true],
          ['VOLATILITY', 'Low'],
          ['DIVIDEND', 'Ideas, quarterly'],
        ].map(([k, v, buy]) => (
          <div className="rb-row" key={k}>
            <span className="k">{k}</span>
            <span className={`v ${buy ? 'buy' : ''}`}>{v}</span>
          </div>
        ))}
      </div>
    </motion.aside>
  )
}

/* ============ the chart ============ */

const chartData = [
  { x: 2018.7, y: 100, d: 'SEP 2018', t: 'IPO: Techychaps founded', b: 'Two digital platforms launched from a bedroom in Jammu, age 15. 1M+ monthly reach follows.' },
  { x: 2019.95, y: 150, d: 'DEC 2019', t: 'INDIKRAFT, Jammu', b: 'Marketing Manager. 40+ Kashmiri artisans digitized, +45% revenue.' },
  { x: 2021.5, y: 195, d: '2021', t: 'Listed on SCMS Pune', b: 'BBA in Accounts & Finance + Marketing. Elected Placement Coordinator out of 400 students.' },
  { x: 2022.3, y: 235, d: 'APR 2022', t: 'Skillarena.in', b: 'Led a 40-member business development team — ₹5L+ generated in 3 months.' },
  { x: 2022.6, y: 295, d: 'AUG 2022', t: 'Cairros founded', b: 'Full-service consulting & marketing agency. Founder & Managing Partner.' },
  { x: 2022.95, y: 345, d: 'DEC 2022', t: 'Equip9 engagement', b: 'Growth for a construction-tech marketplace. JCB, Mahindra & SANY among 15+ brands. +300% profit.' },
  { x: 2024.4, y: 520, d: 'MAY 2024', t: 'Cairros hits 7 figures', b: 'Agency crosses 7-figure revenue in 2 years, 95%+ client satisfaction — before graduation.' },
  { x: 2024.8, y: 610, d: 'OCT 2024', t: 'PwC, Gurugram', b: 'Risk Consulting Specialist. Internal audits, BPR, control frameworks for 10+ clients incl. PIF & Alfanar.' },
  { x: 2025.6, y: 730, d: '2025', t: '₹6+ crore saved for clients', b: 'Process optimization returns compound across procurement, HR, compliance and finance.' },
  { x: 2026.1, y: 940, d: 'JAN 2026 — NOW', t: 'ZenCabs: 20,000+ users in 60 days', b: 'Head of Strategy & Growth. EV mobility startup, ₹2 Cr ARR run-rate in the first two months. Steepest candle on the chart.' },
]

function Chart() {
  const W = 960, H = 380, PL = 52, PR = 24, PT = 26, PB = 46
  const minX = 2018.4, maxX = 2026.7, minY = 60, maxY = 1010
  const sx = x => PL + (x - minX) / (maxX - minX) * (W - PL - PR)
  const sy = y => H - PB - (y - minY) / (maxY - minY) * (H - PT - PB)
  const pts = chartData.map(p => [sx(p.x), sy(p.y)])
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], cx = (x0 + x1) / 2
    d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`
  }
  const [tip, setTip] = useState(null)
  const wrapRef = useRef(null)
  const inView = useInView(wrapRef, { once: true, margin: '-100px' })

  return (
    <div className="chart-wrap" ref={wrapRef}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img"
        aria-label="Career trajectory chart of Archit Sagar Jain, rising steeply from 2018 to 2026">
        <defs>
          <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B7A48" stopOpacity=".14" />
            <stop offset="100%" stopColor="#0B7A48" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[100, 300, 500, 700, 900].map(v => (
          <g key={v}>
            <line className="gridline" x1={PL} x2={W - PR} y1={sy(v)} y2={sy(v)} />
            <text className="axis-lab" x={PL - 8} y={sy(v) + 4} textAnchor="end">{v}</text>
          </g>
        ))}
        {[2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026].map(yr => (
          <text key={yr} className="axis-lab" x={sx(yr)} y={H - PB + 22} textAnchor="middle">{yr}</text>
        ))}
        <motion.path className="area"
          d={`${d} L ${pts[pts.length - 1][0]} ${H - PB} L ${pts[0][0]} ${H - PB} Z`}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.6, duration: 1 }} />
        <motion.path className="priceline" d={d}
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2.4, ease: 'easeInOut' }} />
        {chartData.map((p, i) => (
          <g key={i}>
            {i === chartData.length - 1 && (
              <motion.circle cx={sx(p.x)} cy={sy(p.y)} r={7} fill="#0B7A48"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: [0.4, 0], scale: [1, 2.6] } : {}}
                transition={{ delay: 2.4, duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                style={{ transformOrigin: `${sx(p.x)}px ${sy(p.y)}px` }} />
            )}
            <motion.circle
              className={`dot ${tip === i ? 'active' : ''}`}
              cx={sx(p.x)} cy={sy(p.y)} r={6} tabIndex={0} role="button"
              aria-label={`${p.d}: ${p.t}. ${p.b}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.35 + i * 0.2, type: 'spring', stiffness: 300, damping: 16 }}
              whileHover={{ scale: 1.5 }}
              onMouseEnter={() => setTip(i)} onFocus={() => setTip(i)}
              onMouseLeave={() => setTip(null)} onBlur={() => setTip(null)}
              style={{ transformOrigin: `${sx(p.x)}px ${sy(p.y)}px` }}
            />
          </g>
        ))}
      </svg>
      <AnimatePresence>
        {tip !== null && wrapRef.current && (() => {
          const rW = wrapRef.current.getBoundingClientRect().width
          const p = chartData[tip]
          const px = sx(p.x) / W * rW, py = sy(p.y) / H * (rW * H / W)
          return (
            <motion.div className="tip" key={tip}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18 }}
              style={{
                left: Math.min(Math.max(px - 110, 8), rW - 270),
                top: Math.max(py - 120, 4)
              }}>
              <span className="t-date">{p.d}</span>
              <span className="t-title">{p.t}</span>
              <div>{p.b}</div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
      <div className="chart-note">
        INDEX: 100 = FIRST VENTURE, SEP 2018 · SOURCE: LIVED EXPERIENCE · CHART DOES NOT DIP BECAUSE HE TREATS SETBACKS AS ACCUMULATION PHASES
      </div>
    </div>
  )
}

/* ============ positions ============ */

const positions = [
  {
    when: 'JAN 2026 — PRESENT', pos: 'LIVE POSITION', live: true,
    org: 'ZenCabs, Jammu', role: 'HEAD OF STRATEGY & GROWTH',
    body: <>Owns strategy and growth for an <b>electric-mobility startup</b>, scaling from launch to <b>20,000+ users within 60 days</b> — one of the fastest early adoption curves in a market of ~800,000 residents. Built the operating system behind the growth: SOPs, service workflows, CX standards and execution frameworks, while leading app design, acquisition campaigns and partnerships to a <b>₹2 crore ARR run-rate</b> in two months.</>,
    stats: [{ to: 20000, post: '+', l: 'Users in 60 days' }, { to: 2, pre: '₹', post: ' Cr', l: 'ARR run-rate' }]
  },
  {
    when: 'OCT 2024 — JAN 2026', pos: 'CORE HOLDING (EXITED)',
    org: 'PwC, Gurugram', role: 'RISK CONSULTING SPECIALIST',
    body: <>Risk advisory and process transformation for <b>10+ clients</b> including Cars24, Stryker India, Caparo, Sangam India, and international names like <b>Public Investment Fund, Alfanar and Arise Textiles</b>. Internal audits, control frameworks, SOPs, business process reengineering and DOA matrices across procurement, HR, compliance and finance.</>,
    stats: [{ to: 6, pre: '₹', post: '+ Cr', l: 'Cost savings' }, { to: 10, post: '+', l: 'Clients served' }]
  },
  {
    when: 'AUG 2022 — MAY 2024', pos: "FOUNDER'S EQUITY",
    org: 'Cairros, Pune', role: 'FOUNDER & MANAGING PARTNER',
    body: <>Founded and scaled a full-service consulting &amp; marketing agency to <b>7-figure revenue in 2 years</b> — while completing a degree. Led <b>20+ marketing transformation projects</b> delivering ₹10L+ in incremental client revenue across publishing, social-impact and B2B sectors.</>,
    stats: [{ to: 7, post: '-fig', l: 'Revenue in 2 yrs' }, { to: 20, post: '+', l: 'Transformations led' }]
  },
  {
    when: 'DEC 2022 — OCT 2024', pos: 'GROWTH POSITION',
    org: 'Equip9, Pune', role: 'DIGITAL MARKETING EXECUTIVE · FREELANCE',
    body: <>Drove growth and brand-building for a construction-tech marketplace, supporting campaigns across <b>15+ infrastructure brands including JCB, Mahindra and SANY</b>. Rebuilt acquisition and lead-gen strategy — <b>+40% conversion</b>, contributing to 300% profit growth and ₹30L+ in annual branding revenue.</>,
    stats: [{ to: 300, pre: '+', post: '%', l: 'Profit growth' }, { to: 40, pre: '+', post: '%', l: 'Lead conversion' }]
  },
  {
    when: 'APR 2022 — JUL 2022', pos: 'SHORT-DURATION BOND',
    org: 'Skillarena.in', role: 'SALES & MARKETING EXECUTIVE · INTERN',
    body: <>Led a <b>40-member business development team</b>, generating over ₹5 lakh in 3 months, and ran user onboarding and course promotion strategy through the peak sales cycle.</>,
    stats: [{ to: 5, pre: '₹', post: 'L+', l: 'Generated in 3 mo' }, { to: 40, l: 'Team members led' }]
  },
  {
    when: 'DEC 2019 — JAN 2021', pos: 'IMPACT POSITION',
    org: 'INDIKRAFT, Jammu', role: 'MARKETING MANAGER',
    body: <>Partnered with <b>40+ artisans in Jammu &amp; Kashmir</b> to digitize traditional handicrafts. Launched the company's first website and digital campaigns — <b>+45% revenue</b> and 30% month-on-month sales growth.</>,
    stats: [{ to: 45, pre: '+', post: '%', l: 'Revenue lift' }, { to: 40, post: '+', l: 'Artisans onboarded' }]
  },
  {
    when: 'SEP 2018 — DEC 2020', pos: 'SEED ROUND · AGE 15',
    org: 'Techychaps & Entrepreneursimplify', role: 'FOUNDER · JAMMU',
    body: <>The IPO. Founded two digital platforms as a schoolkid — a tech blog with <b>10k+ monthly readers</b> and a personal-finance &amp; entrepreneurship page — building a combined <b>1M+ monthly reach</b> through original storytelling.</>,
    stats: [{ to: 1, post: 'M+', l: 'Monthly reach' }, { to: 2, l: 'Platforms built' }]
  },
]

function Positions() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.7'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 24 })
  return (
    <div className="positions" ref={ref}>
      <div className="timeline"><motion.div className="fill" style={{ scaleY }} /></div>
      {positions.map((p, i) => (
        <motion.div className="holding" key={p.org}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.2, 0.7, 0.2, 1] }}>
          <span className={`node ${p.live ? 'live' : ''}`} />
          <div className="h-when">{p.when}<span className="pos">● {p.pos}</span></div>
          <div>
            <div className="h-org">{p.org}</div>
            <div className="h-role">{p.role}</div>
            <p className="h-body">{p.body}</p>
          </div>
          <div className="h-stats">
            {p.stats.map(s => (
              <div className="stat" key={s.l}>
                <span className="big"><CountUp to={s.to} pre={s.pre || ''} post={s.post || ''} /></span>
                <span className="lbl">{s.l}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ============ app ============ */

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 })
  const heroRef = useRef(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroScroll, [0, 1], [0, -70])
  const cardY = useTransform(heroScroll, [0, 1], [0, 60])

  const tickerItems = [
    ['ARCHT', 'STRONG BUY', 'up'],
    ['ZENCABS USERS', '20,000+ IN 60 DAYS ▲', 'up'],
    ['ARR RUN-RATE', '₹2 CR IN 2 MO ▲', 'up'],
    ['COST SAVINGS @ PWC', '₹6+ CR ▲', 'up'],
    ['CLIENT CSAT', '95%+ ▲', 'up'],
    ['AGENCY REVENUE', '7-FIGURE ▲', 'up'],
    ['MONTHLY REACH', '1M+ ▲', 'up'],
    ['AI AGENT CONVERSIONS', '3X ▲', 'up'],
    ['HUSTLE (PERFORMATIVE)', 'SELL ▼', 'down'],
  ]

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} />

      <Marquee className="tape" speed={44}>
        {tickerItems.map(([k, v, c], i) => (
          <span className="item" key={i}>{k} <b className={c}>{v}</b> <span className="sep"> ·</span></span>
        ))}
      </Marquee>

      <nav className="nav">
        <div className="shell nav-in">
          <a className="firm" href="#top">Jain &amp; Company</a>
          <div className="links">
            <a href="#chart">CHART</a>
            <a href="#thesis">THESIS</a>
            <a href="#positions">POSITIONS</a>
            <a href="#portfolio">PORTFOLIO</a>
          </div>
          <Magnetic><a className="cta" href="#contact">INITIATE COVERAGE</a></Magnetic>
        </div>
      </nav>

      <div className="shell" id="top">
        <div className="hero" ref={heroRef}>
          <motion.div style={{ y: heroY }}>
            <motion.div className="ticker-line" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
              <span className="ticker-sym">ARCHT</span>
              <span className="price">▲ +840% since listing (Sep 2018)</span>
            </motion.div>
            <h1 aria-label="Archit Sagar Jain">
              <span className="ln">
                <motion.span style={{ display: 'inline-block' }}
                  initial={{ y: '110%' }} animate={{ y: 0 }}
                  transition={{ delay: 0.25, duration: 0.85, ease: [0.2, 0.75, 0.2, 1] }}>
                  Archit
                </motion.span>
              </span>
              <span className="ln">
                <motion.span style={{ display: 'inline-block' }}
                  initial={{ y: '110%' }} animate={{ y: 0 }}
                  transition={{ delay: 0.4, duration: 0.85, ease: [0.2, 0.75, 0.2, 1] }}>
                  Sagar <span className="thin">Jain</span>
                </motion.span>
              </span>
            </h1>
            <motion.p className="deck" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.7 }}>
              Head of Strategy &amp; Growth at <b>ZenCabs</b>. Ex-<b>PwC</b> risk consultant. Founder of <b>Cairros</b>. A rare dual listing on the <b>finance</b> and <b>marketing</b> exchanges — currently trading well above book value.
            </motion.p>
            <motion.span className="stamp"
              initial={{ opacity: 0, scale: 1.8, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              transition={{ delay: 1.0, duration: 0.45, ease: [0.3, 1.4, 0.4, 1] }}>
              RATING: STRONG BUY
            </motion.span>
            <motion.div className="scroll-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
              <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>↓</motion.span>
              SCROLL FOR FULL RESEARCH NOTE
            </motion.div>
          </motion.div>
          <motion.div style={{ y: cardY }}><TiltCard /></motion.div>
        </div>
      </div>

      <Marquee className="bigband" speed={26}>
        <span>Strong Buy <em>·</em> Strategy <em>·</em> Growth <em>·</em> Risk <em>·</em></span>
      </Marquee>

      <div className="shell">
        <section id="chart">
          <Reveal className="sec-head">
            <span className="no">FIG. 1</span>
            <h2>Price History, 2018–Present</h2>
            <span className="tag">Hover the markers</span>
          </Reveal>
          <Reveal><Chart /></Reveal>
        </section>

        <section id="thesis">
          <Reveal className="sec-head">
            <span className="no">§ 01</span>
            <h2>Investment Thesis</h2>
            <span className="tag">Why this asset compounds</span>
          </Reveal>
          <motion.div className="thesis-copy" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-70px' }}>
            <motion.p variants={rise}>Most professionals pick one exchange. Archit is dual-listed: a <b>BBA in Accounts &amp; Finance and Marketing</b> from SCMS Pune, a founder's instinct for growth, and an auditor's instinct for what breaks. He built a <b>7-figure agency before graduating</b>, saved clients <b>₹6+ crore at PwC</b>, and is now scaling <b>ZenCabs</b>, an electric-mobility startup — <b>20,000+ users in the first 60 days</b> and a <b>₹2 crore ARR run-rate</b> in two months.</motion.p>
            <motion.p variants={rise}>The thesis is simple: creativity that survives an internal audit. Growth for heavy-equipment marketplaces, 40+ Kashmiri artisan businesses digitized, 1M+ monthly content reach, AI agents that 3x'd client conversions — all standing on the SOPs, DOA matrices and control frameworks he wrote himself.</motion.p>
            <motion.p variants={rise}><b>Risks:</b> may redesign your business process while you're still describing the problem. <b>Mitigant:</b> it will be better.</motion.p>
          </motion.div>
          <Reveal className="band">
            <div className="cell"><div className="n"><CountUp to={20000} post="+" /></div><div className="l">Users in 60 days</div></div>
            <div className="cell"><div className="n"><CountUp to={6} pre="₹" post="+ Cr" /></div><div className="l">Client cost savings</div></div>
            <div className="cell"><div className="n"><CountUp to={1} post="M+" /></div><div className="l">Monthly reach built</div></div>
            <div className="cell"><div className="n"><CountUp to={95} post="%+" /></div><div className="l">Client satisfaction</div></div>
          </Reveal>
        </section>

        <section id="positions">
          <Reveal className="sec-head">
            <span className="no">§ 02</span>
            <h2>Position History</h2>
            <span className="tag">All positions long · No exits regretted</span>
          </Reveal>
          <Positions />
        </section>

        <section id="portfolio">
          <Reveal className="sec-head">
            <span className="no">§ 03</span>
            <h2>Special Situations</h2>
            <span className="tag">Off-balance-sheet upside</span>
          </Reveal>
          <motion.div className="sit-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-70px' }}>
            {[
              { tag: 'AI & AUTOMATION', h: 'Lead-Gen Agents', p: 'Built and deployed AI-powered lead generation and workflow automation agents (N8N + agents), letting small businesses automate client outreach end-to-end.', n: '3×', l: 'Conversion uplift' },
              { tag: 'TRANSFORMATION', h: 'MCCS Infra & Shaadi Mangalam', p: 'Led restructuring, digital transformation and growth strategy across two businesses — process optimization that stuck, not slideware.', n: '₹2 Cr', l: 'Cost savings delivered' },
              { tag: 'SOCIAL IMPACT', h: 'Enactus Project Zuri', p: 'Led research and marketing for a venture transforming coconut waste into sustainable products, creating livelihoods for women entrepreneurs.', n: '♻', l: 'Waste → livelihoods' },
            ].map(s => (
              <motion.div className="sit" key={s.h} variants={rise}
                whileHover={{ y: -8, boxShadow: '9px 9px 0 var(--paper-deep)' }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
                <span className="s-tag">{s.tag}</span>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
                <div className="s-num">{s.n}</div>
                <div className="s-numlbl">{s.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section id="allocation">
          <Reveal className="sec-head">
            <span className="no">§ 04</span>
            <h2>Asset Allocation</h2>
            <span className="tag">Skill portfolio, rebalanced quarterly</span>
          </Reveal>
          <div className="alloc">
            {[
              ['Business & GTM Strategy', 26, ''],
              ['Marketing & Growth', 24, ''],
              ['Risk & Process Consulting', 22, 'navy'],
              ['Finance & Data Analytics', 14, 'navy'],
              ['AI Automations & Agents', 14, 'ink'],
            ].map(([name, w, cls], i) => (
              <div className="a-row" key={name}>
                <span className="a-name">{name}</span>
                <div className="a-bar">
                  <motion.div className={`a-fill ${cls}`}
                    initial={{ width: 0 }} whileInView={{ width: `${w}%` }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 1.1, delay: i * 0.1, ease: [0.2, 0.7, 0.2, 1] }} />
                </div>
                <span className="a-pct">{w}%</span>
              </div>
            ))}
          </div>
          <Reveal><p className="a-note">An unusually hedged portfolio: the audit rigor de-risks the creative bets, and the creative bets keep the audit work imaginative. Correlation between holdings: deliberately low.</p></Reveal>
          <motion.div className="chips" variants={{ show: { transition: { staggerChildren: 0.03 } } }} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}>
            {['Business Strategy', 'GTM Strategy', 'Startup Scaling', 'Internal Audit', 'Risk Consulting', 'BPR', 'SOP Development', 'Governance Frameworks', 'Customer Acquisition', 'Power BI', 'Advanced Excel', 'FB & Google Ads', 'Shopify', 'Figma', 'Photoshop', 'WordPress', 'UI/UX', 'N8N', 'AI Agents', 'JIRA', 'Canva'].map(c => (
              <motion.span className="chip" key={c}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -3, backgroundColor: '#191510', color: '#FFF1E5' }}>
                {c}
              </motion.span>
            ))}
          </motion.div>
        </section>

        <section id="fundamentals">
          <Reveal className="sec-head">
            <span className="no">§ 05</span>
            <h2>Fundamentals</h2>
            <span className="tag">Audited figures</span>
          </Reveal>
          <Reveal className="fund-grid">
            <div className="fund-cell">
              <h3>Education</h3>
              <div className="f-item">
                <span className="fk">2021 – 2024 · Pune</span>
                <span className="fv">Symbiosis Centre for Management Studies</span>
                <div className="fs">B.B.A — Accounts &amp; Finance + Marketing Management · CGPA 8.16 · Placement Coordinator (elected out of 400) · Marketing Head, Sympulse fest · Enactus · ThinkTank marketing club</div>
              </div>
              <div className="f-item">
                <span className="fk">2007 – 2021 · Jammu</span>
                <span className="fv">Delhi Public School</span>
                <div className="fs">Class XII: 92% (Commerce + Math) · Class X: 94.2%, with 100/100 in Science</div>
              </div>
            </div>
            <div className="fund-cell">
              <h3>Certifications &amp; Fellowships</h3>
              {[
                ['McKinsey Forward Program', 'Fellowship'],
                ['Brand Management', 'University of London'],
                ['Design Thinking for Innovation', 'UVA Darden School of Business'],
                ['Innovation Through Design', 'University of Sydney'],
                ['Inbound Marketing · Google Ads · Web Dev Diploma', 'HubSpot · Google · Certified'],
              ].map(([v, s]) => (
                <div className="f-item" key={v}><span className="fv">{v}</span><div className="fs">{s}</div></div>
              ))}
            </div>
          </Reveal>
        </section>
      </div>

      <div className="shell">
        <motion.div className="coverage" id="contact"
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-90px' }} transition={{ duration: 0.85, ease: [0.2, 0.7, 0.2, 1] }}>
          <div className="kick">Analyst Access</div>
          <h2>Initiate <em>coverage.</em></h2>
          <p>Strategy engagements, growth problems, audits that need imagination, or a good conversation about markets. Response time beats most helpdesks.</p>
          <div className="cta-row">
            <Magnetic><motion.a className="btn solid" href="mailto:architsagarjain@gmail.com" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>EMAIL THE DESK</motion.a></Magnetic>
            <Magnetic><motion.a className="btn ghost" href="https://www.linkedin.com/in/archit-sagar-jain/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>LINKEDIN ↗</motion.a></Magnetic>
            <Magnetic><motion.a className="btn ghost" href="tel:+919622265599" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>+91 96222 65599</motion.a></Magnetic>
          </div>
          <svg className="spark" viewBox="0 0 960 90" preserveAspectRatio="none" aria-hidden="true">
            <motion.path d="M0,80 L60,74 L120,77 L180,66 L240,70 L300,58 L360,62 L420,48 L480,54 L540,40 L600,45 L660,30 L720,36 L780,20 L840,26 L900,10 L960,14"
              fill="none" stroke="#8FD9B4" strokeWidth="2.5"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
              viewport={{ once: true }} transition={{ duration: 2, ease: 'easeInOut' }} />
          </svg>
        </motion.div>

        <footer>
          <p className="disclaim">DISCLAIMER: This is not investment advice — it is a person. Past performance, in this specific case, is strongly indicative of future results. Figures sourced from actual work at ZenCabs, PwC, Cairros, Equip9, INDIKRAFT and independent ventures. No AIDA models were harmed in the making of this website. © 2026 Archit Sagar Jain.</p>
        </footer>
      </div>
    </>
  )
}
