import { Cpu, Workflow, Bot, Boxes, Check } from 'lucide-react'
import Reveal from './Reveal.jsx'

const expertise = [
  { icon: Cpu, label: 'AI Systems' },
  { icon: Workflow, label: 'AI Automation' },
  { icon: Bot, label: 'Agentic AI' },
  { icon: Boxes, label: 'Product Development' },
]

const credentials = [
  '7+ years of software development experience',
  'Building AI applications, AI Agents & AI products',
]

export default function Trainer() {
  return (
    <section id="trainer" className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Photo */}
          <Reveal className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-0 -z-10 scale-105 rounded-[2rem] bg-grad-brand opacity-30 blur-3xl" />
            <div className="glass-strong overflow-hidden rounded-3xl p-2 shadow-glow-lg">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-ink-800 to-ink-850">
                {/* Instructor photo */}
                <picture>
                  <source srcSet="/images/my_img.webp" type="image/webp" />
                  <img
                    src="/images/my_img.png"
                    alt="Pradeep Subramanian - Software Lead Engineer, AI Systems &amp; Agentic AI"
                    width={1177}
                    height={1336}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                </picture>
              </div>
            </div>
          </Reveal>

          {/* Bio */}
          <div>
            <Reveal>
              <span className="section-eyebrow">About the Trainer</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
                Learn From Someone Who Builds AI Systems
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 font-display text-2xl font-bold text-white">Pradeep Subramanian</p>
              <p className="mt-1.5 gradient-text font-semibold">
                Software Lead Engineer | AI Systems &amp; Agentic AI
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-5 space-y-2.5">
                {credentials.map((c) => (
                  <li key={c} className="flex items-center gap-3 text-slate-300">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-brand-purple/30 bg-brand-purple/10">
                      <Check className="h-3.5 w-3.5 text-brand-purple" strokeWidth={3} />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Expertise</p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {expertise.map((e) => (
                    <span
                      key={e.label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-200"
                    >
                      <e.icon className="h-4 w-4 text-brand-purple" />
                      {e.label}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
