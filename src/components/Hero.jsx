import { Radio, Users, ArrowRight, Sparkles, Calendar, Clock, Languages, GraduationCap } from 'lucide-react'
import { useReserve } from './ReserveContext.jsx'
import { EVENT_ORIGINAL_PRICE } from '../config.js'

const TOPICS = ['AI Agents', 'Agentic AI', 'AI Products', 'AI Automation']

/**
 * Above-the-fold hero. Intentionally rendered as plain HTML/CSS (no
 * framer-motion entrance) so the LCP element - the <h1> and hero image -
 * paint immediately from the server HTML instead of waiting for the JS
 * bundle to hydrate and run an opacity animation.
 */
export default function Hero() {
  const { open: openReserve } = useReserve()
  return (
    <section id="top" className="relative px-4 pt-8 sm:px-6 sm:pt-14 lg:pt-20">
      <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-12 lg:grid-cols-[1.05fr_1fr]">
        {/* Left copy */}
        <div className="text-center lg:text-left">
          <div className="flex justify-center lg:justify-start">
            <span className="section-eyebrow">
              <Sparkles className="h-3.5 w-3.5 text-brand-purple" />
              Free AI Masterclass · In Tamil
            </span>
          </div>

          <h1 className="mt-5 font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-white text-balance sm:text-5xl sm:leading-[1.05] lg:text-6xl">
            Masterclass on Building{' '}
            <span className="gradient-text">AI Systems &amp; AI Products</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-300 text-balance sm:text-lg lg:mx-0">
            Understand how AI is transforming the real world, learn how to build AI Systems
            using AI Agents &amp; Automation, and discover the roadmap to building AI Products.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
            {TOPICS.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-slate-200 sm:text-sm"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex justify-center lg:justify-start">
            <div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl border border-brand-purple/30 bg-brand-purple/10 px-5 py-3 text-sm shadow-glow sm:text-base">
              <span className="flex items-center gap-2 font-bold text-white">
                <Calendar className="h-5 w-5 text-brand-purple" /> Sun, 23 Aug 2026
              </span>
              <span className="hidden h-5 w-px bg-white/20 sm:block" />
              <span className="flex items-center gap-2 font-bold text-white">
                <Clock className="h-5 w-5 text-brand-coral" /> 10:00 AM - 12:00 PM IST
              </span>
              <span className="hidden h-5 w-px bg-white/20 sm:block" />
              <span className="flex items-center gap-2 font-bold text-white">
                <Languages className="h-5 w-5 text-brand-purple" /> Tamil
              </span>
            </div>
          </div>

          {/* Who it's for - stated up top so visitors self-qualify instantly */}
          <p className="mx-auto mt-4 flex max-w-xl items-center justify-center gap-2 text-sm text-slate-400 lg:mx-0 lg:justify-start">
            <GraduationCap className="h-4 w-4 shrink-0 text-brand-purple" />
            For students, professionals, developers, founders &amp; anyone curious about AI.
          </p>

          <div className="mt-5 flex items-baseline justify-center gap-2.5 lg:justify-start">
            <span className="font-display text-3xl font-bold text-white">FREE</span>
            <span className="font-display text-xl font-semibold text-slate-400 line-through decoration-brand-coral/70 decoration-2">
              {EVENT_ORIGINAL_PRICE}
            </span>
            <span className="text-sm text-slate-300">limited-time seat</span>
          </div>

          <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <button onClick={openReserve} className="btn-primary w-full sm:w-auto">
              Reserve My Free Seat
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
            <a href="#curriculum" className="btn-ghost w-full sm:w-auto">
              See What You'll Learn
            </a>
          </div>

          {/* Honest trust signals (no fabricated ratings) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <Radio className="h-4 w-4 text-emerald-400" /> Live Online
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Sparkles className="h-4 w-4 text-brand-purple" /> Beginner-friendly &amp; hands-on
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Users className="h-4 w-4 text-brand-purple" /> Limited Seats
            </div>
          </div>
        </div>

        {/* Right visual - eager + high priority; it's (or is near) the LCP element */}
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute inset-0 -z-10 scale-110 rounded-[2rem] bg-grad-brand opacity-30 blur-3xl" />
          <div className="glass-strong overflow-hidden rounded-2xl p-1.5 shadow-glow-lg">
            <picture>
              <source
                type="image/webp"
                srcSet="/images/hero-640.webp 640w, /images/hero-960.webp 960w, /images/hero-1280.webp 1280w, /images/hero.webp 1536w"
                sizes="(min-width: 640px) 564px, calc(100vw - 2.75rem)"
              />
              <img
                src="/images/hero.png"
                alt="Developer building and deploying an AI product live - AI agent flow, code editor and deployment dashboard on stage"
                width={1536}
                height={1024}
                loading="eager"
                fetchpriority="high"
                decoding="async"
                className="w-full rounded-xl"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  )
}
