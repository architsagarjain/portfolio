// ============================================================
// ALL SITE CONTENT LIVES HERE.
// To add a blog post, LinkedIn post, testimonial, or project,
// just add an object to the right array below and redeploy.
// ============================================================

export const profile = {
  name: 'Archit Sagar Jain',
  ticker: 'ARCHT',
  rating: 'STRONG BUY',
  title: 'Strategy & Growth — ZenCabs · Ex-PwC · Founder, Cairros',
  oneLiner:
    'Builder-focused operator blending consulting, branding, growth strategy and entrepreneurial execution.',
  email: 'architsagarjain@gmail.com',
  linkedin: 'https://www.linkedin.com/in/archit-sagar-jain/',
  location: 'Jammu / Gurugram, India',
  openTo: "FOUNDER'S OFFICE · VENTURE CAPITAL · STRATEGY & GROWTH",
}

export const heroStats = [
  { n: 10, suffix: 'K+', label: 'App downloads, month one · ZenCabs' },
  { n: 6, prefix: '₹', suffix: ' Cr+', label: 'Client savings delivered · PwC' },
  { n: 300, suffix: '%', label: 'Profit growth driven · Equip9' },
  { n: 8, suffix: ' yrs', label: 'Operating since age 15' },
]

export const tickerTape = [
  'ZENCABS ▲ 10K+ DOWNLOADS · MONTH ONE',
  'PWC ▲ ₹6 CR+ SAVINGS · 10+ CLIENTS',
  'CAIRROS ▲ 7-FIGURE REVENUE · 2 YRS',
  'EQUIP9 ▲ 300% PROFIT GROWTH',
  'MCCS INFRA ▲ ₹2 CR VALUE UNLOCKED',
  'ENTREPRENEURSIMPLIFY ▲ 1M+ MONTHLY REACH',
  'FIRST VENTURE ▲ AGE 15',
]

export const chartPoints = [
  { x: 40, y: 210, yr: '2018', label: 'Techychaps founded · age 15' },
  { x: 140, y: 192, yr: '2020', label: 'Entrepreneursimplify · 1M+ reach' },
  { x: 240, y: 176, yr: '2021', label: 'INDIKRAFT · 40+ artisans digitized' },
  { x: 350, y: 148, yr: '2022', label: 'Cairros founded · Equip9' },
  { x: 460, y: 108, yr: '2024', label: 'PwC risk desk · ₹6 Cr+ savings' },
  { x: 570, y: 62, yr: '2026', label: 'ZenCabs · Masters\u2019 Union PGP TBM' },
]

