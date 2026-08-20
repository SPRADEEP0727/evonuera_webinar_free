import { LazyMotion, domAnimation } from 'framer-motion'

/**
 * framer-motion feature scope. Importing `motion` pulls in every feature -
 * including the drag and layout-projection code this site never uses. `m`
 * plus an explicit `domAnimation` bundle ships only animation, exit, variants
 * and the viewport observer behind whileInView.
 *
 * `strict` makes a stray `motion.*` throw rather than silently reintroducing
 * the full bundle. Wrapped at each lazy entry point rather than in App, so the
 * features stay out of the initial chunk without an async feature load that
 * could leave reveal-animated content stuck at opacity 0.
 */
export default function Motion({ children }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
