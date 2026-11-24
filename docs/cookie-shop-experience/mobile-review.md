# Mobile-first review

## Benchmark at 390 px

Chromium with the iPhone 13 viewport, one cold browser context per public page and read-only traffic. These were point-in-time browsing observations. No comparison of hosted R8 or actual purchase completion was attempted.

| Reference | Observed | Applied here |
| --- | --- | --- |
| [Joost Arijs](https://joostarijs.be/shop/koekjes) | Category links near the product discovery entry point and a clear basket destination. | Keep the mobile menu's direct assortment destination; comparison remains directly reachable from assortment. |
| [Bar Le Cake](https://barlecake.be/collections/all) | Compact navigational entry points, product photography and name/price/actions kept near each other. | Crop Finder imagery independently on phones and put the Passport image, match and action close together. |
| [Het Koekemannetje](https://hetkoekemannetje.nl/) | Immediate order action and a distinct build-your-own journey. | Keep the approved box central and the order shortcut separate; clear space around focused checkout fields. |

## Changes and evidence

The phone Finder uses shorter image crops, preserves four clearly labelled touch choices and focuses the next question without scrolling unless the heading is off-screen. The Passport places the image beside the match on narrow screens and stacks for larger text. Comparison preserves all seven characteristics in a labelled, keyboard-focusable swipe area. Mobile email and name fields use appropriate input hints and 16px minimum text. While a customer field is focused, the order dock yields space to the form.

Checked Chromium responsive emulation at 320, 360, 375, 390, 393, 412 and 430 px, 844 × 390 landscape, and 768, 1100, 1440 and 1920 px. Used iPhone and Pixel contexts. Completed the 390 px touch journey through Finder, Passport, map, comparison, box replacement and restoration, basket and isolated Payload checkout. Workshop topics, About, Contact, all five accessibility options and Dark Mode were exercised. The automated touch regression runs in the existing Chromium and WebKit CI jobs. This is emulation; a physical device, Safari virtual keyboard and pinch-to-zoom gesture were not exercised. The viewport configuration does not restrict zoom. The Watermelon loader and frame were seen; opening the widget under read-only test conditions was not verified.

## Separate throttled mobile sample

Fresh Chromium Pixel context, 150 ms latency, 1.6 Mbps downstream, 0.75 Mbps upstream, 4× CPU slowdown. Transferred bytes observed through the short sample window, including response overhead. Third-party bytes overlap the resource columns. LCP and CLS are lab observations only.

| Local route | LCP | CLS | Image bytes | Script bytes | Third-party bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| Homepage | 1,380 ms | 0 | 84,462 | 242,673 | 24,730 |
| Assortment | 1,264 ms | 0 | 10,001 | 219,161 | 24,739 |
| Finder | 1,184 ms | 0.014 | 40,701 | 222,116 | 24,745 |

The sampled Finder tap to following answer availability took 73 ms. This is not field INP or an official R8 measurement.

## Unthrottled local R8

Five empty-browser-cache navigations per combination, time until the main heading is visible. Minimum / median / maximum in milliseconds.

| Page | 390 px | 1100 px |
| --- | --- | --- |
| Homepage | 141 / 148 / 174 | 134 / 145 / 153 |
| Assortment | 114 / 125 / 133 | 117 / 127 / 131 |
