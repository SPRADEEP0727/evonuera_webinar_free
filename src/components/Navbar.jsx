import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Calendar } from 'lucide-react'
import { useReserve } from './ReserveContext.jsx'

const links = [
  { label: "What You'll Learn", href: '#curriculum' },
  { label: 'Live Demo', href: '#live-demo' },
  { label: 'Who Should Attend', href: '#audience' },
  { label: 'Trainer', href: '#trainer' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { open: openReserve } = useReserve()

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative z-40 py-4"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-1 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5 font-display text-lg font-bold text-white">
          <picture>
            <source srcSet="/images/logo.webp" type="image/webp" />
            <img
              src="/images/logo_icon.png"
              alt="Evonuera logo"
              width={36}
              height={36}
              className="h-9 w-9 rounded-xl shadow-glow"
            />
          </picture>
          Evonuera
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300 xl:inline-flex">
            <Calendar className="h-3.5 w-3.5 text-brand-purple" /> 16 Aug · 10 AM · Tamil
          </span>
          <button onClick={openReserve} className="hidden btn-primary !px-5 !py-2.5 text-sm sm:inline-flex">
            Reserve My Free Seat
          </button>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl glass text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-3 mt-2 overflow-hidden rounded-2xl glass-strong p-3 lg:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-200 transition-colors hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false)
                openReserve()
              }}
              className="mt-2 btn-primary w-full text-sm"
            >
              Reserve My Free Seat
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
