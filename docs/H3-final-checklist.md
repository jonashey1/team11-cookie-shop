# H3-releasechecklist — Team 11

Stand van de releasekandidaat in [PR #27](https://github.com/jonashey1/team11-cookie-shop/pull/27). De [academische auditmatrix](final-academic-compliance.md) bevat de onderbouwing en bronverwijzingen.

## Technisch bevestigd

- [x] Acht vaste openbare bestemmingen. De oude Comparison-, FAQ- en Fortune Cookie-URL’s verwijzen door. De workshop- en topicroutes blijven beschikbaar.
- [x] Vier gebruikte collecties op de geïsoleerde kandidaat: `cookies`, `orders`, `workshops`, `topics`. Workshops en topics linken publiek in beide richtingen.
- [x] Zes CMS-producten, serverprijzen, bescherming bij prijswijzigingen en historische prijssnapshots getest op geïsoleerde data.
- [x] Additieve migratie getest op een lege en een bestaande testdatabase. Geen productiemigratie handmatig uitgevoerd.
- [x] GitHub CI voor de geteste broncode: Chromium, WebKit, migraties, types en leftovers geslaagd. De kandidaatpreview vereist Vercel-login.
- [x] Teamcode en bestaande productieorder bevestigd via de [cursuschecker](https://team11-cookie-shop.vercel.app/api/course-check?include=team&code=T11-S3F8). Geen nieuwe order nodig.
- [x] `CAMPUS_CYCLE_LEFTOVERS=fail` staat aan. Bekende voorbeeldrecords zijn op de kandidaat afgeschermd voor gasten; records blijven bewaard.
- [x] D0–D7 aanwezig. D6 maakt onderscheid tussen de historische deelnemer en geautomatiseerde checks.

## Vóór fiattering van de merge

- [ ] Controleer of de officiële teltregel workshop- en topicdetails mee laat tellen. De kandidaat telt acht vaste bestemmingen en twee detailtemplates. Zonder officiële tekst blijft volledige paginaconformiteit onbevestigd.
- [ ] Laat het contentmodelpaar de additieve migratie beoordelen en de eigenaar de release goedkeuren.

## Na een uitdrukkelijk goedgekeurde merge

- [ ] Controleer de exacte `main`-SHA, groene CI, Vercel Production Ready voor diezelfde SHA en de bevestigde migratie in de buildlog.
- [ ] Controleer de live bestemmingen, vier CMS-collecties, beide kanten van Workshop–Topic, teamcode, bestaande cursusorder, publieke afscherming van voorbeelden en D0–D7 op `main`.
- [ ] Controleer in de cursusapp de vereiste echte D6-observatie en hertest. Gebruik het [protocol](cookie-shop-usability-protocol.md). De eerder gerapporteerde hertest blijft in D6 staan.
- [ ] Verifieer echte H3-bijdragen voor Tessa, Arnaud, Esma, Yana en Xander. Voor Jonas is een kwalificerende PR gevonden. Alle zes teamaccounts hebben GitHub-toegang. De cursusapp verwerkt de uitnodiging voor `jnmoons` bij indiening.
- [ ] Dien in via **My team → Final hand-in** met repository `jonashey1/team11-cookie-shop`, branch `main` en website `https://team11-cookie-shop.vercel.app/`. Controleer de opgeslagen commit en docenttoegang. De laatst geëxporteerde indiening verwees naar een oudere SHA.
