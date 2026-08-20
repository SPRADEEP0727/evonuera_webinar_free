import { m } from 'framer-motion'
import {
  X,
  ArrowDown,
  ArrowRight,
  Frown,
  BookOpen,
  HelpCircle,
  Ban,
  Lightbulb,
  Bot,
  Rocket,
  Target,
} from 'lucide-react'
import Reveal, { SectionHeader } from './Reveal.jsx'
import { useReserve } from './ReserveContext.jsx'

const pains = [
  "Don't know where to start",
  'Confused between AI, GenAI, AI Agents & Agentic AI',
  "Want to build AI Agents but don't know the architecture",
  "Have an AI product idea but don't know how to build it",
  'Keep watching AI tutorials without actually building anything',
]

// The before/after the session is meant to deliver. Kept as two mirrored
// four-step columns so the jump reads at a glance.
const before = [
  { icon: Frown, label: 'Confused about AI' },
  { icon: BookOpen, label: 'Consuming endless tutorials' },
  { icon: HelpCircle, label: "Don't know what to build" },
  { icon: Ban, label: "Don't know where to start" },
]

const after = [
  { icon: Lightbulb, label: 'Understand AI Systems' },
  { icon: Bot, label: 'Build AI Agents' },
  { icon: Rocket, label: 'Understand AI Product Development' },
  { icon: Target, label: 'Know what to learn & build next' },
]

const list = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const row = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

export default function PainPoints() {
  const { open: openReserve } = useReserve()
  return (
    <section id="for-you" className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="This Masterclass Is For You If..."
          title="Want to Build AI Agents & AI Products - But Don't Know Where to Start?"
          subtitle="You want to learn AI, but..."
        />

        {/* The pains, stated plainly */}
        <m.ul
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto mt-10 grid max-w-3xl gap-3 sm:mt-12"
        >
          {pains.map((p) => (
            <m.li
              key={p}
              variants={row}
              className="flex items-center gap-4 rounded-2xl glass px-5 py-4"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-red-400/30 bg-red-500/10">
                <X className="h-4 w-4 text-red-400" strokeWidth={3} />
              </span>
              <span className="text-[15px] leading-snug text-slate-200">{p}</span>
            </m.li>
          ))}
        </m.ul>

        <Reveal delay={0.1} className="mt-10 text-center">
          <p className="mx-auto max-w-2xl text-base font-semibold text-white text-balance sm:text-lg">
            Then this masterclass will give you the roadmap.
          </p>
        </Reveal>

        {/* From → To */}
        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          <Journey title="From" tone="from" steps={before} />

          {/* Connector - points down on mobile, across on desktop */}
          <Reveal delay={0.1} className="flex items-center justify-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-grad-brand shadow-glow">
              <ArrowDown className="h-5 w-5 text-white lg:hidden" strokeWidth={2.5} />
              <ArrowRight className="hidden h-5 w-5 text-white lg:block" strokeWidth={2.5} />
            </span>
          </Reveal>

          <Journey title="To" tone="to" steps={after} />
        </div>

        <Reveal delay={0.1} className="mt-12 text-center">
          <button onClick={openReserve} className="btn-primary">
            Reserve My Free Seat
          </button>
        </Reveal>
      </div>
    </section>
  )
}

function Journey({ title, tone, steps }) {
  const isFrom = tone === 'from'
  return (
    <Reveal className="h-full">
      <div
        className={`h-full rounded-3xl border p-6 sm:p-7 ${
          isFrom
            ? 'border-white/10 bg-white/[0.03]'
            : 'border-brand-purple/30 bg-brand-purple/[0.07] shadow-glow'
        }`}
      >
        <p
          className={`text-xs font-semibold uppercase tracking-[0.18em] ${
            isFrom ? 'text-slate-500' : 'text-brand-purple'
          }`}
        >
          {title}
        </p>

        <ol className="mt-5 space-y-1">
          {steps.map((s, i) => (
            <li key={s.label}>
              <div className="flex items-center gap-3.5">
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${
                    isFrom
                      ? 'border-white/10 bg-white/[0.04] text-slate-500'
                      : 'border-transparent bg-grad-brand text-white'
                  }`}
                >
                  <s.icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <span
                  className={`text-[15px] font-medium leading-snug ${
                    isFrom ? 'text-slate-400' : 'text-white'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`ml-5 block h-5 w-px ${
                    isFrom ? 'bg-white/10' : 'bg-brand-purple/40'
                  }`}
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  )
}
