// ─────────────────────────────────────────────────────────────
//  Meta (Facebook/Instagram) Pixel helper
//  Loads the pixel only when META_PIXEL_ID is set in config.js.
// ─────────────────────────────────────────────────────────────
import { META_PIXEL_ID } from './config.js'

/**
 * Generate a unique event id. Passed to fbq as `eventID` so that when the
 * same event is also sent to Meta's Conversions API (server side), Meta can
 * deduplicate the browser + server copies instead of double-counting them.
 */
function newEventId() {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  } catch {
    /* fall through */
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

/** Inject the Meta Pixel base code and track the initial PageView. */
export function initPixel() {
  if (!META_PIXEL_ID || typeof window === 'undefined') return
  if (window.fbq) return // already initialised

  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = !0
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e)
    t.async = !0
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  /* eslint-enable */

  window.fbq('init', META_PIXEL_ID)
  window.fbq('track', 'PageView', {}, { eventID: newEventId() })
}

/**
 * Start the pixel outside the critical path. fbevents.js costs ~230KB and
 * ~220ms of main thread; loading it during first paint pushed out LCP and
 * accounted for most of the page's blocking time.
 *
 * Whichever comes first wins: the browser going idle after `load`, or the
 * visitor's first interaction. Conversions are safe either way - trackLead()
 * and trackJoinCommunity() initialise on demand, and fbq queues calls made
 * before the script finishes downloading.
 */
export function schedulePixel() {
  if (!META_PIXEL_ID || typeof window === 'undefined') return

  const wake = ['pointerdown', 'keydown', 'touchstart', 'scroll']
  let started = false

  const start = () => {
    if (started) return
    started = true
    wake.forEach((e) => window.removeEventListener(e, start))
    initPixel()
  }

  wake.forEach((e) => window.addEventListener(e, start, { passive: true }))

  const whenIdle = () => {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(start, { timeout: 2500 })
    } else {
      setTimeout(start, 1500)
    }
  }

  if (document.readyState === 'complete') whenIdle()
  else window.addEventListener('load', whenIdle, { once: true })
}

/**
 * Fire the registration-complete conversion when the popup form is submitted.
 * Sends two standard events so both funnel steps are measurable in Meta:
 *   • CompleteRegistration - the "registration finished" step (pairs with the
 *     PageView "landing visit" step to form a 2-step funnel).
 *   • Lead - kept for lead-generation ad optimisation.
 * Each event carries its own eventID for browser/server deduplication.
 */
export function trackLead() {
  if (typeof window === 'undefined') return
  initPixel() // no-op once loaded; guarantees the event is never dropped
  if (!window.fbq) return
  const details = { content_name: 'Free AI Masterclass Registration' }
  window.fbq('track', 'CompleteRegistration', details, { eventID: newEventId() })
  window.fbq('track', 'Lead', details, { eventID: newEventId() })
}

/** Fire a custom event when a visitor clicks "Join WhatsApp Community". */
export function trackJoinCommunity() {
  if (typeof window === 'undefined') return
  initPixel()
  if (window.fbq) {
    window.fbq(
      'trackCustom',
      'JoinWhatsAppCommunity',
      { content_name: 'WhatsApp Community Join' },
      { eventID: newEventId() },
    )
  }
}
