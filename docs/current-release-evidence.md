# Current release evidence

Audit baseline: GitHub main at ec0f5d6835da5b434f78bf2d619fc2b8d02aa0f4, 26 November 2026. The team handover records a saved Final hand-in for e88d6f9bd60eaa2b67da38ee5a93b6dde36bc7b4. The signed-in course card was unavailable for independent verification. PR #39 added About copy and PR #40 added the cookie comparison FAQ entry. Historical screenshots and reports document their named stages.

## Grading cross-check

The public course chapters were unavailable without access. The table uses the repository's earlier course excerpts and [academic audit](final-academic-compliance.md), so the authenticated grading list and award remain for the course reviewer to confirm.

| Criterion recorded in the course evidence | Current evidence | Limit |
| --- | --- | --- |
| Original transaction | Order Cookies at /clinics saves a fictional order to Orders and returns a confirmation. D1, D2 R1/R2/R5/R7 and D6 trace the checks. | Production evidence comes from prior accepted orders and the read-only course checker. |
| Original information task | Our Cookies at /cookies displays product descriptions and prices, and compares two or three cookies at #compare-cookies. D2 R3/R4 and D6 trace the checks. | Independent human observation of the current comparison remains unverified. |
| Six to nine pages | Nine under the documented rule: home, cookies, Finder, Order Cookies, workshop overview, About and Contact, plus two detail templates for workshops and topics. | The saved course card's count was not independently inspected. |
| Topic collections | Four core collections: Cookies, Orders, Workshops and Topics. Workshop Sessions and Workshop Registrations add two voluntary topic collections. | Generic CMS and legacy booking collections do not count. |
| Public many-to-many | Workshop detail lists topics. Topic detail lists matching workshops using the reverse join. | The relationship is covered by prior production and isolated evidence. |
| Site-specific content, design and accessibility | Cookie product content, original design rationale, keyboard and viewport checks, accessibility controls and D6 findings. | Automated checks cannot establish full conformance or substitute for human observations. |
| Analytics and integration | D5 records Vercel Web Analytics and the opt-in OpenStreetMap campus map. | A custom Vercel order event and current signed-in dashboard evidence are unverified. |
| D0 through D7 | D0 team agreement, D1 brief, D2 requirements, D3 structure, D4 design, two D5 records, D6 test report and D7 handover are linked from the README. | Handover backups and an isolated recovery rehearsal still need confirmation. |
| Release and individual contribution | GitHub includes merged code PRs for Jonas, Tessa (#37), Esma (#38) and Yana (#39). | Arnaud and Xander lack independently verified qualifying evidence. Check the signed-in card for acceptance and teacher access. Preserve truthful AI notes and do not infer authorship from assigned roles. |

## Current implementation and optional work

Cookie Finder recommends a product and the Passport shows the recommendation's inputs. Comparison supports two or three cookies on the assortment. The global basket and the personalised four-slot Box Builder share per-tab browser state; checkout sends combined quantities and the server persists price snapshots. Workshop sessions and registration references are separate from course orders. Editors can view aggregate Order Analytics and export CSV under the same access controls. Fortune Cookie is on About, the commercial and transcript are on the homepage, and accessibility preferences are available in the site controls. Contact hosts the FAQ, including comparison, and loads OpenStreetMap after activation. Vercel Web Analytics and the map support D5; the optional features do not replace the two original tasks.

## Test evidence

- D6 retains the original participant observations and the reported retest. No new participant session was conducted for this documentation audit.
- The 26 November isolated review of the About-only candidate recorded ESLint, TypeScript, 73 Vitest passes, a successful build and ten applied migrations. Chromium reported 90 passes and four existing skips. Windows WebKit reported 88 passes, four skips and two video response-event timeouts. Direct playback and an HTTP 206 media response were verified separately. Those results apply to that candidate, which preceded the current FAQ merge.
- The four earlier workshop failures on production used a CI-only workshop record. The isolated fixture-driven workshop checks passed in both browsers at both widths. A separate read-only production check verified the deployed workshop image, keyboard navigation and the registration screen.
- Earlier R8 performance figures apply to the named release in D2. The new audit does not relabel them as measurements of the current deployment.

- The documentation audit re-ran ESLint, TypeScript, 73 Vitest tests and the local production build against the ec0f5d6 application tree. Read-only live checks returned HTTP 200 for the home, assortment, ordering, workshops, About, Contact and team checker, and followed the four legacy redirects to the expected sections. These responses do not establish a new human usability or performance result.

## Hand-in

Check the signed-in Final hand-in card for the saved commit, accepted teacher access and the individual evidence. After a documentation-only merge, refresh the card if the course requires the latest docs SHA or explicitly permits and expects a resubmission. If it requires the same commit on GitHub and Vercel, first verify a Ready deployment for the intended SHA. Do not create a new production order while the existing course evidence is valid.
