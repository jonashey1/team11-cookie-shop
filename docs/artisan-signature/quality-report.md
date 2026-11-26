# Artisan Signature quality report

> This record describes the implementation or evidence at the stage named below. See the [current release evidence](../current-release-evidence.md) for the latest verified status.

This is a voluntary creative improvement outside the required H2 scope. It may qualify for bonus consideration. Course requirements, safe ordering, accessibility and usability take priority over presentation. This review is internal technical work, not evidence from students or research participants.

## Scope and decisions

| Area | Change | Reason and verification |
| --- | --- | --- |
| Homepage and commercial | Clear USP near the ordering links, tighter mobile hero, editorial borders and a pre-optimised 26.5 KB WebP made from the existing hero illustration. | Makes discovery and ordering visible earlier. The existing commercial, poster, player, transcript and links stay in place. Baseline mobile Chrome timed out on the 384 px image-optimiser request. The hero now serves the derivative directly. |
| Catalogue and workshops | Six taste notes and restrained colour accents, with existing prices and actions. The cookie assortment renders before the separate live workshop read completes. | Pilot rationale is faster access to the six cookies without caching or duplicating CMS data. The product catalogue still owns the descriptions, prices, and order values. |
| Finder, comparison and box | More compact questions, ready-state protection for early answer input, subtle table banding, and a kraft-coloured four-compartment tray. | Existing scoring, seven comparison characteristics, optional highlighting and four-slot interactions remain covered by browser tests. |
| Checkout and secondary pages | More distinct basket, empty, form and receipt states. Less repetition in shared title panels. Compact chocolate footer with a theme-aware focus colour. | Keep functional labels and the Team 11 code visible. Check keyboard interaction, responsive layout and contrast. |
| Reliability | Reject coerced types and malformed order references before looking up Payload; retain catalogue price calculation and existing duplicate-save protection. | Unit validation and two isolated browser submissions verified the exposed flows. |
| Dependencies | Update the existing Next.js line to 16.4.6 and sharp to 0.35.5. Align Next.js environment and lint packages and refresh an in-range source-map-js entry. | Remove the critical report against the baseline Next.js version and the sharp report without changing the Payload peer range. [Next.js advisory](https://github.com/advisories/GHSA-2464-fhr4-w9xw) · [sharp advisory](https://github.com/advisories/GHSA-wq5f-xc86-pv6w) |

## Inventory and checks

The public inventory includes homepage/video, assortment, workshop and topic routes, Finder, comparison, fixed four-slot box, session basket, checkout, printable receipt, About, Contact, opt-in OpenStreetMap, FAQ, Fortune Cookie, privacy, optional member account, Dark Mode, the five accessibility settings and Watermelon. Payload owns editor authentication, workshop/topic relations, orders and the restricted business analytics/CSV routes. The existing members flag determines whether account routes return 404 or allow member sign-in. The team code remains T11-S3F8. Production is outside the write-test scope.

| Check | Baseline | Artisan Signature |
| --- | --- | --- |
| ESLint, TypeScript, production build | Passed | Passed |
| Vitest | 28 passed | 40 passed, including 12 negative order input cases |
| Playwright | 42 passed, 4 failed, 4 pre-existing skips locally. All failures were mobile homepage load timeouts. The prior main CI was green. | 48 passed and 4 existing skips locally. Existing assertions and skips are preserved. New tests cover interrupted order submission, retained details and basket, saving and print state. |
| Database and generated files | 8 migrations verified on loopback PGlite | No schema or migration edits. Types and admin import map regenerated without tracked changes. |

The direct order saved three cookies for €10.95. The four-cookie box order saved two of each chocolate flavour for €14.90. In both cases two immediate submit clicks produced one request and one matching Payload record, and print media retained the receipt while hiding its actions. The saved receipt omitted the submitted email. The editor successfully opened the filtered analytics dashboard and aggregate CSV. Guest and signed-in member CSV requests returned 403. The guest dashboard streamed a not-found boundary without the private data. Member login and logout, opt-in map loading and the workshop–topic round trip were also verified locally. See [direct receipt](./evidence/direct-receipt.jpg) and [box receipt](./evidence/box-receipt.jpg). Automated browser coverage also checks Finder, all comparison controls, invalid email, box replacement, suggestion confirmation, the commercial and the course route checks. The 256-case Finder test remains the coverage for all six possible winners.

Chrome checked fourteen page routes across 320, 360, 390, 414, 768, 1024, 1100, 1280, 1440 and 1920 CSS pixels. The optional /account route returned its expected 404 with membership disabled. No horizontal overflow, unexpected 5xx responses or uncaught page errors were observed in this scan. A 768 × 390 pass covered a short landscape viewport. Twenty-seven axe scans across nine critical pages found no serious or critical issues, including a mobile pass with Dark Mode and all five options enabled. This does not establish full WCAG conformance.

Chrome and Firefox on Windows completed Finder, box-to-basket and H.264 commercial playback. Playwright WebKit could not start on this host due to missing system prerequisites. No physical iOS device was used.

## R8 before and after

Three navigations per case in Chrome on local production builds, with fresh contexts and the browser cache disabled. Each time is from navigation start to visibility of the homepage H1 or the assortment heading. External assets were excluded consistently. Values are minimum / median / maximum, in milliseconds.

| Route | Width | Before | After |
| --- | ---: | ---: | ---: |
| Homepage | 390 px | 52 / 66 / 70 | 60 / 73 / 117 |
| Assortment | 390 px | 94 / 94 / 117 | 108 / 109 / 579 |
| Homepage | 1100 px | 49 / 52 / 52 | 63 / 67 / 106 |
| Assortment | 1100 px | 73 / 95 / 96 | 84 / 89 / 99 |

The largest after sample was the first mobile assortment load on the restarted local build. A separate early baseline sample reached 456 ms under the same heading measurement. There is insufficient evidence to attribute the difference to one change. Every sample is under three seconds, but protected hosted-preview and fresh production verification remain separate. A historical production mobile assortment measurement exceeded three seconds. The commercial regression confirms that no MP4 is requested before activation. The isolated missing-video test provided the expected direct-download recovery link. The local team course-check endpoint returned 200 with the existing response keys.

## Review and handover

- Peer walkthrough. Start at the homepage, watch or read the commercial, complete Finder, select three products for comparison, edit a four-cookie box and review the basket. Demonstrate checkout submission only with a disposable database. On mobile also try keyboard focus, Dark Mode and the Accessibility Centre. The repeated route links help users discover the tools but the assortment and workshops share one page, so the section links should be demonstrated.
- Academic review. Show the two distinct customer tasks, matching Payload storage and data access scopes, the local and CI evidence, and the difference between automated checks and observed human testing. See the [requirements matrix](./requirements-traceability.md) and [peer and usability protocol](./review-protocol.md). No marks or hand-in acceptance are assumed.
- Remaining human checks. Supply the current Ufora rubric and submission instructions, including the exact H1–H3 hand-in requirements and thresholds visible in the course app. Verify enrolled team membership, effective teacher access, contribution credit, the expected submission commit, and any missing D1–D6 artifacts or required participant retests. No hand-in, Git attribution or production write was done.
- Residual technical limits. Hosted verification requires the authenticated Vercel preview when protected. Watermelon is unchanged and chat delivery was not tested. The audit still reports transitive advisories including Payload's pinned undici and Lexical's happy-dom versions. They require upstream-compatible follow-up. Do not interpret removal of the critical finding as a clean audit.

## Evidence

[Before homepage 390 px](./evidence/before-390-home.jpg) · [After homepage 390 px](./evidence/after-390-home.jpg) · [Before homepage 1100 px](./evidence/before-1100-home.jpg) · [After homepage 1100 px](./evidence/after-1100-home.jpg) · [Commercial](./evidence/after-1100-commercial.jpg) · [Accessibility Centre](./evidence/accessibility-dark-390.jpg) · [Footer](./evidence/after-1100-footer.jpg) · [Full evidence directory](./evidence/)

AI assistance covered analysis, code changes, automated testing and documentation for this PR. Actual human contributions require separate evidence.
