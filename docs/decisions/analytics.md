# Decision: analytics

## The question

- **The question:** How can Team 11 see whether visitors reach the cookie pages and successfully complete the fictional ordering task?
- **The need or requirement behind it:** The final project requires working analytics; the team also needs a privacy-conscious way to spot problems in the primary task.

## Options considered

| Option | What it would give | What it would cost |
| --- | --- | --- |
| No analytics | No tracking or setup | No evidence of page visits or task completion |
| Vercel Web Analytics | Page views within the existing hosting platform; a saved order shows as a page view of `/clinics/confirmed` | Setup and verification time; custom events need a paid plan, so they are not shown on Hobby |
| Self-hosted Matomo | More control over collected metrics | A separate server, maintenance and privacy configuration |

## The decision

- **We chose:** Vercel Web Analytics.
- **What we installed, and where its settings are:** `@vercel/analytics` is already a project dependency. The site layout mounts `<Analytics />`. After a successful server response, `src/components/site/CookieOrderForm.tsx` changes the address to `/clinics/confirmed` (PR #30), which Vercel records as a page view; it also still calls `track('cookie_order_saved')` for a future paid plan. The helper is in `src/lib/analytics.ts`. Vercel project > Analytics is the provider dashboard. No customer names or email addresses are passed to tracking.
- **How we checked that it does what we expected:** On 23 November 2026 the dashboard showed 1 visitor and 7 page views after test browsing. On 24 November 2026 it showed 20 visitors and 165 page views for the last 7 days (production), with `/`, `/workshops`, `/cookie-finder`, `/clinics`, `/contact` and `/faq` among the pages. Its Events tab said "No custom events": the Hobby plan drops `track()` events, so the order event never arrived. That is why PR #30 marks a saved order with the page view `/clinics/confirmed`. Primary-task check on production (commit 7936846), 24 November 2026 at 22:58 CET: one fictional test order (order record 7, reference `Cookie order T11-S3F8 - 6ded9663…`, 1 × Classic Chocolate Chip, made-up name and an `.example` address). The address changed to `/clinics/confirmed` and the browser sent the Vercel Analytics `view` request, answered with HTTP 200, right after the order (network log). At 22:59 the dashboard's Pages list did not show `/clinics/confirmed` yet; Vercel processes page views with a delay, so check the Pages list again before relying on it. The Events tab still says custom events need a Pro team.
- **Who took part in the decision:** Proposed for Team 11; the team must confirm this decision before the final hand-in.

## Why

- **Why we chose it:** The website already deploys on Vercel, and the starter includes `@vercel/analytics` and the analytics helper. This minimises changes to the working order flow. Page views are sufficient to check basic reach; the successful-order event is additional instrumentation.
- **What this evidence cannot tell us:** A view of `/clinics/confirmed` counts confirmations shown, not orders stored: a user who reloads that address is counted again. The order records in `/admin` stay the source of truth for orders.

## Consequences

- **Its cost in money and in time:** No extra software installation; analytics is enabled and was inspected in Vercel on 23 November 2026; continue checking it. Pricing and quotas depend on the current Vercel plan.
- **Who maintains it:** Website maintainer (team role).
- **What we give up:** No custom-event reporting or full conversion funnel on the Hobby plan; the order is counted through a page view instead.
- **How we could leave the tool later:** Remove `<Analytics />` from the layout and the event call; disable analytics in Vercel.
- **The data it collects about our users, and whether it needs a cookie banner:** Page-view metadata are processed by Vercel; no names, emails or order details are sent in the custom event. Verify current provider privacy/cookie documentation before publishing a privacy statement; the integration itself does not set a marketing-cookie consent flow.

## Facts read on

| Page | Its link | Read on |
| --- | --- | --- |
| Existing starter analytics implementation | `src/lib/analytics.ts` and `src/app/(site)/layout.tsx` | 23 November 2026 |
| Vercel Web Analytics documentation (provider reference; live policy to recheck) | https://vercel.com/docs/analytics | 23 November 2026 (dashboard checked; provider policy should be rechecked) |

## Review when

Review when the Vercel plan changes, the site begins handling real orders, or the team needs order-level conversion reports instead of page views.
