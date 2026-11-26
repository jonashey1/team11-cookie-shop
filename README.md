# Team 11 Cookie Shop

Cookie Shop is a fictional UGent project for browsing, comparing and ordering cookies. The two course tasks are saving an order with a confirmation and finding and comparing at least two cookies. The public site is [Team 11 Cookie Shop](https://team11-cookie-shop.vercel.app/) and displays team code T11-S3F8.

- Browse the six CMS products and compare two or three on [/cookies](https://team11-cookie-shop.vercel.app/cookies#compare-cookies). The Cookie Finder offers a recommendation.
- Open the shared basket or build a personalised box on Order Cookies. Checkout saves a fictional order and returns a receipt. Payments and fulfilment are outside the demo.
- Explore workshops and their topics in both directions. Available sessions accept fictional registrations with a reference. The protected Order Analytics Dashboard and CSV export are available to authorised editors.
- The homepage has a commercial with a transcript, About has the project story and Fortune Cookie, and Contact has the FAQ and opt-in OpenStreetMap. Accessibility preferences are available from the site controls. Vercel Web Analytics is documented in D5.

The application uses Next.js, Payload CMS and PostgreSQL. Campus Cycle is the original course starter. The starter guides below are retained as reference material.

## Project documents

- [D0 Team agreement](docs/team-agreement.md), [D1 Brief](docs/brief.md), [D2 Requirements](docs/requirements.md), [D3 Content and structure](docs/content-structure.md) and [D4 Design rationale](docs/design-rationale.md)
- [D5 Analytics](docs/decisions/analytics.md) and [D5 Integration](docs/decisions/integration.md), [D6 Test report](docs/test-report.md), [D7 Handover](docs/handover.md)
- [Final academic audit](docs/final-academic-compliance.md), [H3 checklist](docs/H3-final-checklist.md) and [current release evidence](docs/current-release-evidence.md)

## Run it on your own computer

In short (the [local set-up guide](docs/guides/local-setup.md) explains each step):

1. Install Node 22 (the LTS this starter is tested on).
2. Clone your repository, then run `npm ci`.
3. Create your ignored .env.local with the loopback database URL from the local setup guide. Generate fresh local application and editor credentials. Never copy filled example credentials or use the live database.
4. Run `npm run migrate`, then `npm run seed`, then `npm run dev`, and open <http://localhost:3000>.

## Maintainer reference

See the [local setup](docs/guides/local-setup.md), [troubleshooting](docs/guides/troubleshooting.md), [starter recipes](docs/guides/recipes.md) and [course check contract](docs/COURSE-CHECK-CONTRACT.md). Use fresh local credentials and a loopback database. Check the current branch template for unexpected populated fields before copying any values.

## Licence and credits

See the [MIT licence](LICENSE) for code, [starter image credits](src/seed/images/SOURCES.md) for the original photographs and the [Artisan photography provenance](docs/artisan-identity/photography/README.md#provenance-and-usage-rights) for later editorial imagery. Hanken Grotesk uses the SIL Open Font Licence.
