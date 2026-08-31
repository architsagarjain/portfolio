import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const commands = [
  { key: '1', label: '00/TERMINAL', to: '/', desc: 'Home — terminal view' },
  { key: '2', label: '01/POSITIONS', to: '/positions', desc: 'Position history' },
  { key: '3', label: '02/DEALS', to: '/deals', desc: 'Deal sheet' },
  { key: '4', label: '03/RESEARCH', to: '/research', desc: 'Research notes' },
  { key: '5', label: '04/STREET', to: '/street', desc: 'Street coverage' },
  { key: '6', label: '05/DESK', to: '/desk', desc: 'Why allocate' },
]

export default function CommandBar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const navigate = useNavigate()

  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.desc.toLowerCase().includes(query.toLowerCase())
  )

  const go = useCallback((to) => {
    setOpen(false)
    setQuery('')
    navigate(to)
  }, [navigate])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); setQuery(''); return }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); return }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); return }
      if (e.key === 'Enter' && filtered[selected]) { go(filtered[selected].to); return }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, filtered, selected, go])

  useEffect(() => {
    setSelected(0)
  }, [query])

  useEffect(() => {
    const onKey = (e) => {
      // Don't trigger if user is typing in an input/textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      // Cmd/Ctrl+K or ? to open command bar
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(v => !v)
        return
      }
      if (e.key === '?' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        setOpen(v => !v)
        return
      }

      // Number keys 1-6 for direct navigation (only when command bar is closed)
      if (!open) {
        const num = parseInt(e.key)
        if (num >= 1 && num <= 6) {
          e.preventDefault()
          navigate(commands[num - 1].to)
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, navigate])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'rgba(7,9,12,.7)', backdropFilter: 'blur(6px)',
            }}
            onClick={() => { setOpen(false); setQuery('') }}
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="commandbar"
          >
            <div className="commandbar-input-row">
              <span className="mono" style={{ fontSize: 12, color: 'var(--mint)', letterSpacing: '.1em' }}>{'>'}</span>
              <input
                autoFocus
                className="commandbar-input"
                placeholder="Type a command or press a number…"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <kbd className="commandbar-kbd">ESC</kbd>
            </div>
            <div className="commandbar-list">
              {filtered.length === 0 && (
                <div className="commandbar-empty">No matching commands.</div>
              )}
              {filtered.map((c, i) => (
                <button
                  key={c.key}
                  className={`commandbar-item${i === selected ? ' selected' : ''}`}
                  onMouseEnter={() => setSelected(i)}
                  onClick={() => go(c.to)}
                >
                  <kbd className="commandbar-cmd-key">{c.key}</kbd>
                  <span className="commandbar-cmd-label">{c.label}</span>
                  <span className="commandbar-cmd-desc">{c.desc}</span>
                  <span className="commandbar-cmd-arrow">→</span>
                </button>
              ))}
            </div>
            <div className="commandbar-footer">
              <span><kbd className="commandbar-kbd">↑↓</kbd> navigate</span>
              <span><kbd className="commandbar-kbd">↵</kbd> select</span>
              <span><kbd className="commandbar-kbd">1-6</kbd> quick jump</span>
              <span><kbd className="commandbar-kbd">esc</kbd> close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
