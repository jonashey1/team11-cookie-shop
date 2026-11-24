# Cookie Shop commercial

This voluntary creative improvement is outside the required H2 scope. It introduces the personalised customer experience and may qualify for bonus consideration. No customer feedback or conversion measurements have been collected.

## Purpose and acceptance

| Area | Acceptance | Evidence |
| --- | --- | --- |
| Story | Show the personalised Finder, the comparison with optional difference highlighting, the four-slot box, basket and successful fictional order. | [Full contact sheet](./commercial-evidence/commercial-contact-sheet.jpg) |
| Screen replacement | Both physical laptop displays show the authentic website. The frame and people remain in front of the composited content. | [Browsing shot](./commercial-evidence/laptop-cookie-shop.jpg), [confirmation shot](./commercial-evidence/laptop-order-confirmation.jpg) |
| Homepage | Keep the existing hero and ordering call to action. Place the commercial below the hero and offer direct links to Finder, comparison selection and the box builder. | [Desktop](./commercial-evidence/homepage-desktop.png), [mobile](./commercial-evidence/homepage-mobile.png), [feature links](./commercial-evidence/homepage-feature-cards.png) |
| Playback | Render a 16:9 poster and an explicitly activated player. No MP4 request before activation. Native controls, a keyboard-accessible play action and an English transcript are available. | [Playback](./commercial-evidence/homepage-playback.png), Playwright commercial tests |
| Accessibility | The section must be usable at 320, 390, 768, 1100 and 1440 px, including with reduced motion and the existing accessibility options. | [Dark Mode with accessibility options](./commercial-evidence/homepage-dark.png), local Chrome and axe |

The English commercial presents “Your taste. Your choice. Your perfect cookie.” The existing links and the transcript make the experience available without watching. There is no spoken narration. The transcript describes the action, the instrumental audio and the project disclaimer. The poster and player have the same fixed aspect ratio. The CTA is native keyboard-operable and shifts focus to the player on activation.

## Production method and sources

The edit uses the team-supplied Canva export `Kitchen Craving (3).mp4`. Compared with export (2), it has fewer baked-in overlays. The original clips and supplied screen recordings were left intact. Supplied recordings were used as reference because the browser chrome and older screens were unsuitable for publication.

Fresh website recordings came from a clean Playwright browser running the branch's local production build. The order was placed with fictional details against a fresh loopback PGlite database. The genuine interface was inserted using manually tracked four-corner keyframes, interpolated homographies, colour matching and a foreground mask in the couple shot. Close-ups of the authentic browser interactions retain detail that is too small to read in the wide live-action shots. The screen inserts use captured states and cut between those states. They have no simulated live reflections.

The commercial runs 40.47 seconds. The local 1920 × 1080 master is about 16.5 MB. The staged 1280 × 720 web export is 4.29 MB, encoded in H.264 and AAC with fast-start metadata. The poster is a 960 × 540 WebP frame from the corrected browsing shot at 27 KB. The source recording and master are kept off the website. The edited export was decoded and the sequence, titles, both screen inserts and representative frames were reviewed locally.

The soundtrack is an original software-synthesised plucked-string arrangement created for this edit. It uses no third-party samples or Canva audio. Measured mean level was −21.6 dBFS and peak was −9.2 dBFS. The logo and website imagery came from this site's existing assets. Individual Canva footage asset IDs and licence terms were unavailable in the MP4. Confirm that the team has the applicable publication rights before making the previewed footage public.

AI assistance was used for local video-editing scripts, automated website capture, implementation, documentation and verification. No new performers or stock footage were generated.

## Local R8 evidence

Three ordinary, unthrottled Chrome navigations per width each used a fresh browser context with an empty cache. Elapsed time runs from navigation to the visible main heading after navigation completed. These are local production-build timings and are not measurements of the gated Vercel preview.

| Width | Before | After |
| --- | --- | --- |
| 390 px | 117–174 ms | 132–156 ms |
| 1100 px | 105–114 ms | 127–138 ms |

All samples were within the three-second target. The desktop sample was slightly slower. Network checks at all five widths showed zero MP4 requests before playback. The video dimensions were unchanged after activation. The separate 27 KB poster is available on initial page load.
