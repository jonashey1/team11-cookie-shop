# Test report

**Written by:** jonashey1 (Team 11 draft; real test observations still required)

This report distinguishes code checks from observation of a person using the website. Automated checks cannot substitute for the user observation requested in H2.

## What was tested, and how

- **Task:** "Place one practice cookie order on our live Cookie Shop website using made-up details. Find an available ordering session, select a time slot, enter your details and submit."
- **Who took part:** No participant observation has been supplied yet. The team must observe a fellow learner or family member, or honestly document a self-test in a private browser window.
- **Success:** The participant completes the task without assistance and reaches a confirmation page; the booking is stored.
- **Version of the site:** Production site `https://team11-cookie-shop.vercel.app/` (verify current deployment before testing).
- **Device and browser:** Not recorded yet.
- **Place:** Not recorded yet.
- **Date of the test:** Not recorded yet.

## What we saw

| # | Behaviour (what you saw) | Interpretation (what you think it means) | Uncertainty (what you are not sure of) |
| --- | --- | --- | --- |
| 1 | No actual participant behaviour has been documented yet. Record the specific action, hesitation or error observed during the test. | Cannot interpret an observation before it occurs. | Whether a first-time visitor can finish the order without help remains unknown. |

## What we changed, and the retest

- **Finding:** Observation 1 is pending; a genuine usability finding still needs to be recorded.
- **Fixed or not fixed:** Not assessed; do not claim a usability fix before observing the problem.
- **What we changed:** The existing booking code includes validation and error feedback, but no change can yet be attributed to this participant observation.
- **Pull request:** No user-test-driven pull request identified yet. Add the actual PR number if a finding leads to a code change.
- **Retest:** Not run yet. After a genuine finding is fixed, repeat the same task and record the date, participant type and outcome.

## The release check

- **Device and browser:** Not run yet.
- **What we found with the keyboard only, and at phone width:** Not run yet.
- **Our decision:** Hold pending an observed end-to-end order test and verification at phone width and with keyboard navigation.

## Not tested yet

| Not tested | What could go wrong because of it |
| --- | --- |
| First-time visitor completing a live practice order | A confusing label or missing slot could prevent the primary task |
| Phone-width and keyboard-only ordering | A control may be difficult to reach or operate |
| Screen-reader use and third-party chat widget | A user relying on assistive technology may encounter an inaccessible embedded control |

**Next evidence to collect:** Run the primary task once with made-up details and the team code `T11-S3F8` in the name. Record one observed behaviour, make and document a justified improvement if needed, then repeat the task. If the code is changed, reference the actual merged PR. The team must also verify that the saved booking is visible to the course check.
