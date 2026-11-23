# Content and structure

**Written by:** jonashey1 (draft for Team 11; team review needed)

## Content inventory

| Content | User question | Source | Kept up to date by (a role) | Pages | Status |
| --- | --- | --- | --- | --- | --- |
| Cookie catalogue and descriptions | Which cookies can I choose? | Workshop records in Payload CMS; verify product wording with the team | Content editor | `/workshops`, `/workshops/[slug]` | Written; content verification pending |
| Cookie topics/categories | Which cookies match my interests? | Topics and workshop-topic relationships in Payload CMS | Content editor | `/workshops`, `/topics/[slug]` | Written; content verification pending |
| Ordering sessions and available slots | When can I place a practice order? | Clinics and timeSlots in Payload CMS | Site editor | `/clinics`, `/clinics/[slug]` | Implemented; live availability to verify |
| Order/booking details | Was my request saved? | Bookings collection and confirmation route | Booking system | `/clinics/[slug]`, `/clinics/[slug]/booked` | Implemented; end-to-end live test pending |
| Prices for selectable items | What will an item cost? | Repairs collection in CMS; actual product mapping needs review | Site editor | Order flow where enabled | In code; product mapping to verify |
| About and contact information | Who runs this project and how do I reach them? | Team-approved copy and CMS pages | Content editor | `/about`, `/contact` | Written; team review pending |
| Help and recommendations | How do I choose or get help? | Team-authored FAQ, Cookie Finder and Watermelon widget | Content editor | `/faq`, `/cookie-finder`, site-wide widget | Implemented; responses to verify |

## Content model

The site is a cookie-shop adaptation of the course starter. Some internal collection names retain the starter terminology. These are the actual collections visible in the repository; the team should not describe them as newly created from scratch.

| Collection | Its fields / purpose |
| --- | --- |
| `workshops` | Cookie catalogue entries; linked to topics (inspect the collection for its complete field list) |
| `topics` | `name`, `slug`, `description`; reverse join to workshops |
| `clinics` | `name`, `slug`, `day`, `startTime`, `endTime`, `summary`; reverse join to time slots |
| `timeSlots` | `clinic`, `startsAt`, `places`; virtual display label and reverse join to bookings |
| `bookings` | Customer booking details, including a `name` field and linked time slot; see `Bookings.ts` for the complete schema |
| `repairs` | `name`, `price`, `description`; retained starter naming |

| Relation between | One-to-many or many-to-many |
| --- | --- |
| Clinics → timeSlots | One-to-many: each time slot belongs to one clinic |
| TimeSlots → bookings | One-to-many: each booking refers to a time slot |
| Workshops ↔ topics | Many-to-many: a workshop may have multiple topics and a topic may apply to multiple workshops |

- **Our many-to-many:** `workshops` ↔ `topics`. The catalogue is reachable at `/workshops`, topic-specific routes at `/topics/[slug]`, and item details at `/workshops/[slug]`. Confirm that links in both directions are visible in the deployed interface.
- **Our drawing:** A content-model diagram still needs to be drawn and added to `docs/`. Suggested diagram: `Clinics 1—N TimeSlots 1—N Bookings` and `Workshops N—M Topics`, with `Repairs` shown separately until its relationship is verified. Do not present a diagram as completed before it exists.

## Sitemap

| Page | Address | Its job | Leads to |
| --- | --- | --- | --- |
| Home | `/` | Introduce Cookie Shop and its main actions | Catalogue, about |
| Our Cookies | `/workshops` | Browse cookie catalogue | Cookie detail, topics |
| Cookie detail | `/workshops/[slug]` | Learn about a particular item | Catalogue and related links |
| Cookie Finder | `/cookie-finder` | Help visitors discover a suitable cookie | Cookie catalogue |
| Fortune Cookie | `/fortune-cookie` | Optional interactive engagement | Main navigation |
| Order Cookies | `/clinics` | Show available ordering sessions | Order session detail |
| Order session | `/clinics/[slug]` | Choose a time and submit a practice order | Confirmation |
| About Us | `/about` | Explain the team/project | Other site pages |
| FAQ | `/faq` | Answer common questions | Relevant site pages |

| Page that does not count | Address |
| --- | --- |
| The confirmation page | `/clinics/[slug]/booked` |
| The privacy page | CMS-driven page if configured; confirm its actual slug and URL before final hand-in |
| The not-found page | Any unknown route, rendered by `src/app/(site)/not-found.tsx` |

`/contact` is also available from the main navigation. The table above identifies nine core page types; the additional contact page is an extra route.

## Navigation labels

- **The words in our main menu:** Home; Our Cookies; Cookie Finder; Fortune Cookie; Order Cookies; About Us; Contact; FAQ.
- **Why users will understand these words:** The labels distinguish browsing (`Our Cookies`) from taking action (`Order Cookies`). `Cookie Finder` names the recommendation tool, while `Fortune Cookie` clearly signals a playful extra. `About Us`, `Contact`, and `FAQ` use familiar conventions. Account links may also appear in account-related contexts.

## Each user task, step by step

**Task 1: Place a practice cookie order (primary transactional task)**

1. On `/`, select **Order Cookies** from the main navigation.
2. On `/clinics`, open an available ordering session.
3. On `/clinics/[slug]`, choose an available time slot.
4. Enter a made-up name and email address, optionally add a note, and submit using the booking button.
5. If the server accepts the request, the user is redirected to `/clinics/[slug]/booked`. The booking is stored in the `bookings` collection. Availability and successful storage must still be checked on the live site.

**Task 2: Explore cookies and find a preference match**

1. From the home page, select **Our Cookies** to open `/workshops`.
2. Browse entries and open a cookie detail page, or select **Cookie Finder** in the navigation.
3. Use the Cookie Finder to explore a recommendation, then return to the catalogue to compare options.

**Scope note:** Dark mode, the Accessibility Center, Cookie Finder, Fortune Cookie and Watermelon chat are voluntary creative extras beyond the required H2 scope, intended to improve the experience and potentially support a bonus assessment; no extra points are guaranteed.
