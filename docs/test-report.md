
# Test report

**Written by:** jonashey1 — Team 11 (T11-S3F8)

This report documents the functional testing, user observation and release checks of the Cookie Shop ordering system.

## What was tested, and how

- **Task:** "Order three cookies through the Cookie Shop website. Select the cookies, enter the required customer details and complete the order."
- **Who took part:** One family member (my sister). She performed the task independently, without assistance.
- **Success:** The participant completes the ordering process independently, without encountering difficulties.
- **Version of the site:** Cookie Shop website, with the ordering system implemented through PR #12. Production URL: https://team11-cookie-shop.vercel.app/clinics
- **Device and browser:** Laptop. Browser not recorded.
- **Place:** Not recorded.
- **Date of the test:** 23 November 2026.

## What we saw

| # | Behaviour (what you saw) | Interpretation (what you think it means) | Uncertainty (what you are not sure of) |
| --- | --- | --- | --- |
| 1 | The participant independently completed the task of ordering three cookies. | The ordering process was understandable for this participant. | Other users may experience the website differently. |
| 2 | The participant completed the task without reporting difficulties or needing assistance. | No obvious usability obstacles were identified during this test. | A single participant cannot represent all users. |
| 3 | A separate functional test order was successfully submitted locally. | The ordering form was able to process the selected products. | Local functionality does not automatically guarantee identical production behaviour. |
| 4 | The local test order appeared in Payload CMS with the correct products, quantities and total of €11.85. | The local ordering process correctly stored the order in the database. | This observation concerns the local database. |

## What we changed, and the retest

### Finding 1 — A working cookie ordering system was needed

