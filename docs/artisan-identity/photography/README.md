# Hybrid Artisan photography

> This record describes the implementation or evidence at the stage named below. See the [current release evidence](../../current-release-evidence.md) for the latest verified status.

Three new editorial images illustrate the fictional Cookie Shop. The illustrated homepage, workshop cards, commercial, Finder, Comparison and Box Builder keep their existing art.

[Open the contact sheet](contact-sheet.webp) or inspect each placement in context. The captures use the same local production-build fixtures, with before on the left and after on the right. The workshop capture uses the Cookie Decorating Workshop demo record.

| Image | Mobile 390 px | Desktop 1100 px |
| --- | --- | --- |
| About team | [Before and after](about-390.webp) | [Before and after](about-1100.webp) |
| Contact counter | [Before and after](contact-390.webp) | [Before and after](contact-1100.webp) |
| Workshop decoration | [Before and after](decorating-390.webp) | [Before and after](decorating-1100.webp) |

## Replace or restore an individual image

Open [the typed image configuration](../../../src/content/artisan-photography.ts). Set just one key to `null` to revert that placement. About and Contact return to their text-only sections. The workshop detail retains its original title illustration and returns to layout without the additional figure. Restore the previous object to enable it again.

To use a different image, put a new WebP file in `public/images/photography/` and update that key’s `src`, `width`, `height`, `alt` and `caption`. Use the actual pixel dimensions and describe what the replacement depicts. Keep the existing file for rollback.

| Key and placement | Source file | Dimensions | Alternative text | Original fallback |
| --- | --- | --- | --- | --- |
| `aboutTeam`, About Us / Our Story | `/images/photography/fictional-bakery-team.webp` | 1200 × 800 | Five bakers in neutral aprons preparing trays of cookies around a kitchen table. | Original text-only story |
| `contactCounter`, Contact / Get in Touch | `/images/photography/cookie-box-counter.webp` | 1200 × 800 | A hand places a chocolate chip cookie into a kraft box on a kitchen counter. | Original text-only contact introduction |
| `decoratingWorkshop`, Cookie Decorating Workshop detail (`salted-caramel` or `cookie-decorating-workshop`) | `/images/photography/decorating-workshop.webp` | 1200 × 800 | Hands pipe icing onto cookies arranged on a baking tray. | Existing title illustration `/images/workshops/cookie-decorating-workshop.png` and detail content |

## Provenance and usage rights

All three images are original output from OpenAI’s built-in ImageGen tool, generated for this fictional university project from text prompts. No third-party stock photographs or photographs of real project members were used. OpenAI’s European terms describe the user's rights in output as between the user and OpenAI, subject to applicable law. [OpenAI Europe Terms of Use](https://openai.com/policies/eu-terms-of-use/)

### Prompts

- **team** — Landscape editorial lifestyle photograph for a fictional artisan cookie bakery, five adult bakers around a kitchen worktable, neutral oatmeal and cocoa linen aprons, two handling separate trays of chocolate chip cookies, others working casually, a candid natural expression, everyday believable proportions and hands, warm window light, matte warm cream walls and light timber. Medium-wide horizontal framing, all five faces visible, realistic skin and baking textures, no logos or text.
- **counter** — Landscape editorial lifestyle photograph in the same warm artisan cookie bakery visual direction, a countertop with an open unbranded kraft box, a few freshly baked chocolate chip cookies and a hand gently arranging one cookie in it. Close-up composition, cream linen, beige plaster, natural soft window daylight, tactile crumbs, no storefront or identifying signs, no words or logos.
- **workshop** — Landscape candid editorial lifestyle close-up showing hands decorating small cookies on a tray with piping bags at a warm neutral kitchen table; realistic icing and anatomically believable hands, mugs and tray in soft background, cream, caramel and cocoa colours, natural daylight, no faces needed, no text, no logos, understated and genuine.
