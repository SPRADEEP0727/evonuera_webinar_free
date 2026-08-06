# Evonuera — AI Masterclass Landing Page

A premium, dark-themed (with alternating light sections) landing page for the
**Evonuera** free live masterclass — *"The Complete Roadmap to Building AI Systems & AI Products"*.

- **Free Live Masterclass · In Tamil**
- **Sunday, 16 August · 10:00 – 11:30 AM IST**

## Tech stack

- **React 18** + **Vite**
- **Tailwind CSS** (Evonuera brand palette: purple `#8c52ff` → coral `#ff5757` on `#09070b`)
- **Framer Motion** animations
- **Geist** typeface + **lucide-react** icons

## Features

- Mobile-first, responsive, SEO-friendly (meta + Open Graph + JSON-LD Event schema)
- Floating AI-inspired background, glassmorphism, smooth scrolling
- Persistent "Reserve My Free Seat" CTA across the whole page
- Free 2-step registration (modal + inline): **Details → Watch the embedded webinar + Join WhatsApp**
- Gated **webinar player** (webinar.gg embed) that unlocks after a free registration
- **Lead capture** to a Google Sheet on every registration (via Google Apps Script webhook)

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Configuration

Set your links in [`src/config.js`](src/config.js):

```js
export const WEBINAR_EMBED_URL = 'https://webinar.gg/embed/your-id'
export const WHATSAPP_COMMUNITY_LINK = 'https://chat.whatsapp.com/your-invite'
export const LEAD_WEBHOOK_URL = 'https://script.google.com/macros/s/.../exec' // optional
```

> **Lead capture:** paste your Google Apps Script Web App `/exec` URL into
> `LEAD_WEBHOOK_URL` and every registrant (name, email, phone, profession) is
> appended to your Google Sheet before the webinar unlocks. Leave empty to skip.
