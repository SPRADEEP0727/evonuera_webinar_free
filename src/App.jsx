import { lazy, useEffect, useState, Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { ReserveProvider } from './components/ReserveContext.jsx'
import Background from './components/Background.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'

// Both resolve the same module, so this is one chunk and one request.
const BelowFold = lazy(() => import('./components/BelowFold.jsx'))
const StickyCTA = lazy(() =>
  import('./components/BelowFold.jsx').then((m) => ({ default: m.StickyCTA }))
)

/**
 * Hold the below-the-fold chunks back until the browser has finished with the
 * hero. Requesting them during first paint made them compete for bandwidth
 * with the LCP on slow connections. Any sign of engagement - or simply the
 * browser going idle after load - pulls them in, so scrolling never waits on
 * the timer.
 */
function useDeferredBelowFold() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let idleId
    let timerId
    const wake = ['scroll', 'pointerdown', 'keydown', 'touchstart']
    const reveal = () => setReady(true)

    wake.forEach((e) => window.addEventListener(e, reveal, { passive: true, once: true }))

    const whenIdle = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(reveal, { timeout: 1500 })
      } else {
        timerId = setTimeout(reveal, 600)
      }
    }
    if (document.readyState === 'complete') whenIdle()
    else window.addEventListener('load', whenIdle, { once: true })

    return () => {
      wake.forEach((e) => window.removeEventListener(e, reveal))
      if (idleId !== undefined) window.cancelIdleCallback(idleId)
      if (timerId !== undefined) clearTimeout(timerId)
    }
  }, [])

  return ready
}

export default function App() {
  const belowFoldReady = useDeferredBelowFold()

  return (
    <ReserveProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        <Background />
        <Navbar />
        <main className="relative z-10 pb-28">
          <Hero />
          {belowFoldReady && (
            <Suspense fallback={null}>
              <BelowFold />
            </Suspense>
          )}
        </main>
        {belowFoldReady && (
          <Suspense fallback={null}>
            <StickyCTA />
          </Suspense>
        )}
      </div>
      <Analytics />
      <SpeedInsights />
    </ReserveProvider>
  )
}
