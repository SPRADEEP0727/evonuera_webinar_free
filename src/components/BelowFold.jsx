import Marquee from './Marquee.jsx'
import PainPoints from './PainPoints.jsx'
import Curriculum from './Curriculum.jsx'
import LiveDemo from './LiveDemo.jsx'
import Curiosity from './Curiosity.jsx'
import Audience from './Audience.jsx'
import Trainer from './Trainer.jsx'
import Registration from './Registration.jsx'
import FAQ from './FAQ.jsx'
import Motion from './Motion.jsx'

/**
 * Everything below the hero, bundled into a single lazy chunk. None of it is
 * visible on first paint, but statically it dragged framer-motion and the
 * whole section tree into the initial bundle - which the browser had to parse
 * before the hero could render at all. Grouped into one module (rather than
 * one lazy() per section) so it costs a single request, not nine.
 */
export default function BelowFold() {
  return (
    <Motion>
      <Marquee />
      <PainPoints />
      <Curriculum />
      <LiveDemo />
      <Curiosity />
      <Audience />
      <Trainer />
      <Registration />
      <FAQ />
    </Motion>
  )
}

// Same chunk, so importing it costs nothing extra.
export { default as StickyCTA } from './StickyCTA.jsx'
