import { motion } from 'framer-motion'
import { CheckCircle2, Flame, Calendar, Clock, Languages } from 'lucide-react'
import LightSection from './LightSection.jsx'
import ReserveFlow from './ReserveFlow.jsx'

export default function Registration() {
  return (
    <LightSection id="register" className="px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-1 shadow-[0_40px_90px_-40px_rgba(79,124,255,0.5)]">
          {/* Gradient border sheen */}
          <div className="absolute inset-0 -z-10 scale-105 bg-grad-brand opacity-25 blur-2xl" />

          <div className="grid gap-0 rounded-[1.4rem] bg-white md:grid-cols-[1fr_1.1fr]">
            {/* Left pitch */}
            <div className="relative flex flex-col justify-between p-8 sm:p-10">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
                  <Flame className="h-3.5 w-3.5" /> Seats Filling Fast
                </span>
                <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                  Reserve your <span className="gradient-text">seat</span>
                </h2>
                <p className="mt-4 leading-relaxed text-slate-500">
                  It's completely free - just register to lock in your live seat and unlock the
                  webinar. Seats are limited, so grab yours before it's full.
                </p>

                <div className="mt-6 flex items-baseline gap-2.5">
                  <span className="font-display text-4xl font-bold text-slate-900">FREE</span>
                  <span className="text-sm text-slate-500">no payment · full access</span>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4.5 w-4.5 text-brand-purple" /> Sunday, 16 August
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4.5 w-4.5 text-brand-coral" /> 10:00 - 11:30 AM IST
                  </span>
                  <span className="flex items-center gap-2">
                    <Languages className="h-4.5 w-4.5 text-brand-purple" /> Language: Tamil
                  </span>
                </div>

                <ul className="mt-8 space-y-3">
                  {['Live, hands-on session', 'Build & deploy a real product', 'Q&A with the trainer', 'Actionable AI builder roadmap'].map(
                    (b) => (
                      <li key={b} className="flex items-center gap-3 text-sm text-slate-600">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                        {b}
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Seat progress */}
              <div className="mt-10">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Seats reserved</span>
                  <span className="font-semibold text-slate-900">86% full</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '86%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: 'easeOut' }}
                    className="h-full rounded-full bg-grad-brand"
                  />
                </div>
              </div>
            </div>

            {/* Right - reservation flow (details → registered) */}
            <div className="relative border-t border-slate-200 p-8 sm:p-10 md:border-l md:border-t-0">
              <ReserveFlow />
            </div>
          </div>
        </div>
      </div>
    </LightSection>
  )
}
