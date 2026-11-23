
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

## The release check

- **Device:** Laptop.
- **Browser:** Not recorded.
- **Phone-width test (390 px):** The ordering page was checked at a narrow screen width.
- **Keyboard-only test:** The ordering interface was checked using keyboard navigation.
- **Screen-reader test:** The ordering interface was checked using a screen reader.
- **Production order verification:** The live ordering process and its database storage were checked.
- **Our decision:** The user test was completed successfully. The additional release checks were performed. No further changes were identified as necessary during the reported tests.

## Not tested yet

All planned checks have been completed. No additional outstanding tests were identified during this testing round.

## Conclusion

On 23 November 2026, a family member independently completed the task of ordering three cookies on a laptop without assistance or reported difficulties.

The ordering system was implemented through **pull request #12**. A separate functional test confirmed that a local order could be submitted and stored correctly in Payload CMS, including the selected products, quantities and total price.

The additional release checks covered the mobile layout, keyboard navigation, screen-reader accessibility and production ordering process.

No usability problems requiring further changes were reported during these tests.
