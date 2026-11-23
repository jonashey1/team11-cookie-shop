# Hand-over

Prepared for Team 11 by Jonas (`jonashey1`), 23 November 2026. This document describes roles, not an assertion that all team members have accepted them. Never store passwords, tokens or connection strings here.

## Who owns what

- **Live site:** https://team11-cookie-shop.vercel.app/
- **Repository:** https://github.com/jonashey1/team11-cookie-shop
- **Admin screen:** https://team11-cookie-shop.vercel.app/admin

| Service | What it holds | Owner (account name, not the password) |
| --- | --- | --- |
| GitHub | Source code and pull requests | `jonashey1` (repository owner) |
| Vercel | Production and preview deployments, environment settings | Team 11 Vercel project; account ownership to be confirmed in Vercel |
| Neon | Production PostgreSQL database, connected to Vercel | `neon-crimson-coin` project; account ownership to be confirmed in Neon |
| Vercel Blob | Uploaded media if configured | Team 11 Vercel project; storage ownership to be confirmed |

| Responsibility | Owner (a role) | Who can log in | Last tested |
| --- | --- | --- | --- |
| Content | Content editor | Authorized Payload editors | 23 November 2026: local test order visible in admin; production content edit not independently verified |
| Access | Repository administrator | GitHub owner and authorized Payload administrators | Never: collaborator acceptance remains outstanding |
| Updates | Website developer | GitHub contributors with approved PR access | 23 November 2026: PR-based release used; future update procedure not rehearsed |
| Monitoring | Website maintainer | Team members with Vercel access | Never: production analytics dashboard still to verify |
| Backup and restore | Database administrator | Authorized Neon/Vercel account owner | Never: backup restoration on test data not rehearsed |
| Ownership | Team project coordinator | GitHub/Vercel/Neon account owners | Never: account transfer and recovery not rehearsed |

- **Who edits which content in `/admin`:** An authorized content editor manages CMS pages, cookie-related records and fictional orders; the order status may be updated by an authorized shop administrator. Product descriptions in `src/content/cookies.ts` currently require a developer.
- **How a new editor gets an account:** The access administrator confirms the person's role and grants an account using Payload's authorized administration flow. No credentials are shared in Git or documents. Remove access when a member leaves.
- **What needs a developer:** Changing source-defined cookie products, forms, migrations, access rules, layout, analytics, integration and deployment configuration.

## Left out, and in which order

1. **Finish and verify production acceptance checks:** Confirm an order made on the live site appears with correct quantities in production Payload `/admin`. Without this, the transactional task is not fully demonstrated end-to-end.
2. **Verify the two H3 services on production:** Enable/read Vercel Web Analytics and open the OpenStreetMap link from the live Contact page. Without this, integration and measurement evidence is incomplete.
3. **Confirm the second task and the collection links:** Run the cookie comparison task from the homepage; separately follow a live workshop-to-topic-to-workshop link, because the course checker still expects the existing CMS relationship.
4. **Complete the remaining team collaboration evidence:** Every member needs their own qualifying merged code PR or genuine co-authored work; invite the missing member and teacher.
5. **Improve long-term operations:** Test database backup restoration using only disposable test data, confirm ownership of all services and test recovery from a failed deployment.

- **What does not work yet, or could break:** Production orders depend on the database and correct deployment configuration. Preview deployments can fail if the Neon branch quota is reached. Custom analytics events may not be supported on Vercel Hobby. The map is external and may be unavailable. No real payments or deliveries exist by design.
- **What to do about it:** Check the production deployment logs, the orders collection, Neon quota and Vercel Analytics; keep the order form usable without analytics or OpenStreetMap. Never delete the production database to repair a preview branch issue.

## How you will know it works

- **Saved fictional orders:** Read the `orders` collection in production Payload `/admin` weekly. If **0** new records appear after **1** deliberately submitted test order, investigate immediately.
- **Site availability:** Check the production homepage and `/clinics` weekly in a private window. If **1** of these **2** pages fails to load, inspect Vercel deployment/runtime logs and resolve before further changes.
- **Analytics reach:** Read the Vercel Analytics dashboard weekly after enabling it. If **0** page views appear after **3** deliberate live-page visits and sufficient reporting delay, investigate configuration.

How to run, change and deploy the site safely:

- On your own computer: `docs/guides/local-setup.md`.
- This project has an `orders` collection and source-defined cookie products. Keep production data intact. Do not delete `.data/db`, migrations or the Neon production branch.
- A change reaches the live site through `main`. Never use Vercel's "Promote to Production": use Redeploy, and check that the build log shows `MIGRATIONS: verified committed migrations`.
- **How a change goes live:** A contributor creates a branch and PR with the required AI note, reviews the preview and CI checks, verifies both user tasks when relevant, then merges into `main`. Wait until the production deployment is Ready before handing in.
- **How we go back:** Use **Revert** on the merged PR on GitHub and merge the resulting revert PR, so a new production build and migration verification run. A revert does not undo migrations already applied to the database. Do not use Vercel Instant Rollback.
