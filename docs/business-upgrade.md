# Cookie Shop business and customer experience upgrade

This is voluntary work outside the required H2 scope. The objectives are easier discovery and comparison, smoother fictional ordering and actionable visibility into saved order activity. These are design goals. No conversion or user-study results have been measured.

| Area | Problem and objective | Acceptance and traceability |
|---|---|---|
| Customer journey | Customers need a clear route when they already know what they want or need help choosing | Homepage links to ordering, Finder, comparison and the box. Given a basket, users can see unit prices and subtotals, edit quantities or continue shopping. Browser tests check quantities and invalid input. |
| Confirmation | A success screen needs to reflect actual storage | Given a confirmed save, show saved reference, items, date and total. Printing hides navigation and actions. No public receipt lookup, payments or email. |
| Box builder | A customer needs to understand capacity and price | Fill exactly four slots in a 2×2 grid. Each slot lets users add, remove or replace a flavour independently, including duplicates. The box total updates at catalogue prices. Only a complete box can be added, preserving existing basket quantities. Reset clears all slots. Each suggestion fills four slots and asks before overwriting. See the box unit and browser tests. |
| Recommendations | A quiz result needs a reason and a next step | Given four answers, show the existing winner and reasons based on contributing preferences, with a distinct alternative where available. The 256-path unit check verifies reachability and unchanged winner selection. |
| Comparison | Hiding shared characteristics makes review incomplete | Given two or three cookies, all characteristics remain visible. Highlighting affects emphasis only. See the [comparison acceptance criteria](./cookie-comparison.md). |
| Analytics | Editors need operational totals without customer data exports | An editor can filter and export aggregates. Guests and members are refused. Unit and browser tests cover date filters, historical totals, empty data, formula handling and access. |

The four-slot box builder is a voluntary creative improvement outside the required H2 scope, intended to improve usability and potentially qualify for bonus consideration.

[Partially filled box](./business-upgrade-screenshots/box-partial.png) · [Complete box](./business-upgrade-screenshots/box-full.png) · [Mobile Dark Mode](./business-upgrade-screenshots/box-mobile-dark.png)

## Management figures and privacy

Total value is the sum of saved order totals in EUR cents. Average value divides that value by order count, rounded to a cent. Units are the sum of saved quantities; average basket size is units divided by order count. Empty results use zero totals. Leaders retain ties. Least ordered refers to purchased flavours. Monthly buckets and date windows are UTC; the selected end day is inclusive. All statuses count unless filtered. The dashboard fetches selected fields in pages and uses stored historical names and amounts. The export contains aggregates, excludes customer identity and escapes spreadsheet formulas. No personal tracking or third-party analytics service was added.

A box is a product selection, without a separate SKU. Its unfinished contents are page-local; the shared basket persists. The receipt is available in the completing browser response, with no public endpoint or personal details. Refreshing clears it. Large reporting volumes may warrant database-level aggregates later.

## Artefacts

- [Customer ordering BPMN](./business-processes/customer-ordering.bpmn) and [diagram](./business-processes/customer-ordering.svg)
- [Internal management BPMN](./business-processes/internal-management.bpmn) and [diagram](./business-processes/internal-management.svg)
- [Customer journey map](./customer-journey-map.md)
- [Usability protocol](./cookie-shop-usability-protocol.md)

Run only fictitious write tests on an isolated database. Human validation remains pending. The generated BPMN XML has diagram data; formal modeler validation is separate from XML parsing.
