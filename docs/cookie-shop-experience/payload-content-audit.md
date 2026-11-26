# Payload CMS content audit

> This record describes the implementation or evidence at the stage named below. See the [current release evidence](../current-release-evidence.md) for the latest verified status.

## Production inventory

The production read on 26 November 2026 found six cookies, four Cookie Shop workshops, three Cookie Shop topics, seven stored workshop–topic links, eight workshop sessions, three registrations and eight orders. The course checker confirmed the existing course transaction. Three old clinic slots and one related booking remain historical records. The public Privacy record already describes Cookie Shop orders, browser storage, Vercel, OpenStreetMap and Watermelon. The public privacy route adds the workshop registration notice.

Legacy content still stored in production includes the Saturday Repair Clinic, the three repair items Check, Each small repair and Full service, and five bicycle media references. The audited workshop and cookie records had no links to those image records. Production Pages retains outdated editor records for Home (1), About (2) and Contact (3). Home and About have their own public route content. Contact likewise has its own public route. The stored About record still includes historical photo credits. Keep those credits with the original assets.

The original setup seeded bicycle content once per database. Later builds honoured the seed marker and preserved editor records. A new or explicitly restored seed could previously recreate obsolete topics, workshops, repairs and media. The current seed creates only missing Cookie Shop pages and Site facts. It preserves all existing records. Workshop and topic fixture creation for browser checks remains in its dedicated CI script.

## Administration changes

The Clinic, Time Slots, Bookings and Repairs collections are hidden in normal administration. Their schema, access rules, historical records and technical slugs are retained. The admin media list filters exact starter filenames. Historical media remains stored. The admin browser title identifies Cookie Shop. The old pricing-rule field stays in the schema because it is required by the existing database, and its input remains hidden in normal administration.

The approved production Site facts update changed only record 1, with a verified before-image saved outside the repository. It uses Cookie Shop, Ghent, the fictional address hello@cookieshop.example and the compatibility value “Workshop prices are listed on each workshop page.”

## Approved production Pages correction

After approval, rollback copies were saved outside the repository. The three matching record IDs and slugs were updated atomically using the corresponding title, intro and body from src/seed/seed.ts. Home has no body. About gets the Cookie Shop student-project description and demo limitations. Contact gets a project-oriented introduction and a clear note that the example address cannot receive mail. The update returned exactly the three intended records. The former About photo credits remain in the rollback copy. Privacy, all relationships, media and transaction records require no content change.

## Release constraints

The Neon project had ten active branches during this audit. After explicit approval, the preview for the already-merged workshop-email-validation change was removed to free one slot for this hotfix. The code changes require no database migration.
