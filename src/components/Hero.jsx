import { motion } from 'framer-motion'
import { Star, Radio, Users, ArrowRight, Sparkles, Calendar, Clock, Languages } from 'lucide-react'
import { useReserve } from './ReserveContext.jsx'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const { open: openReserve } = useReserve()
  return (
    <section id="top" className="relative px-4 pt-10 sm:px-6 sm:pt-14 lg:pt-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 sm:gap-12 lg:grid-cols-[1.05fr_1fr]">
        {/* Left copy */}
        <motion.div variants={container} initial="hidden" animate="show" className="text-center lg:text-left">
          <motion.div variants={item} className="flex justify-center lg:justify-start">
            <span className="section-eyebrow">
              <Sparkles className="h-3.5 w-3.5 text-brand-purple" />
              Free Live Masterclass · In Tamil
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-white text-balance sm:text-5xl sm:leading-[1.05] lg:text-6xl"
          >
            The Complete Roadmap to Building{' '}
            <span className="gradient-text">AI Systems &amp; AI Products</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-300 text-balance sm:text-lg lg:mx-0"
          >
            Join a free, hands-on Live Masterclass (in Tamil) and discover how to build
            AI-powered applications, AI systems, and ship real products using modern AI tools.
          </motion.p>

          <motion.div variants={item} className="mt-7 flex justify-center lg:justify-start">
            <div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl border border-brand-purple/30 bg-brand-purple/10 px-5 py-3 text-sm shadow-glow sm:text-base">
              <span className="flex items-center gap-2 font-bold text-white">
                <Calendar className="h-5 w-5 text-brand-purple" /> Sun, 16 Aug 2026
              </span>
              <span className="hidden h-5 w-px bg-white/20 sm:block" />
              <span className="flex items-center gap-2 font-bold text-white">
                <Clock className="h-5 w-5 text-brand-coral" /> 10:00 - 11:30 AM IST
              </span>
              <span className="hidden h-5 w-px bg-white/20 sm:block" />
              <span className="flex items-center gap-2 font-bold text-white">
                <Languages className="h-5 w-5 text-brand-purple" /> Tamil
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <button onClick={openReserve} className="btn-primary w-full sm:w-auto">
              Reserve My Free Seat
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
            <a href="#curriculum" className="btn-ghost w-full sm:w-auto">
              See What You'll Learn
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-slate-300">Rated by Professionals</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <Radio className="h-4 w-4 text-emerald-400" /> Live Online
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Users className="h-4 w-4 text-brand-purple" /> Limited Seats
            </div>
          </motion.div>
        </motion.div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mx-auto w-full max-w-xl"
        >
          {/* Brand glow behind */}
          <div className="absolute inset-0 -z-10 scale-110 rounded-[2rem] bg-grad-brand opacity-30 blur-3xl" />
          <div className="glass-strong overflow-hidden rounded-2xl p-1.5 shadow-glow-lg">
            <picture>
              <source srcSet="/images/hero.webp" type="image/webp" />
              <img
                src="/images/hero.png"
                alt="Developer building and deploying an AI product live - AI agent flow, code editor and deployment dashboard on stage"
                width={1536}
                height={1024}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full rounded-xl"
              />
            </picture>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
