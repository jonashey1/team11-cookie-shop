# H3-releasechecklist — Team 11

Stand van de releasekandidaat in [PR #27](https://github.com/jonashey1/team11-cookie-shop/pull/27). De [academische auditmatrix](final-academic-compliance.md) bevat de onderbouwing en bronverwijzingen.

## Technisch bevestigd

- [x] Negen getelde pagina’s: zeven vaste bestemmingen en twee detailtemplates. De Box Builder staat op `/clinics#build-your-box`. De oude Box Builder-, Comparison-, FAQ- en Fortune Cookie-URL’s verwijzen door.
- [x] Vier gebruikte collecties op de geïsoleerde kandidaat: `cookies`, `orders`, `workshops`, `topics`. Workshops en topics linken publiek in beide richtingen.
- [x] Zes CMS-producten, serverprijzen, bescherming bij prijswijzigingen en historische prijssnapshots getest op geïsoleerde data.
- [x] Additieve migratie getest op een lege en een bestaande testdatabase. De Vercel-productiebuild paste de migratie toe en verifieerde ze. Er was geen afzonderlijke menselijke migratiereview (optioneel).
- [x] GitHub CI voor de geteste broncode: Chromium, WebKit, migraties, types en leftovers geslaagd. De kandidaatpreview vereist Vercel-login.
- [x] Teamcode en bestaande productieorder bevestigd via de [cursuschecker](https://team11-cookie-shop.vercel.app/api/course-check?include=team&code=T11-S3F8). Geen nieuwe order nodig.
- [x] `CAMPUS_CYCLE_LEFTOVERS=fail` staat aan. Bekende voorbeeldrecords zijn op de kandidaat afgeschermd voor gasten; records blijven bewaard.
- [x] D0–D7 aanwezig. D6 maakt onderscheid tussen de historische deelnemer en geautomatiseerde checks.

## Stand op 26 november 2026

- De handover meldt een opgeslagen indiening op `e88d6f9bd60eaa2b67da38ee5a93b6dde36bc7b4`. Vergelijk in de cursusapp de opgeslagen SHA met de versie die het team wil indienen.
- De productiechecker bevestigt op 26 november een bestaande Team 11-order in `orders.name`, zes cookies, vier workshops, drie topics en de Workshop–Topic-relatie. Hij rapporteert ook acht workshop-sessies en drie registraties. Voor deze controle volstaat een publieke leesaanvraag.
- D6 bevat een menselijke observatie en hertest van de bestelroute. De latere geautomatiseerde controles en de grenzen van het bewijs staan in het [testrapport](test-report.md).
- Controleer de officiële bijdragecredits in de cursusapp. GitHub toont onder meer [#37](https://github.com/jonashey1/team11-cookie-shop/pull/37) (Tessa), [#38](https://github.com/jonashey1/team11-cookie-shop/pull/38) (Esma) en [#39](https://github.com/jonashey1/team11-cookie-shop/pull/39) (Yana). Arnaud opende de gemergde [#40](https://github.com/jonashey1/team11-cookie-shop/pull/40); beoordeel de bijdrage aan de hand van de werkelijke rol en de cursuscriteria. Voor elke credit telt de bevestiging in de cursusapp.
- Dien zo nodig opnieuw in via **My team → Final hand-in** met repository `jonashey1/team11-cookie-shop`, branch `main` en website `https://team11-cookie-shop.vercel.app/`. Controleer de opgeslagen SHA, docenttoegang, bijdragecredits en de resultaten van **Check my work**.
