import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { SectionHeader } from './Reveal.jsx'

const faqs = [
  {
    q: 'Who is this for?',
    a: 'Software engineers, IT professionals, students, developers, freelancers, founders and anyone curious about building with AI. If you want to move from using AI to building with it, you belong here.',
  },
  {
    q: 'Do I need AI experience?',
    a: 'No. We start from the fundamentals and build up. As long as you have basic computer skills and curiosity, you can follow along and build a real product by the end.',
  },
  {
    q: 'Is it really free?',
    a: 'Yes - the masterclass is 100% free. Just register with your details to reserve your seat and unlock the webinar. No payment, no hidden charges.',
  },
  {
    q: 'Will there be a recording?',
    a: 'The real value is in attending live, where you can ask questions and follow along in real time. Registered attendees will be notified about recording availability by email.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeader eyebrow="FAQ" title="Questions, answered" />

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen ? 'border-brand-purple/30 bg-white/[0.04]' : 'border-white/10 bg-white/[0.02]'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-semibold text-white sm:text-lg">{f.q}</span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 transition-transform duration-300 ${
                      isOpen ? 'rotate-45 bg-grad-brand' : 'bg-white/5'
                    }`}
                  >
                    <Plus className="h-4 w-4 text-white" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-slate-400 sm:px-6">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
