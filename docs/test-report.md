# Test report

**Written by:** jonashey1 — Team 11 (T11-S3F8)

This report records what we learned by watching a person use the Cookie Shop, what we changed because of it, and the release checks. Human observations and automated or AI-agent checks are kept apart: only the sessions in the first three sections were people using the site.

## What was tested, and how

### Session 1 — ordering task

- **Task, as read to the participant:** "Order three cookies through the Cookie Shop website. Select the cookies, enter the required customer details and complete the order."
- **Who took part:** One family member (the sister of a team member). What she had seen of the site before was not recorded.
- **Version of the site:** the ordering system from PR #12, production address https://team11-cookie-shop.vercel.app/clinics
- **Device:** laptop. Browser and place were not recorded.
- **Date:** 23 November 2026.
- **Success criterion:** she completes the order without help.

### Session 2 — free exploration, then ordering

- **Who took part:** the same participant.
- **Task:** she first explored the site freely (including the chatbot). The observer then asked whether she could place an order.
- **Devices:** iPhone and laptop. Browser versions were not recorded.
- **Duration:** about three minutes in total; no timing per device.
- **Date:** 23 November 2026.

### Session 3 — retest after the change

- **Who took part:** the same participant.
- **Task:** revisit the updated homepage and find where to order cookies.
- **Version:** the homepage after PR #17 (Order Cookies button in the hero). The exact build and device were not recorded.
- **Date:** recorded on 23 November 2026 (PR #18).

## What we saw

| # | Behaviour (what you saw) | Interpretation (what you think it means) | Uncertainty (what you are not sure of) |
| --- | --- | --- | --- |
| 1 | Session 1: she ordered three cookies without help and without reporting difficulties. | The ordering form was understandable for this participant. | One participant cannot represent all users. |
| 2 | Session 2: she explored the site and the chatbot first; after being asked to order, she completed the order without visible difficulty. | The order flow itself works once a user is on it. | We do not know whether she would have found ordering without the observer's prompt. |
| 3 | Session 2, afterwards: she said it was not immediately easy to find where to order cookies. | Ordering was not discoverable enough from the homepage. | This is reported feedback; her click path and hesitation time were not recorded. |
| 4 | Session 2: she said she liked dark mode and larger text, which helped her read. | The existing accessibility options were useful to her. | Her preference does not establish accessibility for other users. |
| 5 | Session 3: she said ordering was clearer and easier to find than before. | The hero button improved discoverability for this participant. | Reported judgement, no timing; the same participant already knew the site. |

## What we changed, and the retest

- **Finding 3 (ordering hard to find):** we added a prominent **Order Cookies** button to the homepage hero, a direct button in the homepage order card, and removed outdated "coming soon" copy. **Pull request: #17.**
- **Retest:** Session 3, recorded on 23 November 2026 in **#18**: the same participant found the ordering page more easily and said it was clearer. Result: improved, as reported by the participant.
- **Findings 1, 2, 4 and 5:** no change was needed.

Earlier versions of this report said the retest was "pending"; that described the state before Session 3 and is replaced by the result above.

## The release check

Manual acceptance checks on production (https://team11-cookie-shop.vercel.app/), 23 November 2026, by a team member:

| Requirement | Check | Result |
| --- | --- | --- |
| R1 | On /clinics order 2 Classic Chocolate Chip and 3 Double Chocolate with fictional details. | Passed: confirmation shown. |
| R2 | Open the new order in /admin → Orders and compare items. | Passed: both products with the correct quantities. |
| R3 | Inspect all six cookies without ordering. | Passed: each shows name, flavour, description and price. |
| R7 | Complete an order with fictional details. | Passed: no payment step or payment data asked. |

Also observed on production on 23 November 2026: a fictional order persisted in Payload (status New), Vercel Web Analytics showed page views (1 visitor, 7 page views at that moment), and the contact page showed the OpenStreetMap integration with its privacy notice.

Automated and agent checks (not human observation):

- **PR #27 candidate, 24 November 2026:** GitHub Actions run #115 on commit 599c10c passed all jobs (unit tests, types, migrations, browser checks with 72 Playwright tests passed and 4 skipped, AI note, leftovers). Locally: ESLint, TypeScript, build and 44 Vitest tests passed; 20 cold-cache local load samples of / and /cookies were all under 3 s (R8); responsive checks at ten widths from 320 to 1440 px.
- **Production, 24 November 2026 (browser agent):** the public course check finds a Team 11 order in `orders.name`; every workshop page links to its topics and every topic page lists its workshops, both ways consistent; the footer shows T11-S3F8 on all public routes; `/api/orders` refuses a guest (403); the opt-in map loads OpenStreetMap after the click.

**Conditions of these results:**

| Check | Device and browser | Network | Lab or field |
| --- | --- | --- | --- |
| Manual acceptance checks, 23 Nov | Laptop, browser not recorded | Home connection, not throttled | Lab (team member) |
| Keyboard-only path and 390 px width on production, 24 Nov | Chromium-based browser pane of the Claude desktop app on a laptop; 390 × 844 px by emulation | Home broadband, not throttled | Lab (browser agent) |
| CI run #115 | GitHub-hosted Linux runner, Chromium and WebKit | Local test server, no real network | Lab |
| R8 timing (20 samples) | Local machine (automated run by Codex), empty cache; browser per the final audit | Local production build, no real network | Lab; no field data from real users |

Not tested under these conditions: a physical phone, a throttled mobile network, a screen reader, and field data from real users.

**Improvement with its evidence:** the homepage Order Cookies button (#17), retested in Session 3 (#18).

## Not tested yet

- **The informational task with a person** (find and compare cookies): only tested automatically. Risk: comparison or the Taste Map may be less clear to real users than the tests suggest.
- **A second, independent participant:** all sessions used one person who knew the site by Session 3. Risk: findings may not generalise.
- **Physical-device keyboard-only and screen-reader runs:** only automated axe, keyboard tests and viewport emulation. Risk: assistive-technology problems may remain.
- **Hosted performance of the PR #27 preview:** blocked by Vercel preview protection; to be measured on production after merge.
- **Chatbot answer quality:** the Watermelon widget loads, but its answers were not systematically checked. Risk: it may give inaccurate information about prices or the fictional status of the shop.

## Workshop registration extension

The isolated release build and committed migration were checked separately from the historical usability sessions above. Vitest passed 56 checks, including workshop input validation and Brussels time formatting. The workshop browser and database suite passed 8 checks in WebKit (two runs) and 4 in Chromium against disposable PostgreSQL 16. It verified persistence, stale availability recovery, keyboard focus, widths from 320 to 1440 px with accessibility settings, axe, guest access denial, competing and duplicate requests, historical snapshots and editor cancellation. An upgrade rehearsal from the preceding migration added eight sessions linked to four existing workshops and retained all six cookies. This is automated evidence. No human usability session was conducted for the workshop extension.

## Global basket extension

The isolated production build and all 59 Vitest checks passed. The targeted basket and existing box/checkout suite passed 10 checks each in Chromium and WebKit. Coverage includes the old storage format, totals and removals, grouped boxes and preview text after reload, drawer focus and Escape, the Fortune Cookie timer, checkout, and seven widths from 320 to 1440 px with accessibility preferences and an axe scan. Workshop detail navigation and its registration section were checked without making a registration. This evidence is automated. No new human usability session was conducted.
