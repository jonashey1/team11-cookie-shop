# H3 final release checklist — Team 11

Prepared 23 November 2026. This is an action checklist, **not** a claim that the production site has been retested after deployment.

## What this package changes

- Completes the seven required sections of both D5 decision records (`docs/decisions/analytics.md`, `docs/decisions/integration.md`) without invented test results.
- Completes D7 (`docs/handover.md`) with six responsibility roles, prioritized gaps and three measurable triggers.
- Activates the Vercel Analytics component in the site layout and records a `cookie_order_saved` event after a successful test order (custom-event availability depends on the Vercel plan).
- Adds an opt-in embedded OpenStreetMap integration on Contact, with privacy explanation and no invented physical shop address.
- Corrects stale wording on the cookies assortment and Contact page so visitors know fictional test ordering works.
- Leaves the existing Payload collections, migrations, order-saving server action and transaction check config unchanged.

## Actions that cannot be completed from a ZIP

1. **Team contributions:** Arnaud, Esma, Tessa, Xander and Yana must each contribute genuine code through at least one merged PR, or a real jointly authored change with appropriate `Co-authored-by` attribution. Do not fabricate authorship or commits. Each contributor should explain and test their change.
2. **Repository access:** Invite Xander and teacher `jnmoons` as GitHub collaborators; Xander must accept. The course app accepts the teacher's invitation during hand-in. Other members should verify their linked GitHub accounts.
3. **Production order:** Submit a fictional order from `https://team11-cookie-shop.vercel.app/clinics`, then verify its actual items in production Payload `/admin`.
4. **Analytics:** Open Vercel > project > Analytics; enable it if required, visit the production pages, and confirm page views arrive. A Hobby plan may not display custom `cookie_order_saved` events; do not claim it does.
5. **Integration:** Open the production Contact page, click **Load interactive map**, and verify the map appears. If blocked by a browser's content policy, inspect the browser console and deployment settings.
6. **CMS relationship:** On production, follow a workshop record to a linked topic and back. Existing source routes `/workshops/[slug]` and `/topics/[slug]` are preserved, but the database content must actually include linked records.
7. **Second user task:** From the homepage, navigate to Our Cookies, compare two named flavours and prices, then reach Order Cookies. Test with keyboard only and at 390 px width. Document actual device/network and results in D6.
8. **User-test improvement:** H3 grading explicitly expects at least one change based on observed user behaviour and a retest. The reported sister test had no difficulty and no resulting change. Do **not** invent a problem. Run an additional honest observation, improve one issue found and record the before/after retest in D6.
9. **Requirements:** For R1–R8, run the documented acceptance check on production and update each result with a real date and outcome. Do not mark unchecked results as passed.
10. **Deploy and submit:** Make a new branch, apply this package, run `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run test`, `node scripts/ci/leftovers.mjs`, and test the site. Push, open a PR with an accurate AI note, review checks, merge to `main`, wait for production Vercel **Ready**, and submit H3 again. Keep the CI variable `CAMPUS_CYCLE_LEFTOVERS=fail`.

## Suggested PR AI note

"I used ChatGPT to prepare the H3 documentation and targeted code changes for analytics, an opt-in OpenStreetMap map, and outdated ordering text. I reviewed the changes against the course requirements, ran the available local checks and manually verified the live behaviours stated in my test report. The external services, production data and team members' contributions were not represented as verified until checked separately."

## Known limitations

- This package was reviewed statically without installing the npm dependencies or running the full TypeScript, build, browser and production test suites. The leftover-text script returned `Leftovers: none` in an isolated copy of the ZIP.
- `docs/requirements.md` and `docs/test-report.md` are intentionally not rewritten with fictional passing test outcomes.
- The original Git history is not inside the uploaded ZIP. Apply the changed files to the existing local repository; do not replace its `.git`, `.env.local` or `.data` folders.
