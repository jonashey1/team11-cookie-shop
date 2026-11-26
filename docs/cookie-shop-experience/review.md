# Local review and verification

> This record describes the implementation or evidence at the stage named below. See the [current release evidence](../current-release-evidence.md) for the latest verified status.

All captures show an isolated production build and fictional data. The analytics capture shows only aggregate figures. Desktop and mobile denote CSS viewport widths, not physical devices.

| Feature | 390 px | 1100 px |
| --- | --- | --- |
| Passport | [Mobile](evidence/passport-390.jpg) | [Desktop](evidence/passport-1100.jpg) |
| Taste Map and selected flavour | [Mobile](evidence/taste-map-390.jpg) | [Desktop](evidence/taste-map-1100.jpg) |
| Optional box personalisation | [Mobile](evidence/box-390.jpg) | [Desktop](evidence/box-1100.jpg) |
| Workshop detail | [Mobile](evidence/workshop-390.jpg) | [Desktop](evidence/workshop-1100.jpg) |
| Dark Mode and accessibility options | [Mobile](evidence/map-dark-390.jpg) | [Desktop](evidence/map-dark-1100.jpg) |
| Protected analytics | | [Desktop](evidence/analytics-1100.png) |

## Test evidence

The merged baseline passed 40 Vitest tests and 50 browser tests with four existing skips. The four skips in the Cookie Shop configuration cover two starter-only widgets/paths at each viewport: the no-JavaScript 404 internals and the original bookable clinic fixture.

The new unit suite covers all 256 Finder inputs, the six map positions, saved-box parsing and prices, input limits and order-pair aggregation. The targeted browser checks exercise keyboard activation, three-item comparison limit, literal HTML-like gift text and save/restore/remove. A separate loopback check submitted a fictitious order using double activation: a single request saved two Classic Chocolate Chip and one Double Chocolate cookie for €10.95. The protected analytics table and editor CSV were reachable and guest CSV returned 403.

Public experience pages were checked for overflow at 320, 390, 768, 1100, 1440 and 1920 px. Dark Mode and the five Accessibility Center options were activated together at 390 and 1100 px. Axe found no serious or critical issues in the tested isolated first-party views. This does not establish WCAG conformance, physical device behaviour or Watermelon iframe contrast.

## R8

Chromium on loopback, five fresh browser contexts per combination, browser cache disabled. Navigation to visible heading in milliseconds. Baseline and candidate were run locally with the same browser and hardware, each using its own in-memory fixture database. The historical production timings from PR #25 are a separate reference.

| Page | Width | Baseline min / median / max | Candidate min / median / max |
| --- | ---: | ---: | ---: |
| Homepage | 390 | 180 / 187 / 246 | 166 / 169 / 190 |
| Homepage | 1100 | 169 / 182 / 190 | 150 / 156 / 177 |
| Assortment | 390 | 152 / 156 / 174 | 141 / 142 / 162 |
| Assortment | 1100 | 158 / 160 / 174 | 156 / 161 / 166 |

These observations are below three seconds. Hosted preview speed has not been measured. The samples are small and do not establish a general speed improvement.
