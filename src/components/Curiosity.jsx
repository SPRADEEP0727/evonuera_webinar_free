import { motion } from 'framer-motion'
import { SectionHeader } from './Reveal.jsx'

// Deliberately phrased as open questions - enough to create the pull without
// giving the session's content away.
const points = [
  'What actually makes an AI Agent an "Agent"?',
  'How AI Systems are structured behind the scenes',
  'How AI Agents use tools and make decisions',
  'How companies are turning AI into real products',
  'What you should learn next to become an AI Builder',
]

const list = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const row = {
  hidden: { opacity: 0, x: -18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Curiosity() {
  return (
    <section id="outcomes" className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="By the End of This Masterclass"
          title="You'll finally understand..."
          subtitle="The questions most AI content leaves you guessing about."
        />

        <motion.ol
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto mt-10 grid max-w-3xl gap-3.5 sm:mt-14"
        >
          {points.map((p, i) => (
            <motion.li
              key={p}
              variants={row}
              className="group flex items-center gap-4 rounded-2xl glass px-5 py-5 transition-colors duration-300 hover:border-brand-purple/30"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brand-purple/30 bg-brand-purple/10 font-display text-sm font-bold text-brand-purple transition-transform duration-300 group-hover:scale-110">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[15px] font-medium leading-snug text-slate-100 sm:text-base">
                {p}
              </span>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
