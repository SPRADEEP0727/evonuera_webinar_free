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
 * Fire the registration-complete conversion when the popup form is submitted.
 * Sends two standard events so both funnel steps are measurable in Meta:
 *   • CompleteRegistration - the "registration finished" step (pairs with the
 *     PageView "landing visit" step to form a 2-step funnel).
 *   • Lead - kept for lead-generation ad optimisation.
 * Each event carries its own eventID for browser/server deduplication.
 */
export function trackLead() {
  if (typeof window === 'undefined' || !window.fbq) return
  const details = { content_name: 'Free AI Masterclass Registration' }
  window.fbq('track', 'CompleteRegistration', details, { eventID: newEventId() })
  window.fbq('track', 'Lead', details, { eventID: newEventId() })
}

/** Fire a custom event when a visitor clicks "Join WhatsApp Community". */
export function trackJoinCommunity() {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq(
      'trackCustom',
      'JoinWhatsAppCommunity',
      { content_name: 'WhatsApp Community Join' },
      { eventID: newEventId() },
    )
  }
}
