# H3-releasechecklist — Team 11

De handover vermeldt een opgeslagen indiening op 26 november voor e88d6f9. Zie het [actuele releasebewijs](current-release-evidence.md) en de [academische auditmatrix](final-academic-compliance.md). De onderstaande technische controles verwijzen naar eerdere releases en testomgevingen.

## Technisch bevestigd

- [x] Negen getelde pagina’s: zeven vaste bestemmingen en twee detailtemplates. De Box Builder staat op `/clinics#build-your-box`. De oude Box Builder-, Comparison-, FAQ- en Fortune Cookie-URL’s verwijzen door.
- [x] Vier gebruikte collecties op de geïsoleerde kandidaat: `cookies`, `orders`, `workshops`, `topics`. Workshops en topics linken publiek in beide richtingen.
- [x] Zes CMS-producten, serverprijzen, bescherming bij prijswijzigingen en historische prijssnapshots getest op geïsoleerde data.
- [x] Additieve migratie getest op een lege en een bestaande testdatabase. De Vercel-productiebuild paste de migratie toe en verifieerde ze. Er was geen afzonderlijke menselijke migratiereview (optioneel).
- [x] GitHub CI voor de geteste broncode: Chromium, WebKit, migraties, types en leftovers geslaagd. De kandidaatpreview vereist Vercel-login.
- [x] Teamcode en bestaande productieorder bevestigd via de [cursuschecker](https://team11-cookie-shop.vercel.app/api/course-check?include=team&code=T11-S3F8). Geen nieuwe order nodig.
- [x] `CAMPUS_CYCLE_LEFTOVERS=fail` staat aan. Bekende voorbeeldrecords zijn op de kandidaat afgeschermd voor gasten; records blijven bewaard.
- [x] D0–D7 aanwezig. D6 maakt onderscheid tussen de historische deelnemer en geautomatiseerde checks.

## Na een uitdrukkelijk goedgekeurde merge

- [ ] Controleer de exacte `main`-SHA, groene CI, Vercel Production Ready voor diezelfde SHA en de bevestigde migratie in de buildlog.
- [ ] Controleer de live bestemmingen, vier CMS-collecties, beide kanten van Workshop–Topic, teamcode, bestaande cursusorder, publieke afscherming van voorbeelden en D0–D7 op `main`.
- [ ] Controleer in de cursusapp de vereiste echte D6-observatie en hertest. Gebruik het [protocol](cookie-shop-usability-protocol.md). De eerder gerapporteerde hertest blijft in D6 staan.
- [ ] Controleer de individuele H3-status in de cursuskaart. GitHub toont gemergede code-PR?s van Jonas, Tessa, Esma en Yana. Voor Arnaud en Xander is individueel bewijs nog niet geverifieerd. Controleer ook de toegang voor `jnmoons` bij indiening.
- [ ] Dien in via **My team → Final hand-in** met repository `jonashey1/team11-cookie-shop`, branch `main` en website `https://team11-cookie-shop.vercel.app/`. Controleer de opgeslagen commit en docenttoegang. De laatst geëxporteerde indiening verwees naar een oudere SHA.
