# Content and structure

Team 11 · Cookie Shop (T11-S3F8). What content the site holds and how it is organised, as built on the PR #27 branch. The [brief](brief.md) and [requirements](requirements.md) remain the sources for the two user tasks.

The collection the transactional task saves into is named in `src/course-check.config.ts`: `orders`, with the name field `name`.

## Content inventory

| Content | Where it comes from | Who keeps it up to date |
| --- | --- | --- |
| Six cookies: name, description, flavour, price | Payload collection `cookies` | Editors in `/admin` |
| Cookie illustrations and tasting profiles (Taste Map, Finder) | Code, found by the cookie's fixed catalogue number (`src/lib/workshop-image.ts`, `src/lib/cookie-comparison.ts`) | Maintainer, through a pull request |
| Workshops: title, level, day, times, price, group size, summary, description, image, topics | Payload collection `workshops` | Editors in `/admin` |
| Workshop topics: name, description; the workshops of each topic | Payload collection `topics`; the workshop list is a join on `workshops.topics` | Editors in `/admin` |
| Orders: customer name and e-mail, cookie lines, total, status | Payload collection `orders`, written only by the server's order action | Created by users; read and updated by editors |
| Homepage, commercial video and its transcript | Page component and `public/` media | Maintainer, through a pull request |
| Cookie Finder rules, Taste Map positions, comparison characteristics | Code, keyed by the catalogue IDs | Maintainer, through a pull request |
| About, contact, FAQ copy, campus map link | Page components; CMS `pages` where configured | Maintainer and editors |
| Privacy page | CMS `pages` | Editors |
| Starter booking example: clinics, time slots, bookings, repairs | Payload collections kept from the template | Not part of the Cookie Shop tasks; kept so earlier records are not lost |

## Content model

| Collection (slug) | Fields | Links |
| --- | --- | --- |
| Workshop (`workshops`) | title*, slug* (unique), level*, day*, start time*, end time, price* (≥ 0), group size*, summary*, description, image (→ media), topics | many-to-many with Topic |
| Topic (`topics`) | name*, slug* (unique), description; `workshops` is a join, not a stored field | many-to-many with Workshop; a topic cannot be deleted while a workshop uses it |
| Order (`orders`) | name* (holds the team code for course checks), customer name*, e-mail*, items* (at least one line), total in cents*, status (default New), request ID (unique) | embeds Order lines |
| Cookie (`cookies`) | catalogue number* (unique, fixed 1–6), name*, slug* (unique), description*, flavour*, price in cents* (≥ 1) | 1 cookie – many order lines, through the catalogue number |
| Order line (embedded in an order) | cookie ID (= catalogue number), cookie name, quantity, unit price in cents | refers to a Cookie by its catalogue number; name and price are copied so a receipt stays correct after an editor changes the cookie |
| Clinic, TimeSlot, Booking, Repair (template) | as in the starter | Clinic 1–n TimeSlot 1–n Booking; not used by the Cookie Shop tasks |
| Page, Media, User, Member, Throttle | generic CMS and system collections | do not count as topic collections |

\* = required.

```mermaid
erDiagram
    WORKSHOP }o--o{ TOPIC : "workshops.topics / topics.workshops (join)"
    MEDIA |o--o{ WORKSHOP : "illustrates"
    ORDER ||--|{ ORDER_LINE : "embeds"
    COOKIE ||--o{ ORDER_LINE : "catalogue number, copied name and price"
    CLINIC ||--o{ TIME_SLOT : "template example"
    TIME_SLOT ||--o{ BOOKING : "template example"
```

The many-to-many is stored once, on the workshop, and read in both directions: a workshop page lists its topics and each topic page lists its workshops. On production on 24 November 2026 all four workshops and three topics linked consistently in both directions.

The order action checks the contact fields, cookie numbers, quantities and request ID before it opens the database, then takes each cookie's name and price from the `cookies` collection and calculates the total itself; the browser never sends a price. Pages read the cookies on the server, and the site layout hands them to the browser components (basket, comparison, box builder, Taste Map, order form), so every page shows the price the order will charge. Sending the same request again returns the existing receipt instead of a second order.

**Collections of our own topic:** `cookies`, `orders`, `workshops` and `topics` (PR #29 added `cookies`; its migration copied the six cookies with their existing numbers, words and prices). The template's `clinics`, `timeSlots`, `bookings` and `repairs` are not counted.

## Sitemap

```text
/                    Home ─┬─> /cookies, /clinics, /cookie-finder, /build-your-box, /workshops
/cookies             Our Cookies (assortment, Taste Map) ─> /compare, /clinics
/compare             Compare up to three cookies ─> /clinics
/cookie-finder       Finder and Taste Passport ─> /cookies, /compare, /clinics
/build-your-box      Four-cookie box ─> /clinics
/clinics             Order Cookies: choose, basket, test order ─> receipt on the same page;
                     the address becomes /clinics/confirmed (confirmation, not counted as a page)
/workshops           Workshop overview ─> /workshops/[slug] ─> /topics/[slug] ─> /workshops/[slug]
/about, /contact, /faq, /fortune-cookie, /privacy
/admin               Editors only (incl. order analytics and CSV export)
```

Redirects kept for old links: `/home` → `/`; `/workshops#cookies`, `#taste-map`, `#comparison`, `#cookie-1`…`#cookie-6` → `/cookies`; the retired example clinic → `/clinics`. `/clinics/[slug]`, `/clinics/[slug]/booked` and `/account` belong to the template booking example and are not linked in the menus.

## Navigation labels

Main menu, the same on phone and laptop: **Home**, **Our Cookies**, **Workshops**, **Cookie Finder**, **About Us**, **Contact**, and the highlighted **Order Cookies** button. The footer adds **Fortune Cookie**, **FAQ** and **Privacy**.

Why users understand them: the labels name what a shop customer looks for in plain words ("Our Cookies" for the products, "Order Cookies" for the action), like the competitor shops in our benchmark. "Order Cookies" is set apart visually because ordering is the primary task, and our usability test showed it had to be easier to find (test report, Finding 3, PR #17). The technical address `/clinics` comes from the template; users only see the label.

## Each user task, step by step

**1. Transactional — order cookies (primary)**

1. Home: choose **Order Cookies** in the hero or menu.
2. `/clinics`: add cookies with the + buttons (or arrive with cookies already added from Our Cookies, Compare, the Finder or the Box Builder).
3. Same page, basket: check quantities and the total; change or remove lines.
4. Same page: enter a made-up name and e-mail and choose **Place test order**.
5. Same page: the receipt appears only after the server has saved the order, and the address changes to `/clinics/confirmed`; the receipt can be printed.

**2. Informational — find and compare cookies**

1. Home or menu: choose **Our Cookies**.
2. `/cookies`: read the six cards (name, flavour, description, price); use the Taste Map to see sweetness and chocolate intensity.
3. Select two or three cookies to compare and open `/compare`.
4. `/compare`: read the differences side by side; optionally go on to order.

The Cookie Finder (`/cookie-finder`) is an optional route into the same task: a few questions lead to a recommendation, an alternative and links to compare or order.
