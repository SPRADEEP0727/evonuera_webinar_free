import { motion } from 'framer-motion'
import { Lock, Radio, ArrowRight } from 'lucide-react'
import { SectionHeader } from './Reveal.jsx'
import { useReserve } from './ReserveContext.jsx'
import { WEBINAR_EMBED_URL } from '../config.js'

/**
 * The webinar player. Gated behind a free registration: until the visitor
 * registers, a locked overlay is shown instead of the embed. Once registered
 * (persisted in localStorage), the webinar.gg player is revealed.
 */
export default function WebinarSection() {
  const { registered, open: openReserve } = useReserve()

  return (
    <section id="watch" className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="Live Webinar"
          title="Watch the masterclass"
          subtitle="Register free to unlock the player, then tune in live on the day."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <div className="glass-strong overflow-hidden rounded-2xl p-1.5 shadow-glow-lg">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-ink-950">
              {registered ? (
                <iframe
                  src={WEBINAR_EMBED_URL}
                  title="Webinar Player"
                  className="absolute inset-0 h-full w-full"
                  style={{ border: 0 }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <LockedOverlay onRegister={openReserve} />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function LockedOverlay({ onRegister }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-grad-brand/[0.08] px-6 text-center">
      <div className="absolute inset-0 -z-10 scale-110 bg-grad-brand opacity-20 blur-3xl" />
      <div>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-white/15 bg-white/5 backdrop-blur">
          <Lock className="h-7 w-7 text-white" />
        </div>
        <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-purple">
          <Radio className="h-3.5 w-3.5" /> Registration required
        </p>
        <h3 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
          Register free to unlock the webinar
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-slate-300">
          It's completely free - just share your details and the player unlocks instantly.
        </p>
        <button onClick={onRegister} className="btn-primary mt-6">
          Reserve My Free Seat
          <ArrowRight className="h-4.5 w-4.5" />
        </button>
      </div>
    </div>
  )
}
