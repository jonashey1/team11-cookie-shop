# Design rationale

**Written by:** jonashey1 (draft for Team 11; team review needed)

## Sketches

- **Our sketches:** Initial paper or digital sketches have not been supplied for this report. Add genuine phone-width and laptop-width sketches to `docs/` and link them here before finalising this section. Do not fabricate earlier sketches.
- **What we changed between them:** The implemented interface uses responsive wrapping navigation and content containers. A comparison of actual early sketches, including any design changes, must be added after the team provides the sketches.

## Palette and type (historical starter reference)

These values describe the earlier starter palette, retained as historical design context. The current palette is described below.

| Colour (its name and value) | What it is used for |
| --- | --- |
| Ink `#001c54` | Main text and strong borders in light mode |
| Canvas `#ffffff` | Main background in light mode |
| Soft ink `#46597a` | Secondary text |
| Link blue `#0d51d7` | Links and focus indicators |
| Mint `#33dfc8` | Brand accent and framed offsets |
| Purple `#705bfe` | Additional accent |
| Coral `#ff6868` | Additional accent and error states |
| Yellow `#ffcf11` | Additional accent and warnings |
| Dark canvas `#101827` | Main background when dark mode is active |
| Dark ink `#f3f6ff` | Main text when dark mode is active |

| Text colour | Background colour | Contrast ratio | Measured with |
| --- | --- | --- | --- |
| `#001c54` | `#ffffff` | 16.23:1 | WCAG relative-luminance formula, calculated from CSS values |
| `#46597a` | `#ffffff` | 7.07:1 | WCAG relative-luminance formula |
| `#0d51d7` | `#ffffff` | 6.61:1 | WCAG relative-luminance formula |
| `#f3f6ff` | `#101827` | 16.44:1 | WCAG relative-luminance formula |

- **Our fonts and sizes:** The CSS design system uses Hanken Grotesk through `next/font`, with system sans-serif fallback. Base body size is approximately 17 px (`1.0625rem`); larger headings use responsive `clamp()` sizes. Headings use heavy weights to establish hierarchy.
- **Why these colours and fonts fit our users:** Navy and white keep the ordering information readable; bright accents make interactive and playful cookie content more recognisable without using accent colours as the only way to communicate meaning. A separate dark mode supports personal preferences.

## Layout at phone and laptop width

These are design intentions and code-supported patterns; a visual check at exactly 390 px and 1100 px remains necessary.

| Page | On a phone (390 px wide) | On a laptop (1100 px wide) |
| --- | --- | --- |
| Home | Content should stack vertically with clear calls to action | More horizontal room for introductory content and calls to action |
| Our Cookies | Catalogue should remain readable in a narrow viewport | Catalogue can use available width for more content per row |
| Order Cookies / booking | Form controls should fit one narrow column | Form can use a wider reading area without overly long lines |
| Navigation | Links wrap onto additional lines if needed | Links fit into fewer rows |

## The principles we applied

| Principle | What we did | Where it shows on our site |
| --- | --- | --- |
| Visibility of system status | Booking form distinguishes pending, invalid and saved outcomes | Order form and confirmation page |
| Error prevention | Server-side validation, required fields and availability checks protect submissions | Booking flow |
| Fitts's Law | Navigation uses links with a minimum height of 44 px (`min-h-11`) | Main navigation |
| Signifiers and consistency | Links are underlined and buttons have recognisable frames and focus states | Navigation and forms |
| Accessibility and user control | Added dark mode and a five-option Accessibility Center | Across the public site |

## Forms and feedback

**Form:** Practice order / booking form at `/clinics/[slug]`.

| State | What the user sees |
| --- | --- |
| Empty | Time slot, name and email are requested; note is optional |
| Pending | Booking submit control shows a saving state and prevents repeated clicks |
| Invalid | A summary and field-specific error messages explain what needs correction; entered values are retained |
| Full | A server-side capacity or availability rejection is returned as a booking problem; confirm exact wording during live test |
| Failed | A connection failure keeps the form data and explains that the server could not be reached |
| Repeated | A request ID is used to avoid saving the same submission twice |
| Saved | The site redirects to the booking confirmation route |

The descriptions above reflect the booking code and its documented behaviour. They do not replace a live manual test of every state.

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
