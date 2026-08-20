import { useEffect, useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { ArrowRight, Flame, Calendar, Clock } from 'lucide-react'
import { useReserve } from './ReserveContext.jsx'
import Motion from './Motion.jsx'

/**
 * Persistent floating Register bar shown on ALL breakpoints once the visitor
 * scrolls past the hero. Hides only while the registration form itself is in
 * view (so it never covers the submit button).
 */
export default function StickyCTA() {
  const [show, setShow] = useState(false)
  const { open: openReserve } = useReserve()

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > 600
      const register = document.getElementById('register')
      const nearForm = register
        ? register.getBoundingClientRect().top < window.innerHeight &&
          register.getBoundingClientRect().bottom > 0
        : false
      setShow(past && !nearForm)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Motion>
      <AnimatePresence>
      {show && (
        <m.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4"
        >
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 rounded-2xl glass-strong px-4 py-3 shadow-glow-lg sm:px-5">
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-red-300">
                <Flame className="h-3.5 w-3.5" /> Free Webinar · Seats Filling Fast
              </p>
              <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm font-semibold text-white">
                Live Masterclass · Tamil
                <span className="inline-flex items-center gap-1.5 text-xs font-normal text-slate-300">
                  <Calendar className="h-3.5 w-3.5 text-brand-purple" /> Sun 23 Aug
                  <Clock className="ml-1 h-3.5 w-3.5 text-brand-coral" /> 10 AM-12 PM IST
                </span>
              </p>
            </div>
            <button onClick={openReserve} className="btn-primary shrink-0 !px-5 !py-3 text-sm">
              Reserve<span className="hidden sm:inline">&nbsp;My Free Seat</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </m.div>
      )}
      </AnimatePresence>
    </Motion>
  )
}