- **Finding:** The website previously did not support placing cookie orders.
- **Fixed or not fixed:** Fixed.
- **What we changed:** We implemented a cookie ordering interface with six cookie products, quantity controls, an order summary and an order form. We also added server-side validation and an Orders collection in Payload CMS.
- **Pull request:** [#12 — Add cookie ordering system with Payload CMS](https://github.com/jonashey1/team11-cookie-shop/pull/12).
- **Retest:** On 23 November 2026, a local test order containing Red Velvet, Salted Caramel and Cookies & Cream was successfully submitted. The order appeared in Payload CMS with the correct quantities and total price of €11.85. The ordering page was subsequently confirmed to be visible on the production website.

### Finding 2 — User test with a family member

- **Finding:** The participant completed the ordering task independently without difficulties.
- **Fixed or not fixed:** No usability issue was identified.
- **What we changed:** No additional changes were necessary based on the participant's observations.
- **Pull request:** Not applicable. No code change resulted from this user test.
- **Retest:** No corrective retest was required because the observed test did not reveal a usability problem.

## Production verification — 23 November 2026

These checks were performed separately from the observed sister usability test, using the deployed production website:

- A fictional test order was submitted successfully on `/clinics`, and the confirmation displayed reference `bcf3710b-4475-4f19-83c5-cd55e43ea4b5`.
- The matching reference was found in production Payload `/admin` under Orders, with status **New** and displayed total **€11.20**. This confirms production persistence for that order; a separate recorded item-by-item quantity comparison is still needed for the exact R2 acceptance test.
- Vercel Web Analytics displayed **1 visitor and 7 page views** during the manual check. These are point-in-time observations, not permanent totals or evidence that custom events are supported.
- The live Contact page displayed the OpenStreetMap integration and its privacy explanation; a recorded click-to-load test is still outstanding.

## The release check

- **Device:** Laptop for the earlier sister test; browser was not recorded.
- **Phone-width test (390 px):** A prior report says this was checked, but the viewport, procedure and results were not recorded sufficiently to reproduce it. Recheck and document.
- **Keyboard-only test:** Previously reported as checked; record the actual navigation steps and any focus issues in a repeatable test.
- **Screen-reader test:** Previously reported as checked; the reader, browser, steps and results were not recorded. Do not treat this as independently confirmed accessibility compliance.
- **Production order verification:** Confirmed as described above.
- **Our decision:** Production ordering and page-view analytics have been demonstrated. Remaining acceptance checks and the user-driven change/retest are open.

## Follow-up usability observation — 23 November 2026 (reported)

- **Participant:** My sister (family member).
- **Task:** Explore the Cookie Shop website, then place a fictional cookie order. The tester initially explored the website freely, including the AI chatbot. The observer then explicitly asked whether she could place an order.
- **Devices:** iPhone and laptop. Specific browser versions were not recorded.
- **Duration:** Approximately 3 minutes (reported for the session; separate timing per device was not recorded).
- **Outcome:** She successfully placed an order. The observer reported that the ordering process went smoothly, without visible difficulties.
- **Observed behaviour:** She explored the website thoroughly and experimented with the AI chatbot before receiving the explicit order prompt. After that prompt, she completed the order without reported difficulty.
- **Participant feedback:** She liked the site's appearance. She specifically appreciated the availability of dark mode and larger text, which she said helped her read the website more clearly.
- **Interpretation:** The order flow was usable for this participant once she was directed to the ordering task. The accessibility preferences were valued by this participant.
- **Uncertainty:** The exact browser, separate device-specific steps, order details, and whether she would have discovered the ordering flow without the observer's prompt were not recorded. Her positive feedback does not establish accessibility compliance for all users.
- **Additional participant feedback (reported afterward):** She said it was not immediately easy to find where to order cookies. This qualifies as a reported navigation/discoverability issue, even though she completed the order successfully after being prompted.
- **Change prepared in this patch:** The homepage hero now has a prominent **Order Cookies** link to `/clinics`, and the ordering card also has a direct button. Outdated “coming soon” copy is removed.
- **Retest:** **Pending.** After the change is deployed, ask her to open the homepage again and find where to order without help. Record whether she finds the link, the approximate time, and any hesitation. Do not mark the retest as passed before observing it.
- **Accessibility feedback:** Dark mode and larger-text options already existed at test time and were appreciated; they were not introduced as a result of this observation.

### Finding 3 — Order link discoverability (participant feedback)

- **Finding:** The participant said the location of the ordering flow was not immediately clear.
- **Change:** Add a primary **Order Cookies** button in the homepage hero and a direct ordering button in the homepage order card; replace the outdated “coming soon” text.
- **Evidence:** Reported feedback from the participant after the session. No precise hesitation time or click path was recorded.
- **Pull request:** To be filled in after the change is pushed and merged.
- **Retest:** **Not yet performed.** On the deployed version, ask the same participant to locate the order page starting from the homepage without instructions. Record what she clicks and whether she finds it without prompting.

### Suggested retest procedure

Ask a participant to complete the following without guidance: "Find two cookies, compare their prices and flavours, choose three cookies and submit a fictional order." Record where they hesitate, what they click and whether they find the order page without prompting. If a real issue occurs, implement a narrowly scoped fix, identify its PR, then ask the participant to repeat the affected step and record the result. If no issue occurs, report that honestly rather than inventing one.

## Not tested yet

- Retest of the improved homepage order navigation after production deployment; record real observations.
- Independently observed second informational user task (without prompting).
- Exact two-cookie quantities and items in production `/admin` for the R2 acceptance scenario.
- Reproducible keyboard-only and 390 px mobile acceptance checks.
- Empty-cache loading measurement for R8.
- OpenStreetMap click-to-load and workshop-to-topic-to-workshop production records.
- Individual contributions and GitHub access are tracked separately in the H3 checklist.

## Conclusion

The follow-up sister test lasted approximately three minutes across an iPhone and laptop. She explored the chatbot and, after being prompted to order, completed the order smoothly. She appreciated dark mode and larger text. After the session, the participant reported difficulty quickly locating the ordering route. A homepage navigation improvement is prepared, but its deployment and retest are not yet verified. Separately, a production test order and its database record were confirmed on 23 November 2026, and Vercel Analytics recorded page views. H3's user-observation improvement and several reproducible acceptance checks remain to be completed and recorded honestly.
