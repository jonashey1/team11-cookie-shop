# Artisan Signature release candidate audit

This supplements the [requirements matrix](./requirements-traceability.md) and [quality report](./quality-report.md). The audit changes dependency resolution and browser coverage. Application routes, design, collections and migrations are unchanged.

## Production dependency findings

The baseline npm audit had two high-severity package groups. A group may contain several advisories. Follow-up audit counts also include dependent-package entries.

| Dependency path | Installed before → after | Affected capabilities and applicability | Decision |
| --- | --- | --- | --- |
| payload 3.90.2 → undici | 7.29.0 → 7.30.1 | High advisories cover WebSocket subprotocol validation, HTTP response decoding, cross-origin redirect caching, TLS options and renegotiation. Payload uses Undici's Agent and fetch for remote uploads. Media writes are editor-only and the public checkout does not configure WebSockets or a shared Undici cache. The editor upload path remains relevant. | Payload pins 7.29.0. Use a narrowly scoped same-major override, compatible with Node 22, and rerun application and CI checks. Remove the override once the upstream pin is fixed. |
| @payloadcms/storage-vercel-blob 3.90.2 → @vercel/blob 2.3.1 → undici | 6.29.0 → 6.29.1 | High advisories affect HTTP response decoding and TLS behaviour. Storage requests originate in the Blob adapter when configured, so a local fixture run does not prove hosted Blob behaviour. | Update the lockfile within Blob's existing ^6.23.0 range. Retest hosted editor uploads in a disposable setting if needed. |
| @payloadcms/richtext-lexical 3.90.2 → @lexical/headless 0.50.0 → happy-dom | 20.14.5 → 20.14.6 | GHSA-c8p4-j97h-3vg8 applies to loading external resources from untrusted HTML and is patched. GHSA-834v-8h66-3h79 concerns code execution through unsandboxed script import aliases and still applies to the installed package. The public routes render structured Lexical content. No public user-supplied HTML-to-Lexical or server-side Happy DOM scripting path was found in the app. Editor/import workflows and future raw HTML processing still matter. | 20.14.6 is within Lexical's ^20.9.0 range. 21.0.4 fixes the remaining finding but is outside that range. Do not force it into the editor stack. Follow a compatible upstream release. |

Undici high advisory IDs checked: [GHSA-rfgv-xxqx-mfg5](https://github.com/advisories/GHSA-rfgv-xxqx-mfg5), [GHSA-w293-vg96-wgc3](https://github.com/advisories/GHSA-w293-vg96-wgc3), [GHSA-xjj6-f33q-929c](https://github.com/advisories/GHSA-xjj6-f33q-929c), [GHSA-4w7w-5xrc-9h26](https://github.com/advisories/GHSA-4w7w-5xrc-9h26), [GHSA-2m5v-pch6-74hx](https://github.com/advisories/GHSA-2m5v-hcqq-7hcx), and [GHSA-qrxm-fqhp-jwvm](https://github.com/advisories/GHSA-qrxm-fqhp-jwvm). Happy DOM: [remaining code execution advisory](https://github.com/advisories/GHSA-834v-8h66-3h79), [patched outbound-request advisory](https://github.com/advisories/GHSA-c8p4-j97h-3vg8).

After the updates, no Undici high finding is reported. npm audit lists three high entries for one residual advisory and its two dependent-package entries, with no critical entries. Reachability findings are static review, with no exploitation attempts or production tests.

## Browser exclusions and verification

The four existing skips are two cases at 390 px and the same two at 1100 px. With the additional WebKit run, the same exclusions are counted separately per engine.

- **No-JavaScript missing page.** The starter asserts Next.js's known empty error page and exact internal HTML. Its condition restricts that expectation to Campus Cycle. A user-facing invalid route remains relevant. The app has alternative JavaScript-enabled 404 observation and browser navigation checks. The skipped internal markup assertion remains unverified for this site.
- **Course checks for /clinics/{test-clinic}.** That placeholder needs the starter's synthetic booking clinic, absent in Cookie Shop mode. The old booking form checks fields that do not belong to the cookie order task. The current /clinics route, fictional checkout, form labels, validation, failure and receipt have separate coverage. This does not create a replacement test fixture for the legacy booking route.

Playwright WebKit's Windows host validator reported bundled DLLs such as brotlicommon.dll and webkit2.dll as unresolved. Reinstallation with the supported dependencies flag and a temporary process PATH addition did not resolve it. CI runs the same suite with WebKit on Ubuntu, after the existing Chromium run, using the same isolated PostgreSQL setup. Playwright WebKit is not Apple Safari or a physical iPhone test.

## R8 follow-up and production protocol

The original production mobile outlier exceeded three seconds. Its exact duration, headers and server trace were not retained. The current code renders the static cookie catalogue before resolving the separate dynamic Payload workshop list. The workshop fetch remains uncached and the route stays dynamic. That makes a cold runtime, a cold database, or image/browser work plausible contributors, without proving that any caused the historical sample. The main heading was the measurement marker, so image and chat loading should be recorded separately. The existing local mobile hero optimiser timeout was independently observed and the existing 26.5 KB pre-optimised WebP avoids it. The video is still deferred. No additional architecture or caching change was justified by the available evidence.

After merge, confirm the deployed commit. Then capture at least five normal-network navigations per width (390 and 1100) for / and /workshops, each in a fresh context with HTTP cache disabled. Record the first observation separately, plus minimum, median and maximum. Measure navigation start to the visible H1 or #cookies-heading as in the prior benchmark. Record document TTFB and workshop appearance separately. Capture response cache headers, request timing, images and third-party activity, and retain any over-three-second outlier. If it repeats, correlate the timestamp with Vercel and Neon telemetry before making changes. Report the local, preview and production results separately. Use read-only browser requests and no production test orders.

## Academic handover

- Export the current official Ufora rubric and map D1–D6 to the exact handed-in files and evidence. The repository's brief, decisions, requirements, test report and handover are evidence, with the official mapping still unconfirmed.
- Confirm which teacher account is official and that the invitation is accepted. Xander must accept his own invitation. GitHub still reports the inspected invitations pending.
- Check genuine individual H3 contributions and credit in the course app. Keep contribution links or legitimate pairing evidence and record only actual authors.
- Run the prepared [participant protocol](./review-protocol.md). Keep anonymised first-pass observations, changes and a real retest separate.
- Confirm public reuse rights for the Canva footage. The MP4 alone does not identify the applicable licence.
- Verify the final commit and submission checklist in Ufora before a team member submits it. CI does not grant course credit.

AI assisted with dependency review, test environment configuration, execution and documentation. Tests used a disposable database.
