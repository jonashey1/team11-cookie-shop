# Competitive benchmark — Cookie Shop Experience

Reference: `79bfebe780a2fa7f8b623705c1e30aec6e124103`. The separate original masterprompt could not be recovered. This audit uses the explicit completion checklist, Artisan Excellence brief and [Mobile-First review](mobile-review.md).

## Evidence

Chromium at 1100 × 844 and iPhone 13 emulation at 390 CSS px. Reviewed public home and assortment/editorial routes, their first-screen hierarchy and catalogue entry points. The successful pages had no horizontal page overflow at these widths. These snapshots cover discovery, not conversion, fulfilment, a full accessibility audit or comparative R8. The repeated Joost mobile catalogue request returned HTTP 429 after an earlier successful 390 px visit.

| Website | 1100 px | 390 px | Transferable principle |
| --- | --- | --- | --- |
| Joost Arijs | Shop, brand story, business gifts and locations are separate entries. Cookie range sits inside the shop taxonomy. | Home exposes Shop and bag. The first successful cookie catalogue visit exposed product categories; the later rate limit prevented a repeat. | Distinguish browsing the range from explaining who the shop is. [Home](https://joostarijs.be/) · [Cookies](https://joostarijs.be/shop/koekjes) |
| Bar Le Cake | Product names and actions appear in the homepage merchandising. The catalogue offers availability, price and sorting controls. | Search, basket and menu stay legible; the catalogue consolidates its filters under one control. Skip links were exposed on both widths. | Put product decision information together and scale discovery controls to the size of the range. [Home](https://barlecake.be/) · [Catalogue](https://barlecake.be/collections/all) |
| Het Koekemannetje | A seasonal tin and bestsellers get distinct calls to action, with a dedicated cookies page. | The order and bestsellers calls to action remain visible on the homepage. The cookies page uses editorial images. | Make the range feel recognisable and connect the product story to an obvious next step. [Home](https://hetkoekemannetje.nl/) · [Our cookies](https://hetkoekemannetje.nl/pages/onze-koeken) |

## Weighted assessment

Editorial assessment of the observed public journeys, not user research. 1 = weak or absent, 3 = adequate, 5 = especially clear on both sampled widths. Weighted score = sum of each rating divided by 5 and multiplied by its weight.

| Site | Range discovery 30% | Product decision cues 25% | Mobile hierarchy 25% | Story and art direction 20% | Weighted /100 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Joost Arijs | 4 | 3 | 4 | 4 | 75 |
| Bar Le Cake | 5 | 5 | 4 | 4 | 91 |
| Het Koekemannetje | 4 | 4 | 4 | 5 | 84 |
| Cookie Shop before | 3 | 4 | 4 | 4 | 74 |
| Cookie Shop after | 4 | 5 | 4 | 4 | 85 |

Joost remains a reference for brand architecture, Bar Le Cake for deeper merchandising and Het Koekemannetje for a recognisable editorial identity. The Cookie Shop's six-item catalogue can give every flavour a direct path. Its tasting notes, comparison and box make the selection more guided. The visual strength of the existing product cards and mobile layout had already been achieved before this review. The About copy is now more specific, but this is a limited change rather than an entirely new brand narrative. The scores reflect this reviewer's rubric and cannot establish commercial superiority.

## Prioritised improvements and evidence

| Priority | Finding | Action and status | Before / after evidence |
| --- | --- | --- | --- |
| 1 | Cookie cards begin after the Taste Map and comparison controls | Added a named, wrapping six-flavour index above the map. Native links target focusable product cards. | Assortment introduction at 390 and 1100 px |
| 2 | Price was below the tasting copy, separated from the name | Moved canonical catalogue price alongside the product name, allowing wrapping. | First product at 390 and 1100 px |
| 3 | About copy described generic shopping goals | Connected real site features and workshop techniques to the fictional project premise. | Our Story at 390 and 1100 px |
| Later | Collection illustrations are distinctive, but crops do not communicate crumb texture at a glance | Keep approved assets. Original matching six-flavour close-ups and real baking process shots could complement the illustrations. Validate crop, contrast and weight before introducing them. | Product and About captures |

Existing photography gives the story section a realistic editorial context. Consistent illustration framing makes the collection recognisable. Fine texture differences are less apparent than in product close-ups. A future matched shoot could use consistent light and scale, plus detail shots for the tasting journey. Competitor imagery is reference material only. No new imagery was necessary to address the discovery and readability gaps.