export const positions = [
  {
    period: "JAN'26 — PRESENT", tag: 'CORE HOLDING · OVERWEIGHT',
    org: 'ZenCabs', role: 'STRATEGY & GROWTH · JAMMU',
    body: 'Driving growth strategy, GTM execution, customer acquisition and market expansion at an all-electric mobility startup. Scaled the platform to 10,000+ app downloads within the first month of launch, building the early growth systems — pricing, positioning, acquisition loops — in a competitive mobility market.',
    stats: [['10K+', 'Downloads · month one'], ['0→1', 'Growth systems built']],
  },
  {
    period: "OCT'24 — JAN'26", tag: 'BLUE CHIP · RISK DESK',
    org: 'PwC India', role: 'RISK CONSULTANT · GURUGRAM',
    body: 'Delivered risk advisory and business transformation across manufacturing, healthcare, automotive and industrials — internal audits, governance frameworks, SOPs and BPR across procurement, HR, compliance and finance. Clients included Cars24, Stryker India, Public Investment Fund, Alfanar, Caparo, Sangam India and Arise Textiles. Contributed to ₹6+ crore in cost savings.',
    stats: [['₹6 Cr+', 'Cost savings'], ['10+', 'Enterprise clients']],
  },
  {
    period: "AUG'22 — MAY'24", tag: 'FOUNDER ROUND',
    org: 'Cairros', role: 'FOUNDER & MANAGING PARTNER · PUNE',
    body: 'Built a full-service consulting and marketing agency from zero to 7-figure annual revenue in two years. Led 20+ marketing transformation projects across publishing, hospitality, social impact and B2B — client acquisition, GTM planning, budgeting and delivery, end to end.',
    stats: [['7-fig', 'Revenue in 2 yrs'], ['20+', 'Projects led']],
  },
  {
    period: "DEC'22 — OCT'24", tag: 'GROWTH POSITION',
    org: 'Equip9', role: 'DIGITAL MARKETING EXECUTIVE · PUNE',
    body: 'Ran branding and performance marketing for construction and heavy-equipment brands including JCB, Mahindra and SANY. Generated ₹30L+ in annual branding revenue, lifted lead conversion 40% through redesigned segmentation, and contributed to 300% profit growth as the company scaled from seed stage to a 60+ member organization.',
    stats: [['300%', 'Profit growth'], ['+40%', 'Lead conversion']],
  },
  {
    period: "DEC'19 — JAN'21", tag: 'IMPACT POSITION',
    org: 'INDIKRAFT', role: 'MARKETING MANAGER · JAMMU',
    body: 'Partnered with 40+ artisans across Jammu & Kashmir to digitize traditional handicrafts. Launched the company\u2019s first website and digital campaigns — +45% revenue and 30% month-on-month sales growth.',
    stats: [['+45%', 'Revenue lift'], ['40+', 'Artisans onboarded']],
  },
  {
    period: "2018 — 2020", tag: 'SEED ROUND · AGE 15',
    org: 'Techychaps & Entrepreneursimplify', role: 'FOUNDER · JAMMU',
    body: 'The IPO. Founded two digital platforms as a schoolkid — a tech blog that reached 10K+ monthly readers, and a personal-finance & entrepreneurship page that built 1M+ monthly organic reach through original storytelling.',
    stats: [['1M+', 'Monthly reach'], ['2', 'Platforms built']],
  },
]

export const deals = [
  {
    id: 'DL-01', name: 'ZenCabs — EV mobility 0→1', status: 'LIVE', dir: 'up',
    role: 'Strategy & Growth', period: '2026 — Now',
    body: 'Launch GTM for an all-electric cab platform in an underserved aggregator market. 10,000+ downloads in month one; growth loops, fare architecture and driver-supply ops built from scratch.',
    tags: ['GTM', 'Mobility', 'Growth loops'],
  },
  {
    id: 'DL-02', name: 'Shaadi Mangalam — full-stack turnaround', status: 'ACTIVE', dir: 'up',
    role: 'Growth & Business Strategy Consultant', period: '2026 — Now',
    body: 'Founder-level engagement on a matrimony platform: website redesign, org restructuring, sales training, lead-gen systems, pricing restructure and brand redesign — a complete transformation mandate.',
    tags: ['Turnaround', 'Pricing', 'Sales systems'],
  },
  {
    id: 'DL-03', name: 'MCCS Infra — ₹2 Cr value unlock', status: 'EXITED', dir: 'up',
    role: 'Freelance Consultant', period: '2024 — 2025',
    body: 'Digital transformation and operational restructuring: manpower restructuring, process optimization and hiring systems that unlocked roughly ₹2 crore in operational value.',
    tags: ['Restructuring', 'Cost optimization'],
  },
  {
    id: 'DL-04', name: 'Cairros — agency build', status: 'EXITED', dir: 'up',
    role: 'Founder & Managing Partner', period: '2022 — 2024',
    body: 'Zero to 7-figure revenue in 24 months. 20+ transformation projects across four sectors, sold and delivered by a founder-led team.',
    tags: ['0→1', 'Consulting', 'Brand'],
  },
  {
    id: 'DL-05', name: 'Equip9 — heavy-equipment brand engine', status: 'EXITED', dir: 'up',
    role: 'Digital Marketing Executive', period: '2022 — 2024',
    body: 'Branding and performance for JCB, Mahindra and SANY partnerships. ₹30L+ annual branding revenue, +40% lead conversion, 300% profit growth from seed stage to 60+ people.',
    tags: ['B2B', 'Performance marketing'],
  },
  {
    id: 'DL-06', name: 'INDIKRAFT — artisan digitization', status: 'EXITED', dir: 'up',
    role: 'Marketing Manager', period: '2019 — 2021',
    body: '40+ Kashmiri artisans brought online. First website, first campaigns: +45% revenue and 30% MoM growth for craft that predates the internet by centuries.',
    tags: ['Impact', 'D2C'],
  },
]

