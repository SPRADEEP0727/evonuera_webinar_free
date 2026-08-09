/**
 * Fixed, full-viewport ambient background - pure CSS (no framer-motion, no JS
 * particle loop) so it costs nothing on the main thread and never delays
 * interactivity/LCP:
 * - deep gradient base
 * - faint grid with radial fade
 * - a few blurred gradient orbs that drift via CSS keyframes
 */
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950" />

      {/* Radial spotlight top */}
      <div
        className="absolute -top-1/3 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at center, rgba(140,82,255,0.30), rgba(255,87,87,0.10) 42%, transparent 70%)',
        }}
      />

      {/* Faint grid */}
      <div
        className="absolute inset-0 bg-grid-faint [background-size:56px_56px]"
        style={{
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, #000 40%, transparent 100%)',
        }}
      />

      {/* Floating orbs - CSS-animated (composited), reduced on the main thread */}
      <div
        className="absolute -left-32 top-24 h-[420px] w-[420px] rounded-full blur-[120px] animate-float-slow"
        style={{ background: 'radial-gradient(circle, rgba(140,82,255,0.5), transparent 70%)' }}
      />
      <div
        className="absolute right-[-10%] top-[38%] h-[500px] w-[500px] rounded-full blur-[130px] animate-float"
        style={{ background: 'radial-gradient(circle, rgba(255,87,87,0.34), transparent 70%)' }}
      />
      <div
        className="absolute left-[20%] top-[70%] hidden h-[360px] w-[360px] rounded-full blur-[120px] animate-float-slow sm:block"
        style={{ background: 'radial-gradient(circle, rgba(140,82,255,0.32), transparent 70%)' }}
      />

      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink-950 to-transparent" />
    </div>
  )
}
