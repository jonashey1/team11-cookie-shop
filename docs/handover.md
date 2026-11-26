# Hand-over

Prepared for Team 11 by Jonas (`jonashey1`), 26 November 2026. This document describes roles, not an assertion that all team members have accepted them. Named operational owners and backups still need to be confirmed. Never store passwords, tokens or connection strings here.

## Who owns what

- **Live site:** https://team11-cookie-shop.vercel.app/
- **Repository:** https://github.com/jonashey1/team11-cookie-shop
- **Admin screen:** https://team11-cookie-shop.vercel.app/admin
- **Latest hand-in:** The course app shows a saved hand-in on `main`, commit `e88d6f9bd60eaa2b67da38ee5a93b6dde36bc7b4`. Its checks report a successful Vercel deployment of that commit and a live site showing team code `T11-S3F8`.
- **Teacher collaborator:** The course app reported on 26 November 2026 that the teacher is not yet a repository collaborator and that it could not accept the invitation. Invite the teacher’s GitHub account or the course team under **Settings → Collaborators**, then hand in again.

| Service | What it holds | Owner / account access |
| --- | --- | --- |
| GitHub | Source code and pull requests | Jonas (`jonashey1`) |
| Vercel | Production and preview deployments, environment settings | Jonas (`jonashey1`), account access confirmed |
| Neon | Production PostgreSQL database, connected to Vercel | Jonas (`jonashey1`), account access confirmed |
| Vercel Blob | Uploaded media if configured | Jonas (`jonashey1`), account access confirmed |

The service accounts are accessible to Jonas (`jonashey1`). The responsibility table below describes the operational roles; assign named owners and backups for those duties with the relevant team members.

| Responsibility | Owner (role) | Named person | Backup | Who can log in | Last tested |
| --- | --- | --- | --- | --- | --- |
| Content | Content editor | Not yet assigned | Not yet assigned | Authorized Payload editors | 23 November 2026: production test order visible in admin; editing CMS content not independently verified |
| Access | Repository administrator | Not yet assigned | Not yet assigned | GitHub owner and authorized Payload administrators | 26 November 2026: course app reported teacher collaborator status outstanding |
| Updates | Website developer | Not yet assigned | Not yet assigned | GitHub contributors with approved PR access | 23 November 2026: PR-based release used; future update procedure not rehearsed |
| Monitoring | Website maintainer | Not yet assigned | Not yet assigned | Team members with Vercel access | 23 November 2026: Vercel Analytics showed 1 visitor and 7 page views; custom-event reporting not verified |
| Backup and restore | Database administrator | Not yet assigned | Not yet assigned | Authorized Neon/Vercel account owner | Never: backup restoration on test data not rehearsed |
| Ownership | Team project coordinator | Not yet assigned | Not yet assigned | GitHub/Vercel/Neon account owners | Never: account transfer and recovery not rehearsed |

- **Who edits which content in `/admin`:** An authorized content editor manages CMS pages, cookie-related records and fictional orders; the order status may be updated by an authorized shop administrator. Edit live catalogue descriptions, prices and profiles in Payload **Cookies**. Prices are integer cents. Check the six cards and the full checkout in an isolated environment before changing production content.
- **How a new editor gets an account:** The access administrator confirms the person's role and grants an account using Payload's authorized administration flow. No credentials are shared in Git or documents. Remove access when a member leaves.
- **What needs a developer:** Changing the supported product IDs, approved images, forms, migrations, access rules, layout, analytics, integration and deployment configuration.

## Left out, and in which order

1. **Keep production acceptance evidence current:** Production order persistence was confirmed on 23 November 2026. The historical D6 acceptance table reports an item-by-item and quantity match. The live course checker already finds the team-code order. The 26 November hand-in checks report that the submitted commit deployed successfully and the live site shows the team code.
2. **Verify the two H3 services on production:** Vercel Web Analytics page views were confirmed on 23 November 2026. OpenStreetMap loaded live after opt-in on 24 November 2026; the campus variant was checked on the isolated PR #27 candidate. Custom-event availability is not confirmed.
3. **Confirm the second task and the collection links:** The candidate E2E suite exercises comparison and both sides of the Workshop–Topic relation. On production (24 November 2026) all four workshop pages and three topic pages linked consistently in both directions, and the public course check reported the `workshops.topics` / `topics.workshops` relation. Retest the approved deployed commit; record independent human observation separately.
4. **Complete teacher repository access:** The course app reported that the teacher is not yet a collaborator and could not accept the invitation. Invite the teacher’s GitHub account or the course team under **Settings → Collaborators**, then hand in again.
5. **Improve long-term operations:** Assign a named primary and backup for each responsibility above. Test database backup restoration using only disposable test data, confirm ownership of all services and test recovery from a failed deployment.