// ── RESEARCH NOTES (Writing) ─────────────────────────────────
// type: 'essay' | 'linkedin'  ·  Add new posts at the TOP.
export const notes = [
  {
    type: 'linkedin', date: 'Jul 2026',
    title: 'What 60 days of launching an EV cab company taught me about demand',
    summary: 'Field notes from the ZenCabs launch — what actually moved downloads, and what was noise.',
    href: 'https://www.linkedin.com/in/archit-sagar-jain/recent-activity/all/',
  },
  {
    type: 'essay', date: 'Jun 2026',
    title: 'Fleet economics are unit economics wearing a seatbelt',
    summary: 'Why per-car profitability is the wrong metric, and what utilization-first thinking changes.',
    href: 'https://www.linkedin.com/in/archit-sagar-jain/recent-activity/all/',
  },
  {
    type: 'linkedin', date: 'May 2026',
    title: 'Things PwC taught me that no startup will',
    summary: 'Governance, DOA matrices and why controls are a growth feature, not bureaucracy.',
    href: 'https://www.linkedin.com/in/archit-sagar-jain/recent-activity/all/',
  },
]

// ── STREET COVERAGE (Testimonials) ───────────────────────────
// Video: paste a YouTube embed ID (the part after v=) into `youtube`,
// or a LinkedIn video post URL into `href`. Leave youtube empty for quote-only.
export const coverage = [
  {
    quote: 'Placeholder — ask a PwC manager, Cairros client or ZenCabs founder for two lines. Real names beat adjectives.',
    name: 'Firstname Lastname', role: 'Designation, Company', youtube: '', href: '',
  },
  {
    quote: 'Second placeholder — a client you saved money for is the highest-credibility voice you can put here.',
    name: 'Firstname Lastname', role: 'Designation, Company', youtube: '', href: '',
  },
]

export const education = [
  ['2021 — 2024', 'BBA, Finance & Marketing', 'Symbiosis Centre for Management Studies, Pune', '8.16 CGPA · Top 10%'],
  ['2026 — 2027', 'PGP in Technology & Business Management', "Masters' Union, Gurugram", 'In progress'],
  ['2020 — 2021', 'Class XII, Commerce + Math', 'Delhi Public School, Jammu', '92% · Top 10%'],
]

export const certs = [
  'McKinsey Forward Program Fellowship — McKinsey & Company',
  'Design Thinking for Innovation — UVA Darden',
  'Brand Management — University of London',
  'Innovation Through Design — University of Sydney',
  'Google Ads Search Certification — Google',
  'Inbound Marketing — HubSpot Academy',
]

export const buyers = [
  {
    key: "FOR FOUNDER'S OFFICES",
    thesis: 'You need someone who can be handed an ambiguous problem on Monday and return with a system by Friday.',
    proof: [
      'Ran 0→1 GTM at ZenCabs: 10K+ downloads in month one, no playbook, no agency.',
      'Founder myself — Cairros to 7-figure revenue means I have already done payroll math at 2am.',
      'Enterprise discipline from PwC: SOPs, DOA matrices, governance — the boring things that let startups scale without breaking.',
    ],
  },
  {
    key: 'FOR VENTURE FUNDS',
    thesis: 'You need operators who can diligence a company from the inside out — and write about it clearly.',
    proof: [
      'This site is a self-authored deal memo. The format is the proof of work.',
      'Pattern library across sectors: mobility, B2B marketplaces, agencies, matrimony platforms, heavy equipment, crafts D2C.',
      'Consulting rigor + founder empathy: ₹6 Cr+ in savings found inside 10+ enterprises, and the scar tissue of building my own.',
    ],
  },
]
