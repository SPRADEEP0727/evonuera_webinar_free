import { Calendar } from 'lucide-react'
import { useReserve } from './ReserveContext.jsx'

/**
 * Landing-page header: logo, event chip and the single Reserve CTA. No
 * section nav - the page is one scroll and every section ends in its own
 * call to action, so link-outs would only compete with the CTA.
 */
export default function Navbar() {
  const { open: openReserve } = useReserve()

  return (
    <header className="relative z-40 py-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-1 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5 font-display text-lg font-bold text-white">
          <picture>
            <source srcSet="/images/logo.webp" type="image/webp" />
            <img
              src="/images/logo_icon.png"
              alt="Evonuera logo"
              width={36}
              height={36}
              className="h-9 w-9 rounded-xl shadow-glow"
            />
          </picture>
          Evonuera
        </a>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300 sm:inline-flex">
            <Calendar className="h-3.5 w-3.5 text-brand-purple" /> 23 Aug · 10 AM · Tamil
          </span>
          <button
            onClick={openReserve}
            className="btn-primary !px-4 !py-2 text-xs sm:!px-5 sm:!py-2.5 sm:text-sm"
          >
            Reserve My Free Seat
          </button>
        </div>
      </nav>
    </header>
  )
}
