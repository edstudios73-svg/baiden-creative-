# Baiden Creatives

Website for Baiden Creatives, a creative and technology company from Accra, Ghana. Live at https://www.baidencreatives.org.

Built with Next.js (App Router), TypeScript and Tailwind CSS. Pages are statically generated. The only server code is the project-inquiry endpoint.

## Develop

Requires Node.js 22.6 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values, see "Environment variables"
npm run dev                  # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (static pages and the inquiry API) |
| `npm run lint` | ESLint (Next.js core-web-vitals and TypeScript rules) |
| `npm run typecheck` | TypeScript, no emit |
| `npm test` | Unit tests for inquiry validation and rate limiting (Node's built-in test runner) |
| `npm run check` | All of the above, in order |

After the first `npm install`, commit the generated `package-lock.json`.

## Environment variables

Set these in `.env.local` for local work, and in Vercel → Project → Settings → Environment Variables for Production (and Preview if wanted).

| Variable | Required | Secret | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | No | Canonical origin used for canonical URLs, the sitemap, robots and structured data. Defaults to `https://www.baidencreatives.org`. |
| `RESEND_API_KEY` | For the form | **Yes** | API key from [Resend](https://resend.com), used to email inquiries. |
| `INQUIRY_TO_EMAIL` | For the form | No | Inbox that receives inquiries. Comma-separate several addresses. |
| `INQUIRY_FROM_EMAIL` | For the form | No | Sender, on a domain verified in Resend, e.g. `Baiden Creatives <projects@baidencreatives.org>`. |

### Setting up form delivery

1. Create a Resend account and add `baidencreatives.org` under Domains. Add the DNS records it shows at your domain registrar and wait until it is verified.
2. Create an API key with "Sending access" only.
3. Add the three variables above in Vercel and redeploy.
4. Send a test inquiry from `/contact` and confirm it arrives. Replies go straight to the sender, because `reply_to` is set to their email.

Until all three variables are set, the API answers `503` and the form tells the visitor it isn't accepting messages. It keeps their input and offers one-click email and WhatsApp versions of the same message. It never reports success unless the email provider accepted the message.

### Form protection

- Validation runs in the browser and again on the server (`src/lib/inquiry.ts`, shared by both).
- A hidden honeypot field and a minimum fill time quietly discard bot submissions.
- Rate limit: 5 submissions per IP per 10 minutes (`src/lib/rate-limit.ts`). The counter lives in memory per server instance, so it limits bursts rather than enforcing a global quota. Swap in a shared store such as Upstash Redis if abuse appears.
- Emails are plain text, so submitted content is never rendered as HTML. Submissions are not logged; only delivery status codes are.

## Deploy

The repository is connected to Vercel and deploys `main` to production. `vercel.json` pins the framework to Next.js, which replaces the old static-site setup.

1. Push a branch and open the Vercel preview deployment. Check every route listed below.
2. Add the environment variables (see above).
3. Merge to `main`. Vercel builds and deploys production.
4. After deploying, check that `/sitemap.xml` and `/robots.txt` are served, then submit the sitemap in Google Search Console.

Preview deployments are kept out of search: `robots.txt` disallows everything unless `VERCEL_ENV` is `production`.

Old URLs redirect permanently: `/start-a-project` and `/pricing` go to `/contact`, `/organisations` goes to `/products`, and the `.html` paths go to their clean URLs.

## Routes

Four pages: `/` (home) · `/work` (explore our work) · `/about` · `/contact` (start a project). Plus `/privacy` and `/terms` (linked from the footer), the 404 page, `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image` and `POST /api/inquiry`.

Old URLs redirect permanently: `/services/*` and `/work/[slug]` go to `/work`, `/products/*` and `/organisations` go to `/about`, and `/start-a-project` and `/pricing` go to `/contact`.

## Where things live

```
src/
  config/site.ts        Company name, URL, contact details, social links, logo files, BAID X URL
  content/
    projects.ts         Portfolio and case studies (publication status controls what is public)
    services.ts         The six services and their page content
    products.ts         BAID X: live features vs in-development, kept separate
    company.ts          Process, mission, vision, philosophy, values
  lib/                  SEO helpers, inquiry validation, rate limiting, email delivery
  components/           Header, footer, cards, gallery, form and other shared UI
  app/                  Routes, metadata files (sitemap, robots, manifest, OG image) and the inquiry API
  fonts/                Self-hosted Instrument Serif, Geist, Geist Mono (SIL OFL)
public/assets/          Logos, icons and project imagery
tests/                  Unit tests
```

### Adding or editing a project

Add an entry to `src/content/projects.ts`:

- `publicationStatus: "published"` features the project in the case-study carousel on `/work` and in the index.
- `"listed"` adds it to the index on `/work`, linking to its live site.
- `"draft"` hides it everywhere. Use this for anything incomplete.

Only publish verified information. `outcomes` stays empty until the client approves specific results; the case study hides that section when it is empty. Put images in `public/assets/work/` and give each one descriptive `alt` text.

### Design system

Tokens are in `src/app/globals.css` (`@theme`):

- **Colour.** Ink `#111318`, ivory `#F5F2EC`, paper `#FBFAF7`, graphite `#5D6167` for body text on ivory (5.6:1), mist `#A6AAB0` for text on ink (8:1), and the lime accent `#C9FF54`, reserved for emphasis and focus.
- **Type.** Instrument Serif for display, Geist for text, Geist Mono for labels. The fluid scale utilities are `text-display-1…3`, `text-heading`, `text-lead` and `text-label`.
- **Layout.** `container-x` (max 1440px, fluid gutter, 16px on small phones) and `section-y`, on a 12-column grid.
- **Motion.** Reveal on scroll via one `IntersectionObserver` (`RevealObserver`), plus the hero entrance. Everything is gated by `prefers-reduced-motion`, and content stays visible without JavaScript.

## Needs company input

The site launches with this left out or marked TODO, rather than invented:

1. **Contact delivery.** A Resend account, a verified sending domain and the three environment variables.
2. **Budget bands.** The form uses US$ ranges for international clients (`src/lib/inquiry.ts`). Confirm the bands and currency.
3. **Mission, vision and values** on `/about` are drafts written for this release. They need founder approval.
4. **Founder bios and photos.** Only names and roles are published. Add approved bios and photography if wanted.
5. **Case-study outcomes.** None are published. Add client-approved results (metrics, quotes) where available.
6. **Listed projects** (BOOMiiS, Resilience Estate, EatConnect, Ompad Media) need briefs before they get case studies. Confirm whether EatConnect is client work or a concept.
7. **BAID X interface screenshots** beyond the homepage (dashboards, badge checker, escrow flow), if approved for publication. Also confirm the full web stack before listing more technologies.
8. **Legal.** Have the privacy notice and terms reviewed, and supply the registered company name if different from "Baiden Creatives".
9. **Analytics.** None is loaded. Choose a provider (for example Vercel Web Analytics) if wanted, and update the privacy notice to match.
10. **Mobile apps and creative technology.** These pages say plainly that the BAID X app is in development and that 3D and AI work isn't in the published portfolio. Update them as that changes.
