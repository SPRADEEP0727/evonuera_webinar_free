import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Reveal, { SectionHeader } from './Reveal.jsx'
import LightSection from './LightSection.jsx'
import { useReserve } from './ReserveContext.jsx'

const items = [
  'How AI is changing software development',
  'The roadmap to becoming an AI Builder',
  'Modern AI development workflow',
  'How AI Systems are built',
  'How AI Products are launched',
  'Live demonstration: Build & deploy a website using Claude Code',
  'AI tools every builder should know',
  'AI Agents & automation for real-world workflows',
]

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const cardV = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Curriculum() {
  const { open: openReserve } = useReserve()
  return (
    <LightSection id="curriculum" className="px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          theme="light"
          eyebrow="What You'll Learn"
          title="Here's everything we'll cover"
          subtitle="From your first AI-assisted application to production-ready AI solutions."
        />

        <Reveal delay={0.1} className="mt-8 text-center">
          <p className="text-base font-semibold text-slate-700 sm:text-lg">
            In this Masterclass, you'll discover:
          </p>
        </Reveal>

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2 sm:gap-5"
        >
          {items.map((item) => (
            <motion.div
              key={item}
              variants={cardV}
              className="card-light group flex items-center gap-4 p-4 sm:p-5"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-grad-brand shadow-glow transition-transform duration-300 group-hover:scale-110">
                <Check className="h-5 w-5 text-white" strokeWidth={3} />
              </span>
              <span className="text-[15px] font-medium leading-snug text-slate-800">{item}</span>
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={0.1} className="mt-12 text-center">
          <button onClick={openReserve} className="btn-primary">
            Reserve My Free Seat
          </button>
        </Reveal>
      </div>
    </LightSection>
  )
}
