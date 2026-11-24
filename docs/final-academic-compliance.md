# Final academic compliance audit — Team 11

Audit target: [PR #27](https://github.com/jonashey1/team11-cookie-shop/pull/27), application commit `7a45b7f7aa113b2be8637ef4601c16b149213462`. Production observed separately at `a46eebb8ac2943a0e89370e59db0c84bd49ea1d7`. This is a retrospective review. No submission, production write or permission change was performed.

## Source coverage

- The official [course](https://betterwebsitesv2.vercel.app/learn/building-better-websites) and [UGent hand-in steps](https://betterwebsitesv2.vercel.app/learn/building-better-websites-ugent/hand-in-steps-at-ugent) both reach the course sign-in screen. The audit attachment relays parts of the hand-in and progress export. No separate official hand-in PDF or progress export was available. The available learner lecture notes (Building better websites, Content & Information Architecture and UX Fundamentals) informed the design and content model checks. They do not define the hand-in gates. The complete official rubric, stages, deliverable definitions, invitation acceptance instructions and original progress evidence remain unverified.
- The [starter check contract](COURSE-CHECK-CONTRACT.md) verifies the machine interface. The [project brief](brief.md), [requirements](requirements.md) and [historical H3 checklist](H3-final-checklist.md) are project records, not substitutes for the official rubric.
- Statuses apply only to the evidence named in each row. Scope labels identified as provisional require reconciliation with the official exports. No grade is inferred from CI.

## Course and hand-in traceability

| Identifier and requirement | Source / scope | Route, implementation and deliverable | Evidence and status | Remaining action |
| --- | --- | --- | --- | --- |
| Check-in A | Official course; mandatory as relayed | Course application; [team agreement](team-agreement.md) | NOT VERIFIED — no submitted checkpoint export | Supply the export and inspect the submission |
| H1 — starter adaptation and project setup | Official hand-in; mandatory as relayed | Repository, site shell, GitHub/Vercel | PARTIALLY VERIFIED — GitHub confirms the official template buildingbetterwebsites/campuscycle-starter; connected deployment present; official H1 criteria not visible | Reconcile with H1 rubric and recorded result |
| H2 — team project and integration project instructions | Official course; mandatory as relayed | `/cookies`, `/clinics`, `/workshops`; [brief](brief.md), [model](content-structure.md), [requirements](requirements.md) | PARTIALLY VERIFIED — visible user journeys and existing deliverables; exact H2 grading gates unavailable | Reconcile with the team/integration instructions |
| H3 — final grading checklist | Official hand-in; mandatory as relayed | Course application | NOT VERIFIED — rubric, official current export and individual score unavailable | Export the current checklist; resolve gaps before submitting |
| H3 — transactional configuration and code evidence | Hand-in instructions excerpt in audit; mandatory | `/clinics`, `/api/course-check`; `src/course-check.config.ts`, `src/tasks/order-cookies/saveOrder.ts`, `src/collections/Orders.ts` | VERIFIED on current production — public checker returned `orders`, `name`, `ok` and an existing matching record for `T11-S3F8`. Not an isolated test record | Recheck same endpoint after future deployment; retain existing evidence |
| H3 — connected team identity and production service | Hand-in excerpt; mandatory | Team 11, `jonashey1/team11-cookie-shop`, `main`, `team11-cookie-shop.vercel.app`, footer `T11-S3F8` | PARTIALLY VERIFIED — repository, official template and live production SHA verified; live course JSON responds and proves a working data read. Course-app access and production connection details not independently inspected | Confirm course-app access and final SHA after approved deployment |
| H3 — Campus Cycle replacements | Audit and starter workflow; mandatory | Public paths; `scripts/ci/leftovers.mjs`, `.github/workflows/ci.yml`, `src/lib/public-workshop-content.ts` | VERIFIED for the repository scan — `Leftovers: none`. PARTIALLY VERIFIED for content — 18 public production routes returned 200 and displayed the team code with no sampled bicycle text; protected, draft and legacy CMS records outside public audit | Review protected drafts and legacy records without deleting them |
| H3 — `CAMPUS_CYCLE_LEFTOVERS=fail` | Audit; mandatory | GitHub repository Actions variables | NON-COMPLIANT — variable list empty; CI leftovers job skipped | Owner approval, then add exact variable/value in GitHub settings and verify CI |
| H3 — teacher collaborator | Hand-in excerpt, audit; mandatory | GitHub access UI | NON-COMPLIANT at time of audit — `jnmoons` invitation pending, no accepted collaborator entry | Consult official acceptance instructions and confirm accepted access |
| H3 — team access | Audit; mandatory | GitHub | VERIFIED — owner/admin and other five have write access. Xander also appears in pending invitation list; effective access is already listed | Check stale invitation in UI without changing current access |
| H3 — one merged code PR per member | Progress-export threshold relayed in audit; mandatory | GitHub merged PRs and `main` author/trailer history | NON-COMPLIANT on available evidence — Jonas qualifies, five have no qualifying PR evidence | Link genuine equivalent evidence if available or complete real work; verify in course app |
| H3 — AI note | Starter workflow and audit; mandatory | Merged PR descriptions, draft #27, CI `ai-note` | PARTIALLY VERIFIED — 26/26 merged PR descriptions include a note. #21–26 state implementation support; #27 states actual assistance. #20's review-only wording conflicts with recorded work on the Artisan implementation/transfer. #19 and early self-reports cannot all be independently corroborated | Correct #20 truthfully with owner; verify and clarify #19 and mixed #11 drafting wording as warranted; do not overwrite other authors' reports |
| H3 — usability with participants | Audit and D6 repository mapping; mandatory | [D6](test-report.md), [protocol](cookie-shop-usability-protocol.md) | PARTIALLY VERIFIED — one human participant, original feedback and reported follow-up exist. Further independent informational observation and version-specific retest evidence are missing | Obtain official minimum, then record real observations and repeat relevant task |
| H3 — analytics/integration | Historical [checklist](H3-final-checklist.md); official D5 mapping pending | [Analytics decision](decisions/analytics.md), [integration decision](decisions/integration.md), `/contact` | PARTIALLY VERIFIED — earlier analytics views reported; real campus tiles verified locally on candidate after opt-in; exact H3 rubric unavailable | Confirm candidate after deployment; capture required analytics evidence if rubric specifies |
| Watermelon | Project documentation; treated as optional pending course text | Global script and [evaluation protocol](cookie-shop-experience/watermelon/README.md) | PARTIALLY VERIFIED — previous production loaded widget, historical D6 reports participant interaction. No completed 35-case accuracy evaluation | Run representative real conversations; log responses, accuracy and limitations |
| Voluntary creative work | Project brief and approved #27 scope; optional | Finder, Passport, Taste Map, Comparison, Box Builder, commercial and confirmation animation | VERIFIED for sampled technical operation in practice tests; no causal claim about satisfaction or sales | Preserve optional status and judge suitability in human sessions |

## Deliverable evidence (repository mapping pending official definitions)

| Identifier | Existing location or evidence | Status and next step |
| --- | --- | --- |
| D0 | [Team agreement](team-agreement.md) and [brief](brief.md) | NOT VERIFIED — do not assign an official meaning without the source |
| D1 | [Brief](brief.md) | PARTIALLY VERIFIED — outcomes and audience recorded; official definition missing |
| D2 | [Requirements](requirements.md) | PARTIALLY VERIFIED — acceptance criteria and historical evidence present; official definition missing |
| D3 | [Content and structure](content-structure.md) | PARTIALLY VERIFIED — PR #27 inventory, sitemap and ER diagram reconciled with code; official definition missing |
| D4 | [Design rationale](design-rationale.md), [customer journey](customer-journey-map.md) | PARTIALLY VERIFIED — rationale and workflow present; official definition missing |
| D5 | [Analytics](decisions/analytics.md) and [integration](decisions/integration.md) are labelled D5 in the repository | NOT VERIFIED — exact official definition unavailable; do not certify this mapping |
| D6 | [Test report](test-report.md) and [usability protocol](cookie-shop-usability-protocol.md) | PARTIALLY VERIFIED — historical human and technical evidence distinct; official minimum and final human evidence pending |
| D7 | Mentioned in historical checklist outside the D0–D6 audit scope | NOT VERIFIED — check applicability and definition against the final rubric |

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
| Jonas Heyneman | jonashey1 / admin | [#12](https://github.com/jonashey1/team11-cookie-shop/pull/12), Cookie Order Form, Orders and server persistence; merged PR author | Demonstrated |
| Tessa Verschaeve | teversch / write | None found | Missing |
| Arnaud Houwenhuyse | Arnaud-97 / write | None found | Missing |
| Esma Sözeri | Esma1326 / write | None found | Missing |
| Yana Koubari | KYana123 / write | None found | Missing |
| Xander Rooms | xanderrooms9-spec / write | None found; legacy pending invitation also displayed | Missing |
| Teacher | jnmoons / pending | Invitation exists; accepted collaborator entry absent | Hand-in blocker to verify with course process |

Use real findings from manual accessibility, transaction, information and usability checks to identify any genuinely necessary correction. A team member may implement such a change or pair with a verified contributor. Confirm authorship and GitHub-linked email before adding trailers. No artificial changes or retroactive authorship.

## Presentation, security and evidence limits

Product cards use recognisable images and common regions. Name and price are adjacent, matching card layout and colour conventions across flavours. Text continues to identify each flavour independently of colour. Workshops and ordering have direct main-menu links. The Taste Map provides both plotted markers and a name list; comparison and box personalisation are optional. Visible labels remain after typing. The receipt and success announcement are independent of the celebration, which honours reduced motion and is excluded from print. The commercial follows the hero, has transcript, native controls and deferred loading, and can be skipped by using the direct navigation.

The order action enforces catalogue IDs, valid quantities, limits and idempotency server-side. Guest analytics and CSV access are denied in tests; editor access was checked with isolated data. The official production checker disclosed only status and minimal record metadata, without customer data. Map requests wait for opt-in; no geolocation is requested. Existing dependency/security limitations are recorded in the [release audit](artisan-signature/release-audit.md). Automated axe checks, keyboard tests and viewport emulation support accessibility; they do not establish full assistive-technology conformance. Prior reported human observations remain distinct from browser automation.

## Final hand-in procedure

1. Reconcile this matrix against the official course exports. Confirm all expected deliverables and submissions, contribution records and accepted teacher/team access.
2. Obtain final approval. After merging separately, wait for Vercel to report Ready for the exact final GitHub `main` SHA.
3. Confirm `https://github.com/jonashey1/team11-cookie-shop`, branch `main`, and `https://team11-cookie-shop.vercel.app/`. Check footer and the production team endpoint. Existing valid evidence was found. Create a fictional order manually only if the endpoint no longer finds official evidence: use Order Cookies, select quantities, enter made-up details, submit once, verify the receipt and check `orders.name` contains `T11-S3F8`.
4. Sign into the UGent course application and follow the exact H3 hand-in workflow from the official export. Record the accepted commit, time and results. The audit reports the previous recorded SHA as `d7a78785e04b1a7ce3757866ebe3e15fa2d47a9f`; it is older and is not the final PR #27 release. Verify the rule that the latest recorded submission counts against the authenticated instructions.
