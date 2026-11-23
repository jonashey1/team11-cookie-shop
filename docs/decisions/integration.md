# Decision: an integration

## The question

- **The question:** Which external integration adds a useful, safe experience to the fictional Cookie Shop without requiring payment processing or real customer data?
- **The need or requirement behind it:** H3 requires an integration from the course's suggested list, used by a visitor on the live website.

## Options considered

| Option | What it would give | What it would cost |
| --- | --- | --- |
| No integration | No external requests or dependencies | Does not meet the H3 integration requirement |
| OpenStreetMap | An interactive map users can open from the Contact page | An external service and an external privacy notice; minimal development |
| Resend email confirmations | Automatic confirmation emails | API credentials, a verified sender domain, deliverability and privacy management |

## The decision

- **We chose:** OpenStreetMap, embedded on the Contact page after an explicit opt-in click.
- **What we installed, and where its settings are:** The Contact page at `src/app/(site)/contact/page.tsx` renders `src/components/site/OptionalGhentMap.tsx`, which loads an OpenStreetMap iframe of central Ghent only after the visitor clicks a button. No API key or third-party script is required. The page explains that Cookie Shop is fictional and does not have a physical store.
- **How we checked that it does what we expected:** The opt-in iframe implementation and its destination were inspected in the H3 code package. **Opening it from the deployed production site still needs a manual check.** This is an embedded map integration, not a real shop locator.
- **Who took part in the decision:** Proposed for Team 11; team confirmation is required.

## Why

- **Why we chose it:** OpenStreetMap is on the course's suggested list and needs no secret or database migration. An explicit click avoids loading a map provider automatically on the Contact page. Resend would be unnecessary for a site that forbids real orders and asks for invented contact details.
- **What this evidence cannot tell us:** Source inspection cannot establish that the external map will always be reachable; the map is illustrative and does not guide anyone to a real shop.

## Consequences

- **The accounts it needs, and its cost in money and in time:** No account or API key for a simple external link; a short manual browser test is required.
- **Who maintains it:** Website maintainer (team role).
- **What we give up:** No physical shop marker, because the shop is fictional.
- **How we could leave the service later:** Remove `<OptionalGhentMap />` from the Contact page and delete its component.
- **The personal data that leaves our site, and whether it needs a cookie banner:** No request to OpenStreetMap is made until the visitor clicks to load the iframe. After loading the map, the provider can receive the visitor's IP address and browser information. The Cookie Shop page itself does not place an OpenStreetMap cookie.
- **What happens to our site when the service is down:** The rest of the site and the ordering flow still work; the external link may not load.

## Facts read on

| Page | Its link | Read on |
| --- | --- | --- |
| Existing Contact page and proposed map link | `src/app/(site)/contact/page.tsx` | 23 November 2026 |
| OpenStreetMap map and provider information | https://www.openstreetmap.org/ | Live verification pending |

## Review when

Review when Cookie Shop gains a real pickup address, the map link stops working, or the team decides to embed a map instead of opening it externally.
