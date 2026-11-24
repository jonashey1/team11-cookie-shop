# Artisan Excellence visual refinement

PR #26 baseline is `059b02a78f96711f7fd9a94d9e90ec8ca255cfd7`.

- The Finder uses two-column visual answers and four progress segments. Its questions, answers, ranking and progression retain their existing logic. The Passport keeps the actual answers and recommendation, with a stamped masthead and grouped actions.
- The homepage discovery links use three coordinated editorial images. The approved hero, illustrated collections, workshop cards, commercial, Box Builder illustrations and three approved photography files are preserved.
- Desktop navigation uses the available room for a single row. Between mobile and tablet widths the existing expandable menu preserves all destinations.
- The closed Watermelon widget and order dock stay available on screen. Print CSS excludes the outer widget iframe and the fixed order dock. This does not modify provider settings or the widget interior.

## Images and rollback

The [typed placement configuration](../../src/content/excellence-visuals.ts) records each of the 16 answer-card crops and each of the three journey-card crops. Set a single entry to `null` to return to the icon-and-label fallback for that placement. Change its `src` or crop position to replace it. Use responsive local images with the approved Next allowlist. The image is decorative (empty alt); the adjacent full answer or link text names the functional control.

| Asset | Placement and role | Provenance |
| --- | --- | --- |
| `/images/workshops/classic-chocolate-chip.png` | Classic and comforting answers; Discover | Existing project illustration |
| `/images/workshops/double-chocolate.png` | Chocolate answers | Existing project illustration |
| `/images/workshops/white-chocolate.png` | Creamy and vanilla answers | Existing project illustration |
| `/images/workshops/red-velvet.png` | Red velvet answer; Compare | Existing project illustration |
| `/images/workshops/salted-caramel.png` | Balanced and caramel answers | Existing project illustration |
| `/images/workshops/cookies-and-cream.png` | Unusual flavour and creative answers | Existing project illustration |
| `/images/photography/cookie-box-counter.webp` | Surprise and Personalise | [Previously approved OpenAI-generated fictional image](../artisan-identity/photography/README.md) |

No new raster artwork was generated or acquired. Original files and rights records are untouched. The preceding text-and-icon layouts are available in the baseline commit above.

## Workshop legacy copy

The bicycle sentence came from `CAMPUS_CYCLE.pricingRule`. The starter seed writes it into the Payload `site-facts` global, and public workshop details formerly rendered that global as an optional notice. Cookie Shop has no verified cookie-specific site-wide rule for that notice, so the public component omits it. Pricing, place, workshop details and topic relationships still use their existing fields. A browser regression asserts that the obsolete text is absent even with the original seed data. Editors can review the historical field in **Payload → Site Facts → Pricing rule**; a database edit is not required for the public correction.

## Scope and human verification

This is a voluntary extension outside mandatory H2. The existing process models, traceability, UI behaviour and academic work still apply. Watermelon responses and human usability evaluation remain pending; see the [evaluation procedure](watermelon/README.md) and the [participant protocol](usability-testing.md).

## Asset dimensions and file sizes

| Existing asset | Pixels | Bytes |
| --- | ---: | ---: |
| classic-chocolate-chip | 800 × 1400 | 346267 |
| double-chocolate | 800 × 1400 | 335224 |
| white-chocolate | 800 × 1400 | 355334 |
| red-velvet | 948 × 1659 | 1672352 |
| salted-caramel | 800 × 1400 | 360454 |
| cookies-and-cream | 948 × 1659 | 1785252 |
| cookie-box-counter | 1200 × 800 | 128294 |
