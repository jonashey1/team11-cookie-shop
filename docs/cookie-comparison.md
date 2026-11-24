# Cookie comparison

This is a voluntary creative enhancement outside the required H2 scope. It complements the existing product comparison task without replacing course work.

## Problem and user story

Customers who are uncertain about which cookie to choose need an efficient way to compare relevant product characteristics without navigating repeatedly between individual products.

As a customer, I want to compare multiple cookies side by side so that I can make an informed decision and easily add my preferred cookie to my basket.

## Business value and journey

A customer can start from the assortment or a Cookie Finder recommendation, compare prices and flavours, and add a cookie to the existing basket. Holding the information together reduces decision effort, makes the catalogue easier to explore and keeps the transition to ordering simple. A semantic table and labelled controls make the same information available by keyboard and to assistive technology. These are design goals; no conversion or user-study results are claimed.

## Acceptance criteria

- Given the assortment, selecting distinct cookies adds them to the inline selection. At three, a fourth selection reports the limit. The comparison link becomes available at two.
- Given selected products, opening the comparison shows catalogue names, illustrations and current prices, with accessible ratings out of five. Highlighting and filtering use real differences among known values, and a missing value reads “Not available” in the full view.
- Given equal known scores or prices, all joint leaders appear in the summary.
- Given a nonempty basket, adding a selected product increases its quantity and preserves other items. The existing ordering page shows the resulting total.
- Given a Cookie Finder result, “Compare this cookie” adds the recommendation without altering quiz scoring. A selection survives same-tab navigation and reload when session storage is available.
- Given blocked storage, selection is usable in memory during client navigation. The selection stores only catalogue IDs.

## Design and validation

The inline selection uses normal document flow, so it does not compete for a floating position. The separate comparison route keeps the catalogue page compact. Product columns remain aligned on a narrow screen; the table associates each value with its product and row label. Difference labels accompany colour accents. Taste and texture profiles are illustrative descriptions for fictional products. No dietary, ingredient or allergen information is inferred.

The comparison Vitest suite exercises selection, validation, source prices, ties and missing values. Playwright covers the shared basket and the Finder handoff at both configured widths, including keyboard interaction and a dark mobile context. The existing Cookie Finder suite continues to check all 256 quiz paths. For human acceptance, ask a participant to compare two or three flavours without prompting, explain which one they prefer and why, and move it to the test basket. Record observed navigation, hesitation, keyboard or mobile issues and any subsequent retest in the existing evidence workflow.