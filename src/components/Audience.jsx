import { m } from 'framer-motion'
import { Code2, GraduationCap, Briefcase, Rocket, PenTool, Sparkles } from 'lucide-react'
import { SectionHeader } from './Reveal.jsx'
import LightSection from './LightSection.jsx'

const people = [
  { icon: Code2, title: 'Software Developers', desc: 'Level up with AI-native development skills.' },
  { icon: GraduationCap, title: 'Students', desc: 'Get ahead before you even graduate.' },
  { icon: Briefcase, title: 'Working Professionals', desc: 'Bring AI systems & automation into your work.' },
  { icon: Rocket, title: 'Entrepreneurs & Founders', desc: 'Build and validate ideas at AI speed.' },
  { icon: PenTool, title: 'Freelancers', desc: 'Ship AI products clients actually pay for.' },
  { icon: Sparkles, title: 'Anyone Who Wants to Build with AI', desc: 'No matter your background - start building.' },
]

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const cardV = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Audience() {
  return (
    <LightSection id="audience" className="px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          theme="light"
          eyebrow="Who Should Attend"
          title="Built for anyone ready to become an AI builder"
          subtitle="If you want to stop watching from the sidelines and start shipping, this is for you."
        />

        <m.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          {people.map((p) => (
            <m.div
              key={p.title}
              variants={cardV}
              className="card-light group relative overflow-hidden p-6"
            >
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-slate-200 bg-slate-50 transition-colors duration-300 group-hover:border-brand-purple/40">
                  <p.icon className="h-6 w-6 text-brand-purple" strokeWidth={2} />
                </div>
                <h3 className="font-display text-lg font-semibold text-slate-900">{p.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">{p.desc}</p>
            </m.div>
          ))}
        </m.div>
      </div>
    </LightSection>
  )
}
