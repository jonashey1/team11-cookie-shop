# Decision: analytics

## The question

- **The question:** How can Team 11 see whether visitors reach the cookie pages and successfully complete the fictional ordering task?
- **The need or requirement behind it:** The final project requires working analytics; the team also needs a privacy-conscious way to spot problems in the primary task.

## Options considered

| Option | What it would give | What it would cost |
| --- | --- | --- |
| No analytics | No tracking or setup | No evidence of page visits or task completion |
| Vercel Web Analytics | Page views within the existing hosting platform, with a client-side completion event wired into the order form | Setup and verification time; custom events may require a paid plan |
| Self-hosted Matomo | More control over collected metrics | A separate server, maintenance and privacy configuration |

## The decision

- **We chose:** Vercel Web Analytics.
- **What we installed, and where its settings are:** `@vercel/analytics` is already a project dependency. The site layout mounts `<Analytics />`, and `src/components/site/CookieOrderForm.tsx` calls `track('cookie_order_saved')` only after a successful server response. The helper is in `src/lib/analytics.ts`. Vercel project > Analytics is the provider dashboard. No customer names or email addresses are passed to tracking.
- **How we checked that it does what we expected:** The code path was inspected in the H3 package. **Live page-view collection and event arrival have not yet been verified**; a team member must enable/check the Vercel Analytics dashboard, visit the live site and confirm a page view. On a Hobby plan, the custom event may not be available: the live order can instead be checked in Payload `/admin`.
- **Who took part in the decision:** Proposed for Team 11; the team must confirm this decision before the final hand-in.

## Why

- **Why we chose it:** The website already deploys on Vercel, and the starter includes `@vercel/analytics` and the analytics helper. This minimises changes to the working order flow. Page views are sufficient to check basic reach; the successful-order event is additional instrumentation.
- **What this evidence cannot tell us:** A code review cannot prove the provider received events or that the production dashboard is enabled. Page views alone do not measure saved orders; the free plan may not show custom events.

## Consequences

- **Its cost in money and in time:** No extra software installation; a team member must enable and inspect analytics in Vercel. Pricing and quotas depend on the current Vercel plan.
- **Who maintains it:** Website maintainer (team role).
- **What we give up:** We do not have a full conversion funnel or paid custom-event reporting on the Hobby plan.
- **How we could leave the tool later:** Remove `<Analytics />` from the layout and the event call; disable analytics in Vercel.
- **The data it collects about our users, and whether it needs a cookie banner:** Page-view metadata are processed by Vercel; no names, emails or order details are sent in the custom event. Verify current provider privacy/cookie documentation before publishing a privacy statement; the integration itself does not set a marketing-cookie consent flow.

## Facts read on

| Page | Its link | Read on |
| --- | --- | --- |
| Existing starter analytics implementation | `src/lib/analytics.ts` and `src/app/(site)/layout.tsx` | 23 November 2026 |
| Vercel Web Analytics documentation (provider reference; live policy to recheck) | https://vercel.com/docs/analytics | Verification pending |

## Review when

Review when the Vercel plan changes, the site begins handling real orders, or the team needs order-level conversion reports instead of page views.