- **What does not work yet, or could break:** Production orders depend on the database and correct deployment configuration. Preview deployments can fail if the Neon branch quota is reached. Custom analytics events may not be supported on Vercel Hobby. The map is external and may be unavailable. No real payments or deliveries exist by design.
- **What to do about it:** Check the production deployment logs, the orders collection, Neon quota and Vercel Analytics; keep the order form usable without analytics or OpenStreetMap. Never delete the production database to repair a preview branch issue.

## How you will know it works

- **Saved fictional orders:** Read the `orders` collection in production Payload `/admin` weekly. If **0** new records appear after **1** deliberately submitted test order, investigate immediately.
- **Site availability:** Check the production homepage and `/clinics` weekly in a private window. If **1** of these **2** pages fails to load, inspect Vercel deployment/runtime logs and resolve before further changes.
- **Analytics reach:** Read the Vercel Analytics dashboard weekly after enabling it. If **0** page views appear after **3** deliberate live-page visits and sufficient reporting delay, investigate configuration.

How to run, change and deploy the site safely:

- On your own computer: `docs/guides/local-setup.md`.
- This project stores products in `cookies` and saved price snapshots in `orders`. Keep production data intact. Do not delete `.data/db`, migrations or the Neon production branch.
- A change reaches the live site through `main`. Never use Vercel's "Promote to Production": use Redeploy, and check that the build log shows `MIGRATIONS: verified committed migrations`.
- **How a change goes live:** A contributor creates a branch and PR with the required AI note, reviews the preview and CI checks, verifies both user tasks when relevant, then merges into `main`. Wait until the production deployment is Ready before handing in.
- **How we go back:** Use **Revert** on the merged PR on GitHub and merge the resulting revert PR, so a new production build and migration verification run. A revert does not undo migrations already applied to the database. Do not use Vercel Instant Rollback.

## Catalogue migration and rollback

The catalogue migration adds the table and related Payload lock metadata and inserts the six approved products with their existing IDs and amounts. The insert preserves an existing matching ID; normal migration history prevents the schema migration from re-running. Committed deployment migrations use the existing guarded Vercel flow. Do not seed or migrate production by hand. Editors cannot create, delete or re-key the six products through the API. Historical orders are never recalculated. If a release must be reverted, leave the additive table and the historical orders intact; only consider a database rollback after a backup and separate approval.

## Workshop registration

In Payload **Workshop Sessions**, choose an existing workshop, enter the start and end times and capacity, and set the status to open when the fictional session is ready. The public site displays Europe/Brussels time. Check confirmed places and capacity in the session list. Close or cancel a session to block further sign-ups. If the session is cancelled, cancel its affected registration records individually so each retains its history.

In **Workshop Registrations**, search by reference and set **Cancelled** to release the associated places. Cancellation is permanent. Fictional names and email addresses are visible only to authorised editors. Users receive a server-generated reference after the record commits. Retries with the same key reuse the result. A database trigger updates the session count in the same transaction as the registration. Lowering capacity below confirmed places is rejected.

The additive migration adds both collections and initialises upcoming sessions for the four existing workshops once. For monitoring, review registration counts and confirmed places in Payload. No contact details are sent to analytics or used for email. Revert the application PR if a rollback is necessary and leave the registration data intact. Automatic email, waitlists, self-service cancellation and payments remain future possibilities.

## Global basket

The header and checkout share the basket provider and its existing per-tab storage. The storage reader accepts the prior quantity-only format and rejects unsupported records. Boxes retain their four slots and optional preview text in the browser. Checkout sends only the combined cookie quantities to the existing order action. Test price and quantity changes against Payload catalogue data in an isolated environment. The basket requires no migration or new CMS settings, and workshop registrations stay separate.
