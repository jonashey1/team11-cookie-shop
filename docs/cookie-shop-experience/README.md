# The Cookie Shop Experience

> This record describes the implementation or evidence at the stage named below. See the [current release evidence](../current-release-evidence.md) for the latest verified status.

Voluntary enhancements outside mandatory H2, with the Artisan Identity release as the base. Original workshops, commercial and approved photography stay in place.

| Area | Design, acceptance and evidence |
| --- | --- |
| Cookie Passport | Finder's actual answers and deterministic result in a flavour card. No price or profile storage. cookie-shop-experience.spec.ts exercises keyboard and comparison handoff. |
| Interactive Taste Map | Six existing Comparison profiles on ordinal axes, with a readable name list and shared comparison state; no new ratings. Coordinates are the original sweetness and chocolate categories 1 to 5, not measurements. |
| Personalised box | Optional 40/120-character preview fields, escaped by React. Only the four catalogue IDs are saved locally. Restoration prompts before replacing occupied slots. |
| Brand identity | Passport stamp, map number marks and kraft label extend existing flavour tokens without changing the approved homepage. |
| Hybrid imagery | Reuses the workshop photography and all three approved [image placements](../artisan-identity/photography/README.md). Additional pictures are unnecessary to explain the workshop content. |
| Workshops | Added fictional context to details; preserved overview, topic filters, relationships and approved illustrations. |
| Business analytics | Authenticated table of valid distinct flavour pairs, counted once per order under existing filters. Denominator is orders with two or more valid distinct flavours. Sort by count descending and label for ties. The data represents whole orders and cannot establish box groupings. Keep existing CSV and access rules. |
| DMN | [Decision table, model and DRD](decision-model/README.md). |
| Customer journey | [Canonical journey map](../customer-journey-map.md), with the current discovery, map, workshop and personalisation paths. Existing ordering BPMN still describes the same server process. |
| Watermelon and human usability | [Knowledge base and evaluation](watermelon/README.md); [participant protocol](usability-testing.md). Real observations are pending. |

## Review and course handover

Use [the existing requirements matrix](../artisan-signature/requirements-traceability.md) and [the course check contract](../COURSE-CHECK-CONTRACT.md). Optional additions leave the H1–H3 markers, API and CI unchanged. Verify Ufora's current rubric, D1–D6 mapping, accepted invitations and actual individual H3 evidence with the team. The rubric and real human feedback were not available in the repository. The [existing Happy DOM and third-party findings](../artisan-signature/release-audit.md) remain relevant.

## 90-second peer demonstration

0–10s introduce the fictional boutique. 10–25s complete Finder and read the Passport. 25–40s use the Taste Map and compare three flavours. 40–60s replace one cookie, add a digital message and save a combination. 60–75s review the basket and demonstrate a fictional checkout only in isolation. 75–90s show workshop topics and larger text, then explain how aggregate order pairs could inform a future experiment. Keep editor credentials and the protected dashboard private.

## Internal perspectives

Customer simulation: direct ordering is still available; exploration and personalisation are optional. Peer simulation: the Passport, map and kraft tray use distinct compositions on one visual foundation. Assessor simulation: link behaviour to tests, decision rules and the existing process models. These perspectives are internal checks and do not represent assessor or participant feedback.
