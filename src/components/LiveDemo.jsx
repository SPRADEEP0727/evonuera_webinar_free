import { m } from 'framer-motion'
import { TrendingUp, Boxes, Bot, Code2, Workflow, Route } from 'lucide-react'
import { SectionHeader } from './Reveal.jsx'

const steps = [
  { icon: TrendingUp, label: 'AI Impact', desc: 'How AI is reshaping software & industries.' },
  { icon: Boxes, label: 'AI Systems', desc: 'What they are and how they get built.' },
  { icon: Bot, label: 'Agents', desc: 'AI agents & automation for real workflows.' },
  { icon: Code2, label: 'Development', desc: 'The modern AI workflow and the tools.' },
  { icon: Workflow, label: 'Live Build', desc: 'An AI system built live with n8n.' },
  { icon: Route, label: 'AI Product Roadmap', desc: 'Your path from builder to shipped product.' },
]

export default function LiveDemo() {
  return (
    <section id="live-demo" className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Live Demonstration"
          title="Watch Me Build & Deploy an AI Product Live"
          subtitle="From a blank editor to a live, scalable website - in real time, no edits, no hiding."
        />

        <div className="relative mt-16">
          {/* Desktop connecting line */}
          <div className="absolute left-0 right-0 top-[42px] hidden h-px lg:block">
            <div className="h-full w-full bg-gradient-to-r from-transparent via-brand-purple/40 to-transparent" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {steps.map((s, i) => (
              <m.div
                key={s.label}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 grid h-[84px] w-[84px] place-items-center rounded-2xl glass-strong shadow-glow">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-grad-brand">
                    <s.icon className="h-6 w-6 text-white" strokeWidth={2} />
                  </div>
                  <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full border border-white/15 bg-ink-850 text-xs font-bold text-brand-purple">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-white">{s.label}</h3>
                <p className="mt-1.5 max-w-[12rem] text-xs leading-relaxed text-slate-400">{s.desc}</p>

                {/* Mobile connector */}
                {i < steps.length - 1 && (
                  <div className="my-3 h-6 w-px bg-gradient-to-b from-brand-purple/50 to-transparent sm:hidden" />
                )}
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
