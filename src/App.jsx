import { ReserveProvider } from './components/ReserveContext.jsx'
import Background from './components/Background.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Curriculum from './components/Curriculum.jsx'
import LiveDemo from './components/LiveDemo.jsx'
import Audience from './components/Audience.jsx'
import Trainer from './components/Trainer.jsx'
import Registration from './components/Registration.jsx'
import WebinarSection from './components/WebinarSection.jsx'
import FAQ from './components/FAQ.jsx'
import Footer from './components/Footer.jsx'
import StickyCTA from './components/StickyCTA.jsx'

export default function App() {
  return (
    <ReserveProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        <Background />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <Marquee />
          <Curriculum />
          <LiveDemo />
          <Audience />
          <Trainer />
          <Registration />
          <WebinarSection />
          <FAQ />
        </main>
        <Footer />
        <StickyCTA />
      </div>
    </ReserveProvider>
  )
}
