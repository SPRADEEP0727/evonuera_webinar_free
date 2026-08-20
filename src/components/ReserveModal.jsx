import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import ReserveFlow from './ReserveFlow.jsx'

/**
 * The reservation modal, split into its own chunk. It carries framer-motion
 * and the whole form, which together were the largest thing standing between
 * the page load and the hero painting - none of it is needed until someone
 * actually clicks Reserve. ReserveProvider mounts this on first open and
 * prefetches the chunk once the browser goes idle, so the click still feels
 * instant.
 */
export default function ReserveModal({ isOpen, close }) {
  return (
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
  )
}
