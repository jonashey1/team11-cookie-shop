# Design rationale

**Written by:** jonashey1 for Team 11

## Sketches

- **Our sketches:** Initial paper or digital sketches have not been supplied for this report. Add genuine phone-width and laptop-width sketches to `docs/` and link them here before finalising this section. Do not fabricate earlier sketches.
- **What we changed between them:** The implemented interface uses responsive wrapping navigation and content containers. A comparison of actual early sketches, including any design changes, must be added after the team provides the sketches.

## Palette and type

The values below are the live design tokens in `src/app/(site)/globals.css` (the starter's navy-and-mint palette was replaced by the Artisan identity). Components take colours only from these tokens.

| Colour (its name and value) | What it is used for |
| --- | --- |
| Ink `#38251d` (cocoa) | Main text, primary buttons, strong borders |
| Canvas `#fff8ee` (cream) | Page and card background |
| Soft ink `#684e40` | Secondary text |
| Link `#873b24` (terracotta) | Links |
| Focus `#863b22` | Focus outline |
| Tint `#f5e7d7` | Muted panels and secondary surfaces |
| Line `#a1816c` | Borders and dividers |
| Yellow `#dfa85d`, Mint `#97ad84`, Coral `#da806b`, Purple `#75465c` | Brand, success, error and accent highlights; never the only carrier of meaning |
| Footer `#34231c` with text `#fff3e5` and focus `#ffcf90` | Footer |
| Dark mode: canvas `#231a16`, ink `#fff1e2`, soft ink `#e1c9b3`, link `#ffc6a7` | The same roles when dark mode is on |

| Text colour | Background colour | Contrast ratio | Measured with |
| --- | --- | --- | --- |
| `#38251d` | `#fff8ee` | 13.73:1 | WCAG relative-luminance formula, from the CSS values (24 Nov 2026) |
| `#684e40` | `#fff8ee` | 7.23:1 | same |
| `#873b24` | `#fff8ee` | 7.43:1 | same |
| `#863b22` (focus) | `#fff8ee` | 7.48:1 | same |
| `#fff3e5` | `#34231c` | 13.69:1 | same |
| `#fff1e2` | `#231a16` | 15.38:1 | same (dark mode) |
| `#e1c9b3` | `#231a16` | 10.73:1 | same (dark mode) |
| `#ffc6a7` | `#231a16` | 11.28:1 | same (dark mode) |

- **Our fonts and sizes:** headings use Georgia/Cambria (serif, editorial); body text uses Hanken Grotesk through `next/font`, with a system sans-serif fallback. Body size is 17 px (`1.0625rem`) with line height 1.65; headings scale with `clamp()`.
- **Why these colours and fonts fit our users:** warm cream and cocoa match a bakery and make the product illustrations stand out, while every text pair stays well above the 4.5:1 WCAG AA minimum. The serif headings give a crafted, editorial tone; the sans-serif body keeps prices and form labels easy to read. Dark mode and the accessibility options keep the same roles for users who need them.

## Layout at phone and laptop width

Checked on production in a browser on 24 November 2026: at 390 px the homepage, the assortment, Order Cookies and Compare had no horizontal page scrolling. PR #27's CI checks widths from 320 to 1440 px. No physical phone was used for this check.

| Page | On a phone (390 px wide) | On a laptop (1100 px wide) |
| --- | --- | --- |
| Home | Hero, Order Cookies button and feature cards stack in one column | Wider hero with the same calls to action; cards use several columns |
| Our Cookies | One product card per row; the Taste Map follows the cards | Several cards per row; the Taste Map has room for its plotted markers and name list |
| Compare | The comparison table scrolls sideways inside its own box, not the page | All selected cookies side by side |
| Order Cookies | Products, basket and details are three stacked numbered sections; a floating basket button links to the basket | The same three sections with more room per product row |
| Navigation | A menu button opens the same links as on laptop | All menu links in one row, Order Cookies highlighted |

## The principles we applied

| Principle | What we did | Where it shows on our site |
| --- | --- | --- |
| Visibility of system status | The submit button shows "Saving your order…"; the receipt appears only after the server confirms; the basket total updates on every change | Order Cookies |
| Error prevention | Quantities limited to 0–20 per cookie; submit disabled while the basket is empty or saving; the server recalculates prices and refuses unknown cookies | Order Cookies |
| Recognition rather than recall | Every cookie keeps the same illustration, name and price on the assortment, comparison and order pages | Our Cookies, Compare, Order Cookies |
| Fitts's Law | Inputs and main buttons are at least 44 px high (`min-h-11`); Order Cookies is a large, highlighted button in the hero and menu | Navigation, homepage, order form |
| Accessibility and user control | Dark mode, five accessibility options, skip link, visible focus outline, reduced-motion version of the celebration | Across the public site |

## Forms and feedback

**Form:** the cookie order form on `/clinics` (`src/components/site/CookieOrderForm.tsx`).

| State | What the user sees |
| --- | --- |
| Empty | Visible labels "Name (made-up)" and "Email (made-up)" with light example placeholders; "Place test order" is disabled until the basket has a cookie |
| Pending | The button reads "Saving your order…" and every control is disabled, so the order cannot be sent twice |
| Invalid | The browser's required-field and e-mail checks stop the submission; a server refusal appears as "Order not confirmed." with the reason, in an alert |
| Failed | A lost connection shows "We could not confirm whether your order was saved. Please try again; your basket is kept." |
| Repeated | The same request ID returns the existing receipt instead of saving a second order |
| Saved | A receipt with reference, lines and total appears in a status region; the basket empties; a decorative cookie box animates unless reduced motion is on; the receipt can be printed |

The empty, pending and keyboard path were checked on production on 24 November 2026 (without submitting). The failed and repeated states are covered by automated tests on isolated data.

## What makes it our own

- **What differs from the starter:** Cookie Shop terminology and catalogue, Cookie Finder, Fortune Cookie, dark/light theme switching, Accessibility Center, interactive FAQ and a Watermelon AI chat widget. These are voluntary creative extras beyond the required H2 scope, added to improve the experience and potentially earn a bonus point, without any guarantee. The main navigation uses cookie-oriented labels, although some technical collection and URL names still come from the starter.
- **What we kept from the starter, and why it fits our users:** The accessible form pattern, visible error feedback, CMS-backed records and server-side validation provide a practical basis for the order task. Retaining these patterns reduces the risk of breaking the primary transactional workflow.

## PR #27 rationale and observed implementation

The current CSS tokens use cocoa ink (#38251d) on cream (#fff8ee), soft cocoa (#684e40) for secondary text and deep terracotta (#873b24) for links. Georgia/Cambria shape the headings; Hanken Grotesk is the body face. Sass or additional fonts are not needed.

- **Recognition and similarity:** six illustrations repeat across the assortment and order cards. Each item has a visible name and flavour, so identifying it does not depend on colour or recall.
- **Proximity and common region:** title, price and illustration sit in each product region. Quantity controls, basket review and customer details each have their own labelled section.
- **Continuity and hierarchy:** the assortment moves from direct flavour links to all products and then to optional Taste Map exploration. The workshop overview now has a dedicated menu link. The homepage hero still offers direct discovery and box actions before the commercial.
- **Closure and figure/ground:** the receipt confirms completion with persistent text, reference and total. Motion is decorative and may be disabled. Theme tokens maintain the foreground and background distinction in the standard, dark and high-contrast views.
- **Feedback and error prevention:** labels remain visible after typing. A failed order remains actionable without showing celebration. The successful order reference is stable on retry.
- **Evidence:** Chromium and WebKit exercise representative mobile and desktop views. The corrected screenshots show the streamed workshop content at both widths. This review is retrospective and does not supply original sketches or new participant observations.

## Compliance consolidation

Our Cookies keeps the six product cards before optional exploration. Comparison now has a direct section link and the same seven characteristics, selection limit and differences control. Contact keeps the opt-in campus map and embeds the FAQ, and About keeps the project story before the optional Fortune Cookie. The three prior URLs redirect to the matching focusable sections. Screens use the same approved illustrations and visual components; editors can change catalogue content in Payload without changing the interaction design.
