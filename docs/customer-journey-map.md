# Customer journey map

Potential difficulties describe hypotheses, not observed user feedback.

```mermaid
flowchart LR
  D[Discover] --> E[Explore] --> C[Compare] --> S[Select] --> R[Review] --> O[Order] --> F[Confirmation]
  E --> S
  E --> W[Experience workshops]
  R --> S
```

| Phase | Goal and touchpoint | Need or potential difficulty | Implemented response | Candidate measure |
|---|---|---|---|---|
| Discover | Choose a route from the homepage | Too many equally prominent actions | Direct ordering and optional discovery tools | Time to first relevant click |
| Explore | Learn about flavours through catalogue or Finder | Too much information to remember | Catalogue and short reason for a recommendation | Ability to describe two flavours |
| Explore with the Taste Map | Which flavour tastes milder or sweeter? | Subjective scales can be confusing | Ordinal profiles, labelled axes and named list | Find and describe an alternative |
| Compare | Evaluate products side by side | Differences are hard to scan | Aligned characteristics with optional highlighting | Comparison completion |
| Select | Add items or fill a box | Losing track of selections | Four individually editable slots with a live count and total | Replacement errors |
| Personalise | Can I reuse this box or add a note? | Losing a combination or expecting the message to be printed | Browser-local save and explicit digital-only preview | Restore after reload; explain what is sent |
| Experience | What can I learn in a workshop? | Overview, detail and topic links | Existing Payload relationships and clear fictional context | Find a related workshop and return |
| Review | Correct the basket | Losing work while browsing | Shared basket, editable rows and prices | Correct quantity after editing |
| Order | Submit fictional details | Invalid input or repeated submission | Labelled inputs, review and idempotent server save | Time, errors and completion |
| Confirmation | Verify what was saved | Hard to identify reference or amount | Printable confirmation with saved reference and prices | Find the reference and total |

Users can skip Finder and comparison and go straight to ordering.

The Passport now reflects four actual answers and the same recommendation. See the [implementation and acceptance evidence](cookie-shop-experience/README.md) and [participant protocol](cookie-shop-experience/usability-testing.md). Findings about unfamiliar users remain hypotheses pending human sessions. Workshops are optional and ordering still works directly.
