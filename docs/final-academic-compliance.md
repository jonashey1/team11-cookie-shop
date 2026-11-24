# Final academic compliance audit — Team 11

Audit target: [PR #27](https://github.com/jonashey1/team11-cookie-shop/pull/27), application commit `7a45b7f7aa113b2be8637ef4601c16b149213462`. Production observed separately at `a46eebb8ac2943a0e89370e59db0c84bd49ea1d7`. This is a retrospective review. No submission, production write or permission change was performed.

## Source coverage

- Official UGent section 1.3 was verified from four PDF exports of the same 16-page chapter and embedded Team 11 hand-in snapshot (24 November 2026). The live course pages still require sign-in. The chapter confirms the team cards, submission workflow and the scope listed below. The new UGent §2.1 and §3.1 exports confirm the D0 template, D5/D7 allocation and team-project minimums. §3.1 refers to a separate final grading list and assessment chapter; the seven-point subdivision is unverified. The general course export is an overview, not the full Module 10.8 grading text. The learner lecture notes informed design and content modelling.
- The [official autumn 2026 starter](https://github.com/buildingbetterwebsites/campuscycle-starter/tree/course-2026-autumn) independently confirms the decision-record and test-report formats. The repository documentation and history across the 27 remote branch names contain the two Team 11 records and D6 evidence, but no copy of the separate team-project chapter, final grading list or such a numeric participant threshold. Both course landing pages and section 1.3 online require sign-in; the supplied section 1.3 PDF remains the source for the hand-in workflow.
- The [starter check contract](COURSE-CHECK-CONTRACT.md) verifies the machine interface. The [project brief](brief.md), [requirements](requirements.md) and [historical H3 checklist](H3-final-checklist.md) are project records, not substitutes for the official rubric.
- Statuses apply only to the evidence named in each row. Scope labels identified as provisional require reconciliation with the official exports. No grade is inferred from CI.

## Course and hand-in traceability

| Identifier and requirement | Source / scope | Route, implementation and deliverable | Evidence and status | Remaining action |
| --- | --- | --- | --- | --- |
| Check-in A — team setup and D0 | Official §1.3.4 pp. 3–6; required checkpoint, ungraded | Course app; [D0 team agreement](team-agreement.md) | PARTIALLY VERIFIED — A saved at 16:29 on d7a78785e04b; teacher access flagged. GitHub confirms the starter template, and the live team code was observed. | Confirm app access and that the teacher invitation is accepted at the next authorised hand-in |
| H1 — brief and requirements | Official §1.3.4 pp. 6–9; required checkpoint, ungraded | [D1 brief](brief.md), [D2 requirements](requirements.md), project rename and merged PR AI notes | PARTIALLY VERIFIED — saved at 16:29 on d7a78785e04b with teacher access flagged. D1/D2 present, scan clean, all merged PRs carry notes; accuracy follow-up below. | Author review of the AI evidence and enable the required CI variable |
| H2 — designed and tested | Official §1.3.4 pp. 9–12; required checkpoint, ungraded | [D3 content and structure](content-structure.md), [D4 design rationale](design-rationale.md), first [D6 test report](test-report.md), primary task live end to end | PARTIALLY VERIFIED — saved at 16:29 on d7a78785e04b with teacher access flagged. Existing production order and documented usability finding with reported follow-up; PR #27 not yet live. | Preserve findings and retest evidence; verify candidate after release |
| H3 — Final hand-in | Official §1.3.4 pp. 12–15; graded team hand-in | Both working user tasks and documents with reasoning | PARTIALLY VERIFIED — saved at 16:28 on d7a78785e04b; 13 automated checks passed. The two To do entries were teacher access and five members at 0/1. The separate final grading list and teacher assessment are not supplied. | Resolve the recorded gaps, check the full grading list, then hand in approved deployed main |
| H3 — transactional configuration and code evidence | Hand-in instructions excerpt in audit; mandatory | `/clinics`, `/api/course-check`; `src/course-check.config.ts`, `src/tasks/order-cookies/saveOrder.ts`, `src/collections/Orders.ts` | VERIFIED on current production — public checker returned `orders`, `name`, `ok` and an existing matching record for `T11-S3F8`. Not an isolated test record | Recheck same endpoint after future deployment; retain existing evidence |
| H3 — connected team identity and production service | Hand-in excerpt; mandatory | Team 11, `jonashey1/team11-cookie-shop`, `main`, `team11-cookie-shop.vercel.app`, footer `T11-S3F8` | PARTIALLY VERIFIED — repository, official template and live production SHA verified; live course JSON responds and proves a working data read. Course-app access and production connection details not independently inspected | Confirm course-app access and final SHA after approved deployment |
| H3 — Campus Cycle replacements | Audit and starter workflow; mandatory | Public paths; `scripts/ci/leftovers.mjs`, `.github/workflows/ci.yml`, `src/lib/public-workshop-content.ts` | VERIFIED for the repository scan — `Leftovers: none`. PARTIALLY VERIFIED for content — 18 public production routes returned 200 and displayed the team code with no sampled bicycle text; protected, draft and legacy CMS records outside public audit | Review protected drafts and legacy records without deleting them |
| H3 — `CAMPUS_CYCLE_LEFTOVERS=fail` | Audit; mandatory | GitHub repository Actions variables | VERIFIED — GitHub repository variable API returns the exact value `fail`; local scan prints `Leftovers: none` | Check the leftovers job on the next CI run |
| H3 — teacher collaborator | Official §1.3.4 pp. 3–4; mandatory | GitHub access UI and course app | PARTIALLY VERIFIED — `jnmoons` invitation pending; the PDF records a previous failed acceptance. The app accepts the teacher’s invitation during hand-in; team members accept their own invitations before that. | Check accepted access in the card after the next authorised submission; investigate only if it fails again |
| H3 — team access | Audit; mandatory | GitHub | VERIFIED — owner/admin and other five have write access. Xander also appears in pending invitation list; effective access is already listed | Check stale invitation in UI without changing current access |
| H3 — one merged code PR per member | Progress-export threshold relayed in audit; mandatory | GitHub merged PRs and `main` author/trailer history | NON-COMPLIANT on available evidence — Jonas qualifies, five have no qualifying PR evidence | Link genuine equivalent evidence if available or complete real work; verify in course app |
| H3 — AI note | Starter workflow and audit; mandatory | Merged PR descriptions, draft #27, CI `ai-note` | PARTIALLY VERIFIED — 26/26 merged PR descriptions include a note. #21–26 state implementation support; #27 states actual assistance. #20's review-only wording conflicts with recorded work on the Artisan implementation/transfer. #19 and early self-reports cannot all be independently corroborated | Correct #20 truthfully with owner; verify and clarify #19 and mixed #11 drafting wording as warranted; do not overwrite other authors' reports |
| H3 — usability with participants | Official §1.3.4 H2 and [starter D6 template](https://github.com/buildingbetterwebsites/campuscycle-starter/blob/course-2026-autumn/docs/test-report.md); mandatory | [D6](test-report.md), [protocol](cookie-shop-usability-protocol.md) | PARTIALLY VERIFIED — one human participant, original feedback and reported follow-up exist. Further independent informational observation and version-specific retest evidence are missing | Record tasks as read, conditions, observed behaviour, interpretation, uncertainty, change PR and dated retest. No numerical minimum is given in the starter; consult the course chapter |
| H3 — analytics/integration | Historical [checklist](H3-final-checklist.md); [official starter decision format](https://github.com/buildingbetterwebsites/campuscycle-starter/blob/course-2026-autumn/docs/decisions/README.md) | [Analytics decision](decisions/analytics.md), [integration decision](decisions/integration.md), `/contact` | PARTIALLY VERIFIED — earlier analytics views reported; production map returned 15 successful tiles after opt-in on 24 November 2026; campus candidate separately tested locally. The complete H3 grading list remains unavailable | Confirm candidate after deployment; capture required analytics evidence if rubric specifies |
| Watermelon | Project documentation; treated as optional pending course text | Global script and [evaluation protocol](cookie-shop-experience/watermelon/README.md) | PARTIALLY VERIFIED — previous production loaded widget, historical D6 reports participant interaction. No completed 35-case accuracy evaluation | Run representative real conversations; log responses, accuracy and limitations |
| Voluntary creative work | Project brief and approved #27 scope; optional | Finder, Passport, Taste Map, Comparison, Box Builder, commercial and confirmation animation | VERIFIED for sampled technical operation in practice tests; no causal claim about satisfaction or sales | Preserve optional status and judge suitability in human sessions |

## Deliverable evidence (official §1.3.4 and remaining source gaps)

| Identifier | Existing location or evidence | Status and next step |
| --- | --- | --- |
| D0 — Team agreement | [Team agreement](team-agreement.md) and [brief](brief.md) | PARTIALLY VERIFIED — team agreement is the official Check-in A document; repository copy exists |
| D1 — Brief | [Brief](brief.md) | PARTIALLY VERIFIED — outcomes and audience recorded; official H1 brief; detailed rubric not supplied |
| D2 — Needs and requirements | [Requirements](requirements.md) | PARTIALLY VERIFIED — acceptance criteria and historical evidence present; official H1 needs and requirements; detailed rubric not supplied |
| D3 — Content and structure | [Content and structure](content-structure.md) | PARTIALLY VERIFIED — PR #27 inventory, sitemap and ER diagram reconciled with code; official H2 content and structure |
| D4 — Design rationale | [Design rationale](design-rationale.md), [customer journey](customer-journey-map.md) | PARTIALLY VERIFIED — rationale and workflow present; official H2 design rationale |
| D5 | [Analytics](decisions/analytics.md) and [integration](decisions/integration.md) are labelled D5 in the repository | PARTIALLY VERIFIED — both records exist and meet the published starter structure (two filled records, seven headings, options and no unfinished template markers). Team decision participants are unconfirmed; provider facts and results have the limits stated in the records. UGent §3.1 identifies D5 as decision records; any additional grading criteria await the separate grading chapter. |
| D6 — First test report | [Test report](test-report.md) and [usability protocol](cookie-shop-usability-protocol.md) | PARTIALLY VERIFIED — historical human and technical evidence distinct; the first test report belongs to H2; exact participant minimum and final human evidence remain unconfirmed |
| D7 — Handover note | [Existing handover](handover.md); UGent §3.1 allocates D7 to the final hand-in | PARTIALLY VERIFIED — operation and release instructions reviewed; ownership and backup rehearsal need human confirmation |

## Project requirements (local R1–R8, not official course identifiers)

| ID | Route and implementation | Evidence and status |
| --- | --- | --- |
| R1 | `/clinics`, CookieOrderForm, saveOrder | VERIFIED on candidate with isolated orders and recorded earlier production acceptance |
| R2 | `/admin`, Orders collection | VERIFIED for historical item/quantity check and candidate isolated duplicate, reference and persistence checks |
| R3 | `/cookies`, catalogue and product cards | VERIFIED technically via six inspectable cards and images; candidate preview protected |
| R4 | `/cookies`, `/compare` | PARTIALLY VERIFIED — automated comparison passed; independent human task observation pending |
| R5 | `/cookies`, `/clinics` | PARTIALLY VERIFIED — keyboard action, focus and order cases pass; full human keyboard round trip pending |
| R6 | `/`, `/cookies`, `/clinics` | VERIFIED for emulated widths including 390 px; new physical-device verification not performed |
| R7 | `/clinics`, validation and receipt | VERIFIED — fictional details accepted in isolated flow; no payment step; historical production evidence retained |
| R8 | `/`, `/cookies` | PARTIALLY VERIFIED — 20 cold-cache PR #27 local samples all under 3 s (min/median/max ms: home 390: 133/138/139; home 1100: 118/137/138; assortment 390: 96/104/119; assortment 1100: 105/109/120). 20 hosted PR #26 measurements are historical. Candidate Vercel SSO prevents hosted measurement. |

## Individual H3 evidence and access

GitHub accepted collaborator listing identifies the accounts below. The merged PR authors and Git commit author/trailer history were examined. Discussion or assigned roles alone do not prove contribution.

| Member | GitHub / access | Qualifying merged PR and actual code | Threshold evidence |
| --- | --- | --- | --- |
| Jonas | jonashey1 / admin | [#12](https://github.com/jonashey1/team11-cookie-shop/pull/12), Cookie Order Form, Orders and server persistence; merged PR author | Demonstrated |
| Tessa | teversch / write | None found | Missing |
| Arnaud | Arnaud-97 / write | None found | Missing |
| Esma | Esma1326 / write | None found | Missing |
| Yana | KYana123 / write | None found | Missing |
| Xander | xanderrooms9-spec / write | None found; legacy pending invitation also displayed | Missing |
| Teacher | jnmoons / pending | Invitation exists; accepted collaborator entry absent | Hand-in blocker to verify with course process |

Use real findings from manual accessibility, transaction, information and usability checks to identify any genuinely necessary correction. A team member may implement such a change or pair with a verified contributor. Confirm authorship and GitHub-linked email before adding trailers. No artificial changes or retroactive authorship.

## Presentation, security and evidence limits

Product cards use recognisable images and common regions. Name and price are adjacent, matching card layout and colour conventions across flavours. Text continues to identify each flavour independently of colour. Workshops and ordering have direct main-menu links. The Taste Map provides both plotted markers and a name list; comparison and box personalisation are optional. Visible labels remain after typing. The receipt and success announcement are independent of the celebration, which honours reduced motion and is excluded from print. The commercial follows the hero, has transcript, native controls and deferred loading, and can be skipped by using the direct navigation.

The order action enforces catalogue IDs, valid quantities, limits and idempotency server-side. Guest analytics and CSV access are denied in tests; editor access was checked with isolated data. The official production checker disclosed only status and minimal record metadata, without customer data. Map requests wait for opt-in; no geolocation is requested. Existing dependency/security limitations are recorded in the [release audit](artisan-signature/release-audit.md). Automated axe checks, keyboard tests and viewport emulation support accessibility; they do not establish full assistive-technology conformance. Prior reported human observations remain distinct from browser automation.

## Final hand-in procedure

1. Open **My team → Hand-in steps at UGent** and check the cards and separate grading list. Confirm all six members linked their GitHub accounts and accepted repository access. Grant the course checks app read access to this repository only via **Only select repositories**. Check that the owner has invited `jnmoons`; the app accepts the teacher invitation at hand-in.
2. Obtain final approval. After merging separately, wait for Vercel to report Ready for the exact final GitHub `main` SHA.
3. Confirm `https://github.com/jonashey1/team11-cookie-shop`, branch `main`, and `https://team11-cookie-shop.vercel.app/`. Check footer and the production team endpoint. Existing valid evidence was found. Create a fictional order manually only if the endpoint no longer finds official evidence: use Order Cookies, select quantities, enter made-up details, submit once, verify the receipt and check `orders.name` contains `T11-S3F8`.
4. In the team's **Final hand-in** card, check the repository, `main` (prefilled) and the live URL. Any member can choose **Hand in for Team 11** or **Hand in again** on behalf of the group. Confirm **Saved · your teacher reads it** and the recorded branch, SHA and deployment. This latest recorded hand-in counts. Earlier A/H1/H2 cards show checks immediately; revisit them only as needed. The PDF recorded H3 for `d7a78785e04b1a7ce3757866ebe3e15fa2d47a9f`; it is not the final PR #27 release.

## Required scope from UGent §3.1

Source: [Start: your team, your topic and your two user tasks](https://betterwebsitesv2.vercel.app/learn/building-better-websites-ugent/start-your-team-your-topic-and-your-two-user-tasks), PDF pp. 3 and 11. The official threshold is 6–9 pages, at least four collections for the team's topic, one public many-to-many shown from both directions, analytics and one integration with decision records, original topic-specific content and design, two live tasks and all eight team-kit documents.

| Criterion | Status | Evidence and owner action |
| --- | --- | --- |
| Two distinct tasks | VERIFIED at previous production and independently sampled on the candidate in isolated tests | D1 keeps ordering and saving selected cookies first; the informational task is finding and comparing available cookies. Current regressions preserve the workflows. Recheck the final main deployment before hand-in. |
| 6–9 qualifying pages | VERIFIED on the PR #30 candidate by the official rule — **9 counted pages**: 7 fixed destinations (`/`, `/cookies`, `/cookie-finder`, `/clinics`, `/workshops`, `/about`, `/contact`) + 2 detail templates (`/workshops/[slug]`, `/topics/[slug]`, each counting once). Official rule, read in the course app on 24 November 2026 ([UGent 3.5 Final hand-in, step 2 "Your other pages"](https://betterwebsitesv2.vercel.app/learn/building-better-websites-ugent/final-hand-in-your-second-task-your-last-documents-and-your-release-check) and [10.8 "The nine lines of the grading list", line 3](https://betterwebsitesv2.vercel.app/learn/building-better-websites/finishing-and-handing-over#heading-the-nine-lines-of-the-grading-list)): a home page, list page or plain page counts once each; *a page that shows one record counts once for all records of its kind*; the confirmation page, the privacy page and the not-found page do not count; a page that no link leads to from the home page does not count. The Box Builder moved to `/clinics#build-your-box` (PR #30); `/compare`, `/faq`, `/fortune-cookie` and `/build-your-box` redirect to sections. The final card's automated count on the earlier production commit was 8; recheck the card after hand-in. |
| Four topic-specific collections | VERIFIED on the candidate — `cookies`, `orders`, `workshops` and `topics` (official rule, §3.1.6: "at least four of your own topic; the starter's users, media and pages do not count"). The additive migration `20261124_202843_cookie_catalog` creates `cookies` and inserts the six existing products. Migration review: the CI `migrations` job (committed-migration check) passed; the course rule is that only the content-model pair creates migrations (§3.6.4), and this one was committed under `jonashey1`, who holds releases in the content-model/releases pair. **No separate human review of the schema took place**; a teammate's review is optional in the course (§3.6.3). |
| Many-to-many visible both ways | VERIFIED | Workshop topics are stored in Payload; the Topic reverse join renders matching workshops. Production returned the relation in the course checker, and candidate tests exercise four workshops and three topic pages. |
| Suggested analytics and integration; D5 | PARTIALLY VERIFIED | Two decision records; historical live analytics page views and live opt-in map verified, no confirmed custom order event. Team decision participants require confirmation. |
| Original design and topic-specific copy | PARTIALLY VERIFIED | Approved design and live primary routes verified. The direct public legacy clinic path was discovered by this audit and redirected on the candidate. CMS API records still contain historical example copy. Owner must review Pages, Site facts and the legacy clinic in production admin without deleting historical records. |
| All D0–D7 | PARTIALLY VERIFIED | All document locations exist. Official §2.1 records the D0 structure, and the repository already records dates; this audit did not reconfirm each agreement or individual role. D6 and D7 limitations stay visible. |
| Final grading and release | PARTIALLY VERIFIED | Section 1.3 confirms H3 alone is graded. The complete team assessment rubric, exact seven-point distribution and Module 10.8 grading lines were not in these exports. Do not infer a mark. |

### Route inventory

Each row is a public address; the right column gives its official count. Total: 7 fixed destinations + 2 detail templates = **9** (see the 6–9 row above for the source).

| Route | Meaningful content and counting |
| --- | --- |
| `/` | Home and commercial; 1 |
| `/cookies` | Assortment and Taste Map; 1 |
| `/workshops` | Workshop overview; 1 |
| `/clinics` | Product selection, basket, Box Builder section and checkout; 1. The address becomes `/clinics/confirmed` after a saved order (a confirmation, not counted) |
| `/cookie-finder` | Recommendation and Passport; 1 |
| `/compare` | Redirect to `/cookies#compare-cookies`; 0 |
| `/build-your-box` | Redirect to `/clinics#build-your-box` (PR #30); 0 |
| `/about` | Team and project story, plus Fortune Cookie; 1 |
| `/contact` | Contact, opt-in map and FAQ; 1 |
| `/faq` | Redirect to `/contact#faq`; 0 |
| `/fortune-cookie` | Redirect to `/about#fortune-cookie`; 0 |
| `/workshops/[slug]`, `/topics/[slug]` | Detail templates: four workshop records and three topic records. By the official rule each template counts once: 2 |
| `/clinics/[slug]`, `/account`, `/account/login`, CMS routes | Conditional or legacy routes, not used to reach the conservative floor. The known example clinic now redirects on the candidate; `/home` already redirects to the homepage. |
| `/clinics/[slug]/booked`, `/privacy`, 404 | Officially excluded. |

### Collection qualification

Schema locations and current fields are in [D3](content-structure.md). The production course endpoint returned 4 workshops, 3 topics, 6 orders, 1 clinic, 3 slots, 1 booking and 3 repairs. The last four kinds relate to the legacy booking example, not the main Cookie Shop ordering task. The single published clinic has the starter repair clinic name. The candidate adds live reads of six `cookies` fixtures and protects known legacy records at the public API, without deleting records. Users, media, generic pages, members and throttling are excluded. The site is not credited for unused or generic collections.

### Personal work and final release

Use authentic unsolved work for contributions: a real route consolidation, reviewed content model and migration, an observed accessibility issue, checkout regression evidence, and consumer-facing content or relationship checks. The individual contribution threshold is evidence for the teacher; the supplied cards distinguish it from an automatic mark. Confirm the official dynamic-detail counting rule and the content-model pair’s migration review before approving the final merge. After approved deployment, recheck the existing course order and submit on the team Final hand-in card. Revisit A/H1/H2 if the course app still shows an unresolved access or checkpoint finding. Do not claim a new hand-in until the card records the correct SHA.
