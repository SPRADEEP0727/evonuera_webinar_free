import { lazy, Suspense } from 'react'
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

export default function App() {
  return (
    <ReserveProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        <Background />
        <Navbar />
        <main className="relative z-10 pb-28">
          <Hero />
          <Suspense fallback={null}>
            <BelowFold />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <StickyCTA />
        </Suspense>
      </div>
      <Analytics />
      <SpeedInsights />
    </ReserveProvider>
  )
}
