# Watermelon evaluation

> This record describes the implementation or evidence at the stage named below. See the [current release evidence](../../current-release-evidence.md) for the latest verified status.

Use the [import-ready knowledge base](knowledge-base.md) and [35 evaluation cases](evaluation.json). Each case has a route, the facts required to pass, acceptable paraphrase guidance and a prohibited claim. Actual outcomes are empty and pending.

After approval, the Watermelon owner can import the public knowledge base into the existing assistant. Test in fresh sessions across Dutch and English, one question per case, and record the actual reply and pass or fail. Start with price, navigation, allergy and fictional delivery scenarios. Avoid personal data and excessive traffic. Do not infer chat quality from iframe or loader checks.

The production baseline verified the loader but did not establish whether the chat opened or answered. The external frame has a previously observed contrast finding. To investigate, the Watermelon owner should use the existing widget settings to adjust the text/background combination involved, then run an axe scan in the widget with the panel opened. This repository leaves widget identity and settings intact.
