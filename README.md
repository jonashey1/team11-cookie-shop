# Team 11 Cookie Shop

Cookie Shop is Team 11's fictional UGent project for Building Better Websites, based on the autumn 2026 Campus Cycle starter. [Open the live Cookie Shop](https://team11-cookie-shop.vercel.app/).

- **Informational task.** Browse the [cookie catalogue and compare products](https://team11-cookie-shop.vercel.app/cookies). The Cookie Finder and Taste Map help people explore the assortment.
- **Transactional task.** Build a box or choose individual cookies, review the shared basket, and place a fictional order on the [order page](https://team11-cookie-shop.vercel.app/clinics). Use made-up contact details. There are no payments or deliveries.
- **Workshops.** Browse workshops and related topics. Where a session has availability, its detail page offers fictional registration and a confirmation reference.

## Course documents

| Deliverable | Evidence |
| --- | --- |
| D0 | [Team agreement](docs/team-agreement.md) |
| D1 | [Brief](docs/brief.md) |
| D2 | [Requirements and acceptance evidence](docs/requirements.md) |
| D3 | [Content structure](docs/content-structure.md) |
| D4 | [Design rationale](docs/design-rationale.md) |
| D5 | [Analytics](docs/decisions/analytics.md) and [integration](docs/decisions/integration.md) decisions |
| D6 | [Test report and evidence limitations](docs/test-report.md) |
| D7 | [Handover](docs/handover.md) |

See the [H3 checklist](docs/H3-final-checklist.md) for hand-in verification and the [course-check contract](docs/COURSE-CHECK-CONTRACT.md) for the checker interface.

## Run it on your own computer

In short (the [local set-up guide](docs/guides/local-setup.md) explains each step):

1. Install Node 22 (the LTS this starter is tested on).
2. Clone your repository, then run `npm ci`.
3. Create your ignored .env.local with the loopback database URL from the local setup guide and fresh application and editor credentials. Avoid copying populated example values or connecting to the live database.
4. Run `npm run migrate`, then `npm run seed`, then `npm run dev`, and open <http://localhost:3000>.

## Code and operations

The project uses Next.js, Payload CMS, PostgreSQL, TypeScript and Tailwind CSS. Public routes live in `src/app/(site)`, CMS collections in `src/collections`, and the ordering task in `src/tasks/order-cookies`. Use `npm run lint`, `npm run typecheck` and `npm test` for local checks. `npm run check` runs the browser tests against a running site. See [CI](.github/workflows/ci.yml) for the full check configuration.

Use a local or isolated preview database for tests that create records. See the [handover](docs/handover.md) for deployment and recovery steps. The [starter guides](docs/guides/local-setup.md) still describe Campus Cycle examples in places, including bicycle repair bookings. Cookie Shop orders use `orders`, and fictional workshop sign-ups use `workshop-registrations`.

## Release evidence and credits

See the [current evidence](docs/current-release-evidence.md) for the feature inventory and grading cross-check. The code uses the [MIT licence](LICENSE). See [starter image credits](src/seed/images/SOURCES.md) and [Artisan photography provenance](docs/artisan-identity/photography/README.md#provenance-and-usage-rights). Hanken Grotesk uses the SIL Open Font Licence.
