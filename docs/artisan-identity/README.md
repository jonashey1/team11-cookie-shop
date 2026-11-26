# Artisan Identity visual evidence

> This record describes the implementation or evidence at the stage named below. See the [current release evidence](../current-release-evidence.md) for the latest verified status.

Before: `d7a78785e04b1a7ce3757866ebe3e15fa2d47a9f`. After: the Artisan Identity production build run locally. Before appears on the left. Both versions use the same local fictional fixtures, a light theme and matched viewport widths.

| Page | 390 px | 1100 px |
| --- | --- | --- |
| Homepage | [View pair](screenshots/home-390-pair.webp) | [View pair](screenshots/home-1100-pair.webp) |
| Assortment | [View pair](screenshots/assortment-390-pair.webp) | [View pair](screenshots/assortment-1100-pair.webp) |
| Cookie Finder | [View pair](screenshots/finder-390-pair.webp) | [View pair](screenshots/finder-1100-pair.webp) |
| Finder result | [View pair](screenshots/finder-result-390-pair.webp) | [View pair](screenshots/finder-result-1100-pair.webp) |
| Comparison | [View pair](screenshots/comparison-390-pair.webp) | [View pair](screenshots/comparison-1100-pair.webp) |
| Box Builder (empty) | [View pair](screenshots/box-empty-390-pair.webp) | [View pair](screenshots/box-empty-1100-pair.webp) |
| Box Builder (filled) | [View pair](screenshots/box-full-390-pair.webp) | [View pair](screenshots/box-full-1100-pair.webp) |
| Basket | [View pair](screenshots/basket-full-390-pair.webp) | [View pair](screenshots/basket-full-1100-pair.webp) |
| Checkout | [View pair](screenshots/checkout-390-pair.webp) | [View pair](screenshots/checkout-1100-pair.webp) |
| Footer | [View pair](screenshots/footer-390-pair.webp) | [View pair](screenshots/footer-1100-pair.webp) |

## Local verification

ESLint, TypeScript, production build, all eight committed migrations on an isolated in-memory database, and generated Payload files passed. Vitest passed 40 tests. The Chromium suite passed 48 tests and reported four existing skips. That suite includes applicable checks.json rules, axe scans, commercial playback and deferred loading, checkout and receipt printing, and guest analytics access restrictions. Nine public routes were checked for horizontal page overflow at 320, 390, 768, 1100, 1440 and 1920 px.

Five fresh Chromium contexts per case measured navigation to the first main image decoded, on loopback.

| Page | Width | Minimum / median / maximum |
| --- | --- | --- |
| Homepage | 390 px | 145 / 159 / 215 ms |
| Homepage | 1100 px | 145 / 153 / 156 ms |
| Assortment | 390 px | 158 / 164 / 173 ms |
| Assortment | 1100 px | 170 / 185 / 198 ms |
