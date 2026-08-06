import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import ReserveFlow from './ReserveFlow.jsx'

const ReserveContext = createContext({
  open: () => {},
  close: () => {},
  isOpen: false,
  registered: false,
  markRegistered: () => {},
})

export const useReserve = () => useContext(ReserveContext)

const REGISTERED_KEY = 'evonuera_registered'

export function ReserveProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [registered, setRegistered] = useState(false)
  const hasOpenedRef = useRef(false) // becomes true once the modal is opened (auto or manual)

  // Restore "registered" state so the webinar stays unlocked across reloads.
  useEffect(() => {
    try {
      if (localStorage.getItem(REGISTERED_KEY) === '1') setRegistered(true)
    } catch {
      /* storage unavailable - ignore */
    }
  }, [])

  const open = useCallback(() => {
    hasOpenedRef.current = true
    setIsOpen(true)
  }, [])
  const close = useCallback(() => setIsOpen(false), [])

  // Auto-open the reservation popup ~5s after the visitor lands - but only
  // once per browser session, and never if they've already registered or
  // already opened it themselves.
  useEffect(() => {
    if (registered) return
    let done = false
    try {
      done = sessionStorage.getItem('evonuera_autopopped') === '1'
    } catch {
      /* storage unavailable - ignore */
    }
    if (done) return

    const t = setTimeout(() => {
      if (hasOpenedRef.current || registered) return
      hasOpenedRef.current = true
      setIsOpen(true)
      try {
        sessionStorage.setItem('evonuera_autopopped', '1')
      } catch {
        /* ignore */
      }
    }, 5000)
    return () => clearTimeout(t)
  }, [registered])

  const markRegistered = useCallback(() => {
    setRegistered(true)
    try {
      localStorage.setItem(REGISTERED_KEY, '1')
    } catch {
      /* storage unavailable - ignore */
    }
  }, [])

  // Esc to close + lock body scroll while open
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [isOpen, close])

  return (
    <ReserveContext.Provider value={{ open, close, isOpen, registered, markRegistered }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Reserve your free seat"
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
            >
              <button
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-800"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <div className="max-h-[88vh] overflow-y-auto p-6 sm:p-8">
                {/* Brand header */}
                <div className="mb-6 flex items-center gap-2.5">
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
                  <span className="font-display text-lg font-bold text-slate-900">Evonuera</span>
                </div>

                <ReserveFlow />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ReserveContext.Provider>
  )
}
