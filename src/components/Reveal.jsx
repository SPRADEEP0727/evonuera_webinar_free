import { m } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}

/** Scroll-triggered fade-up wrapper. */
export default function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const MotionTag = m[as] || m.div
  return (
    <MotionTag
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}

export function SectionHeader({ eyebrow, title, subtitle, theme = 'dark' }) {
  const light = theme === 'light'
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <Reveal>
          <span className={light ? 'section-eyebrow-light' : 'section-eyebrow'}>{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={`mt-5 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] ${
            light ? 'text-slate-900' : 'text-white'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p
            className={`mx-auto mt-4 max-w-xl text-base leading-relaxed text-balance ${
              light ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}
