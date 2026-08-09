import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  Lock,
  Calendar,
  Clock,
  Loader2,
} from 'lucide-react'
import {
  RAZORPAY_LINK,
  WHATSAPP_COMMUNITY_LINK,
  LEAD_WEBHOOK_URL,
  EVENT_PRICE,
  EVENT_DATE,
  EVENT_TIME,
} from '../config.js'

const professions = [
  'Software Engineer',
  'IT Professional',
  'Student',
  'Developer',
  'Freelancer',
  'Founder',
  'Tech Enthusiast',
  'Other',
]

const steps = ['Details', 'Payment', 'Community']

/**
 * Reusable 3-step reservation flow:
 *   1. Details form  →  2. Razorpay payment  →  3. Join WhatsApp community
 * Styled for a light (white) surface - used inside the modal and the
 * inline Registration section.
 */
export default function ReserveFlow({ initialStep = 0 }) {
  const [step, setStep] = useState(initialStep) // 0 details · 1 payment · 2 community
  const [form, setForm] = useState({ name: '', email: '', phone: '+91 ', profession: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const submittedRef = useRef(false) // hard guard against double submissions

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (!form.name.trim()) er.name = 'Please enter your name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = 'Enter a valid email'
    if (!/^[\d\s+()-]{7,}$/.test(form.phone)) er.phone = 'Enter a valid phone number'
    if (!form.profession) er.profession = 'Select your profession'
    return er
  }

  const captureLead = () => {
    // Fire-and-forget POST to a Google Apps Script Web App that appends the
    // lead to a Google Sheet. Uses no-cors + text/plain so the browser sends
    // it without a CORS preflight; we don't need to read the response.
    if (!LEAD_WEBHOOK_URL) return
    try {
      fetch(LEAD_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          ...form,
          price: EVENT_PRICE,
          source: 'landing-page',
          submittedAt: new Date().toISOString(),
        }),
      }).catch(() => {})
    } catch {
      /* network unavailable - ignore, never block the user */
    }
  }

  const submitDetails = (e) => {
    e.preventDefault()
    if (submittedRef.current) return // ignore rapid double taps
    const er = validate()
    if (Object.keys(er).length) return setErrors(er)
    submittedRef.current = true
    setSubmitting(true)
    captureLead() // save the lead to Google Sheet before payment
    setStep(1)
  }

  const goToPayment = () => {
    // Save the lead locally, then redirect (same tab) to Razorpay with the
    // customer's details prefilled. After a SUCCESSFUL payment, Razorpay
    // returns to this site (configure the payment link's redirect URL to
    // `<your-site>/?paid=1`) and the WhatsApp community step is shown
    // automatically. WhatsApp is never revealed before payment.
    try {
      sessionStorage.setItem('evonuera_lead', JSON.stringify(form))
    } catch {
      /* storage unavailable - ignore */
    }

    const p = new URLSearchParams()
    if (form.name) p.set('prefill[name]', form.name)
    if (form.email) p.set('prefill[email]', form.email)
    if (form.phone) p.set('prefill[contact]', form.phone)
    const sep = RAZORPAY_LINK.includes('?') ? '&' : '?'
    window.location.href = `${RAZORPAY_LINK}${sep}${p.toString()}`
  }

  const joinCommunity = () => {
    window.open(WHATSAPP_COMMUNITY_LINK, '_blank', 'noopener,noreferrer')
  }

  return (
    <div>
      {/* Step indicator */}
      <div className="mb-6 flex items-center gap-2">
        {steps.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold transition-colors ${
                  i < step
                    ? 'bg-emerald-500 text-white'
                    : i === step
                    ? 'bg-grad-brand text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {i < step ? '✓' : i + 1}
              </span>
              <span
                className={`hidden text-xs font-semibold sm:block ${
                  i <= step ? 'text-slate-900' : 'text-slate-400'
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span
                className={`h-px flex-1 ${i < step ? 'bg-emerald-400' : 'bg-slate-200'}`}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1 - details */}
        {step === 0 && (
          <motion.form
            key="details"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
            onSubmit={submitDetails}
            noValidate
            className="space-y-4"
          >
            <div>
              <h3 className="font-display text-xl font-bold text-slate-900">Reserve your seat</h3>
              <p className="mt-1 text-sm text-slate-500">Fill your details to continue - takes 20 seconds.</p>
            </div>

            <Field icon={User} label="Full Name" placeholder="Your name" value={form.name} onChange={update('name')} error={errors.name} autoComplete="name" />
            <Field icon={Mail} label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={update('email')} error={errors.email} autoComplete="email" />
            <Field icon={Phone} label="Phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={update('phone')} error={errors.phone} autoComplete="tel" />

            <div>
              <label htmlFor="field-profession" className="mb-1.5 block text-sm font-medium text-slate-700">
                Profession
              </label>
              <div className="relative">
                <Briefcase className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                <select
                  id="field-profession"
                  value={form.profession}
                  onChange={update('profession')}
                  className={`w-full appearance-none rounded-xl border bg-slate-50 py-3 pl-11 pr-10 text-sm outline-none transition-colors focus:border-brand-purple/60 focus:bg-white ${
                    errors.profession ? 'border-red-400' : 'border-slate-200'
                  } ${form.profession ? 'text-slate-900' : 'text-slate-400'}`}
                >
                  <option value="" disabled>Select your profession</option>
                  {professions.map((p) => (
                    <option key={p} value={p} className="bg-white text-slate-900">{p}</option>
                  ))}
                </select>
                <svg className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </div>
              {errors.profession && <p className="mt-1.5 text-xs text-red-500">{errors.profession}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary mt-1 w-full disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                  Reserving your seat...
                </>
              ) : (
                <>
                  Continue to Payment - {EVENT_PRICE}
                  <ArrowRight className="h-4.5 w-4.5" />
                </>
              )}
            </button>
            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
              <Lock className="h-3 w-3" /> Your details are safe with us. No spam.
            </p>
          </motion.form>
        )}

        {/* STEP 2 - payment */}
        {step === 1 && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="font-display text-xl font-bold text-slate-900">Complete your payment</h3>
            <p className="mt-1 text-sm text-slate-500">
              A one-time {EVENT_PRICE} confirms your live seat. After a successful payment you'll
              return here to join the WhatsApp community.
            </p>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">AI Masterclass - Live Seat</span>
                <span className="font-display text-2xl font-bold text-slate-900">{EVENT_PRICE}</span>
              </div>
              <div className="mt-3 space-y-1.5 border-t border-slate-200 pt-3 text-xs text-slate-500">
                <p className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-brand-purple" /> {EVENT_DATE}</p>
                <p className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-brand-coral" /> {EVENT_TIME}</p>
              </div>
            </div>

            <button onClick={goToPayment} className="btn-primary mt-5 w-full">
              <CreditCard className="h-4.5 w-4.5" />
              Pay {EVENT_PRICE} with Razorpay
            </button>
            <button
              onClick={() => setStep(0)}
              className="mt-3 flex w-full items-center justify-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800"
            >
              <ArrowLeft className="h-4 w-4" /> Edit my details
            </button>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5" /> Secure checkout powered by Razorpay
            </p>
          </motion.div>
        )}

        {/* STEP 3 - WhatsApp community */}
        {step === 2 && (
          <motion.div
            key="community"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-9 w-9 text-emerald-500" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold text-slate-900">
              Payment successful! 🎉
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
              Your seat is confirmed. Join our WhatsApp community now - that's where you'll get the
              joining link, reminders and resources for the masterclass.
            </p>

            <button
              onClick={joinCommunity}
              className="mx-auto mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 font-semibold text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-8px_rgba(37,211,102,0.75)]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Join WhatsApp Community
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({ icon: Icon, label, error, ...props }) {
  const id = `field-${label.toLowerCase().replace(/\s+/g, '-')}`
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
        <input
          id={id}
          aria-invalid={error ? 'true' : undefined}
          {...props}
          className={`w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-purple/60 focus:bg-white ${
            error ? 'border-red-400' : 'border-slate-200'
          }`}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}

function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  )
}
