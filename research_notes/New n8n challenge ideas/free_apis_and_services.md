# Free, reliable, low-friction APIs, datasets and services for new n8n challenges (verified 2026-10-06)

Method note: every "live probe" link below is the exact endpoint called on 2026-10-06 between about 17:00 and 17:25 UTC from a residential connection in Spain, with no API keys and a descriptive User-Agent (`n8n-challenges-research/1.0 (+https://n8n-challenges.app)`). Limits and terms come from official pages unless marked "(secondary)". Challenge ideas are proposals (inferences), checked against the 13 existing challenges (webhook welcome, Valencia air-quality Telegram bot, form follow-up, citizen-request classifier, Trello brief, AI workflow builder via MCP, Idealista/Firecrawl brief, Mercadona MCP, unreliable paginated orders, Drive RAG, alien translator, Wikipedia agent, Telegram photo summary) and the owner's backlog.

## 1. Valencia and Spain: which local datasets and APIs are usable without friction today?

### Takeaway
València's open data has moved: the old OpenDataSoft portal domain is dead, and the live catalog is now a CKAN portal (opendata.vlci.valencia.es, CC-BY) whose real-time resources are keyless ArcGIS REST layers on geoportal.valencia.es (Valenbisi, car parks, traffic, EMT stops with arrival pages, Metrovalencia departures, Fallas). Nationally, REE REData (PVPC prices), the Ministry fuel-price API, BOE, INE, datos.gob.es, Renfe GTFS-Realtime and the Generalitat's CKAN (including a cultural agenda) are keyless and live; AEMET and ESIOS need free tokens, and Metrovalencia has no official real-time API (only an HTML departures page on the city geoportal).

### Cited Findings

#### València city: portal migration and live layers
- The old city portal is gone: `valencia.opendatasoft.com` returns HTTP 404 with the page description "This domain could not be found - Huwise" — [live probe](https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets?limit=1)
- The city's own open-data link still points there: `www.valencia.es/dadesobertes` answers 302 → `https://valencia.opendatasoft.com/` (a dead end for anyone following it) — [live probe](https://www.valencia.es/dadesobertes)
- The live catalog is CKAN titled "Plataforma VLCi – Datos abiertos VLCi Thinking City", with 279 datasets — [status_show](https://opendata.vlci.valencia.es/api/3/action/status_show); [package_list](https://opendata.vlci.valencia.es/api/3/action/package_list)
- Datasets inspected (Valenbisi, parkings, traffic, EMT, Fallas, WiFi, fountains, noise stations, FGV stations, clocks with thermometers) all carry `license_id: cc-by`; metadata modified 2026-10-06 for most — [package_show parkings](https://opendata.vlci.valencia.es/api/3/action/package_show?id=parkings); [package_show valenbisi](https://opendata.vlci.valencia.es/api/3/action/package_show?id=valenbisi-disponibilitat-valenbisi-dsiponibilidad)
- Real-time resources are ArcGIS REST MapServer layers (JSON, GeoJSON, KMZ, HTML, pbf, sometimes SHP). Layers report `maxRecordCount: 2000` and `supportsPagination: true`; the default spatial reference is wkid 25830 (UTM 30N), so lat/lon requires `outSR=4326` — [Valenbisi layer metadata](https://geoportal.valencia.es/server/rest/services/OPENDATA/Trafico/MapServer/228?f=json)
- Valenbisi (layer 228): 273 stations; fields `name, number, address, open, available, free, total, ticket, updated_at` (local-time string, e.g. "06/10/2026 19:07:31") and `update_jcd` (epoch ms). Sample: station 1 had 8 bikes and 17 free docks of 25 — [live probe](https://geoportal.valencia.es/server/rest/services/OPENDATA/Trafico/MapServer/228/query?where=1%3D1&outFields=*&returnGeometry=true&outSR=4326&resultRecordCount=2&f=json); [count](https://geoportal.valencia.es/server/rest/services/OPENDATA/Trafico/MapServer/228/query?where=1%3D1&returnCountOnly=true&f=json)
- Parkings (layer 194): 23 public car parks with `plazastota, plazaslibr, ocupacion` (%) and `ultima_mod` (epoch ms, fresh at probe time); sample "SEVERO OCHOA" 288 free of 371 — [live probe](https://geoportal.valencia.es/server/rest/services/OPENDATA/Trafico/MapServer/194/query?where=1%3D1&outFields=*&returnGeometry=true&outSR=4326&resultRecordCount=2&f=json)
- Real-time traffic state (layer 192): 462 street segments with `denominacion`, numeric `estado`, `idtramo` and polyline geometry — [live probe](https://geoportal.valencia.es/server/rest/services/OPENDATA/Trafico/MapServer/192/query?where=1%3D1&outFields=*&returnGeometry=true&outSR=4326&resultRecordCount=2&f=json)
- EMT (layer 226): 1,155 bus stops with `id_parada, denominacion, lineas` and a `proximas_llegadas` link such as `http://www.emtvalencia.es/QR.php?sec=est&p=1044` — [live probe](https://geoportal.valencia.es/server/rest/services/OPENDATA/Trafico/MapServer/226/query?where=1%3D1&outFields=*&returnGeometry=true&outSR=4326&resultRecordCount=2&f=json)
- That EMT arrivals page is plain HTTP (no HTTPS) and returned a small HTML page whose text read "1044 - Poliesportiu de Burjassot … C. Burjassot - 27 min. C. Burjassot - 55 min." — [live probe](http://www.emtvalencia.es/QR.php?sec=est&p=1044)
- EMT static GTFS ("Google Transit. Líneas, paradas, horarios de autobuses de la EMT de Valencia") is published as a ZIP, modified 2026-10-05 — [dataset](https://opendata.vlci.valencia.es/api/3/action/package_show?id=google-transit-lines-stops-bus-schedules)
- FGV/Metrovalencia stations (layer 221) carry `proximas_llegadas` links to `https://geoportal.valencia.es/geoportal-services/api/v1/salidas-metro.html?estacion=24&lang=es` (and `lang=va`); for Pl. Espanya it returned an HTML list of next departures (line, route, destination, time, e.g. "Destino Torrent - 19:22:00") — [layer probe](https://geoportal.valencia.es/server/rest/services/OPENDATA/Trafico/MapServer/221/query?where=1%3D1&outFields=*&resultRecordCount=1&outSR=4326&f=json); [departures probe](https://geoportal.valencia.es/geoportal-services/api/v1/salidas-metro.html?estacion=24&lang=es)
- The catalog's JSON resource URL for FGV stations is malformed (`.../MapServer/221query?...`, missing a slash) and does not return features — [package_show](https://opendata.vlci.valencia.es/api/3/action/package_show?id=fgv-estacions-estaciones)
- Fallas (Turismo layer 215): 351 fallas with `nombre, seccion, fallera, presidente, artista, lema, anyo_fundacion, distintivo` and a `boceto` sketch image URL for 2026 (e.g. `.../fallasvalencia/2026_001_bm.jpg`) — [live probe](https://geoportal.valencia.es/server/rest/services/OPENDATA/Turismo/MapServer/215/query?where=1%3D1&outFields=*&returnGeometry=true&outSR=4326&resultRecordCount=2&f=json)
- Other datasets in the catalog include noise stations (plus a daily CSV of last month's noise data), public water fountains, WiFi points, clocks with thermometers, taxis, tourist monuments and resources, neighbourhood tourism routes, beach showers/footbaths/walkways, Rodalia (Renfe) stations, ORA and motorbike parking; I found no municipal cultural-events dataset in the list — [package_list](https://opendata.vlci.valencia.es/api/3/action/package_list); [noise dataset](https://opendata.vlci.valencia.es/api/3/action/package_show?id=dades-diaries-de-l-ultim-mes-de-les-estacions-de-soroll)
- The air-quality endpoint used by existing challenge 02 (`valenciaalminut/calidadaire.cors`) still answers (HTTP 202, JSON with `dateobserved, so2value, no2value…`) — [live probe](https://www.valencia.es/web/guest/valenciaalminut/calidadaire.cors)

#### Transport: Metrovalencia, NAP, Renfe
- FGV does not publish an official real-time feed; the FGV Metro de Valencia static GTFS (routes, stops, theoretical schedules) is published via Spain's National Access Point (NAP); a community "MetroAPI" builds real-time forecasts from the Valencia Geoportal departures HTML (secondary, unofficial) — [VLC-Transit-Hub README (secondary)](https://github.com/BananaManMS/VLC-Transit-Hub); [MetroAPI docs (unofficial)](https://docs.metroapi.alexbadi.es/)
- NAP states that data use is subject to the Ministry of Transport's open-data licence and offers user registration — [NAP home](https://nap.transportes.gob.es/)
- Renfe GTFS-Realtime feeds are keyless JSON (`gtfsRealtimeVersion 2.0`), `Cache-Control: max-age=30`: trip updates (~142 KB), vehicle positions (~119 KB) and alerts (~210 KB), national scope — [trip_updates](https://gtfsrt.renfe.com/trip_updates.json); [vehicle_positions](https://gtfsrt.renfe.com/vehicle_positions.json); [alerts](https://gtfsrt.renfe.com/alerts.json)
- data.renfe.com is a CKAN catalog (e.g. punctuality commitment, Cercanías stations per núcleo) — [package_list](https://data.renfe.com/api/3/action/package_list)

#### Weather and energy: AEMET, REE, ESIOS
- AEMET OpenData requires an API key requested with an email address via "Obtención de API Key"; users may create as many keys as they need; the key is generated from the email, which AEMET says is not stored — [AEMET info/FAQ](https://opendata.aemet.es/centrodedescargas/info)
- The same page's source contains "El API Key tiene una caducidad de 90 días" right next to an HTML-comment terminator, so it may be commented-out text rather than current policy (unclear) — [AEMET info/FAQ](https://opendata.aemet.es/centrodedescargas/info)
- A keyless AEMET forecast request returned HTTP 200 with an empty body (no helpful error for learners) — [live probe](https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/46250)
- REE's REData API is "a simple REST service", GET-only, pattern `GET /{lang}/datos/{category}/{widget}?start_date&end_date&time_trunc` — [REE REData docs](https://www.ree.es/en/datos/apidata)
- Live and keyless: `mercados/precios-mercados-tiempo-real` returned a `PVPC` series (24 hourly values; 171.97 €/MWh at 00:00 on 2026-10-06) and a `Precio mercado spot` series with 96 values (quarter-hourly); `last-update` 2026-10-05T20:47 shows next-day prices appear the evening before — [live probe](https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?start_date=2026-10-06T00:00&end_date=2026-10-06T23:59&time_trunc=hour)
- REE generation structure by technology is also live and keyless, in English with `/en/` — [live probe](https://apidatos.ree.es/en/datos/generacion/estructura-generacion?start_date=2026-10-05T00:00&end_date=2026-10-05T23:59&time_trunc=day)
- ESIOS needs a personal token ("Personal token request"); an uncached keyless request returned 403 `{"message":"Forbidden"}`, although a CloudFront-cached indicator (1001) happened to return 200 without a token — [ESIOS docs](https://api.esios.ree.es/); [403 probe](https://api.esios.ree.es/indicators/600?start_date=2026-10-05T00:00&end_date=2026-10-05T03:00); [cached 200 probe](https://api.esios.ree.es/indicators/1001)

#### Other national and regional sources
- Fuel prices (Ministerio, "ServiciosRESTCarburantes"): keyless, `Access-Control-Allow-Origin: *`, filters by CCAA, province, municipality and product — [API help](https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/help)
- València city's `IDMunicipio` is 7214 — [municipalities of province 46](https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/MunicipiosPorProvincia/46)
- `FiltroMunicipio/7214` returned 65 stations, timestamp "06/10/2026 19:11:02", prices and coordinates as comma-decimal strings (e.g. `"Precio Gasoleo A": "1,915"`, `"Latitud": "39,474333"`) — [live probe](https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipio/7214)
- datos.gob.es linked-data API returned JSON without a key — [live probe](https://datos.gob.es/apidata/catalog/dataset.json?_pageSize=1)
- INE Tempus API is keyless JSON with `Access-Control-Allow-Origin: *`; series `IPC251856` ("Nacional. Índice general. Variación anual") with `nult=1` returned its last point as December 2025 = 2.9 — [live probe](https://servicios.ine.es/wstempus/js/ES/DATOS_SERIE/IPC251856?nult=1); [operations list](https://servicios.ine.es/wstempus/js/ES/OPERACIONES_DISPONIBLES?page=1)
- BOE open-data API returns HTTP 400 (XML: "No soportado ningún mime type de la cabecera Accept") unless an `Accept: application/json` (or XML) header is sent; with the header, the 2026-10-06 summary (BOE nº 248) returned 200 JSON — [live probe](https://www.boe.es/datosabiertos/api/boe/sumario/20261006)
- Generalitat Valenciana (dadesobertes.gva.es) is CKAN with 1,302 datasets; those inspected are `cc-by` — [status_show](https://dadesobertes.gva.es/api/3/action/status_show); [count](https://dadesobertes.gva.es/api/3/action/package_search?rows=0)
- GVA "Agenda cultural del Institut Valencià de Cultura (IVC)": 943 records in the CKAN DataStore (CSV/JSON/XML), modified 2026-10-06, fields `titulo_evento, tipo_evento, fecha_inicio, fecha_fin` (dd/mm/yyyy), `hora` (free text like ", D - 18 h"), `lugar_evento, precio` ("12 €"), `latitud, longitud, web`; the first record is dated 12/01/2025, so past events are included — [package_show](https://dadesobertes.gva.es/api/3/action/package_show?id=cul-agc-ivc); [datastore_search](https://dadesobertes.gva.es/api/3/action/datastore_search?resource_id=f76b5222-c09f-46cb-8bb0-4fbe377c611d&limit=1)
- GVA also lists ATMV routes and schedules, a beach catalogue, Blue Flags and water-quality sampling points — [search "transporte"](https://dadesobertes.gva.es/api/3/action/package_search?q=transporte&rows=4); [search "playas"](https://dadesobertes.gva.es/api/3/action/package_search?q=playas&rows=4)
- Nager.Date's 2026 Spain list tags only Easter Monday (6 Apr), St John (24 Jun) and 9 Oct as ES-VC regional days and omits 19 March — [live probe](https://date.nager.at/api/v3/PublicHolidays/2026/ES) — whereas the Generalitat's approved 2026 calendar has 12 holidays including 19 March (Sant Josep), 3 and 6 April, 24 June and 9 October — [GVA press release](https://comunica.gva.es/es/detalle?id=394003553&site=373430869)

### Inferences

#### Vetted shortlist (Valencia and Spain) with one challenge idea each
| Candidate | Auth / friction | Limits and terms | Reliability (2026-10-06) | Proposed challenge (level · time · primary concept · objective check) |
|---|---|---|---|---|
| [Valenbisi layer 228](https://opendata.vlci.valencia.es/api/3/action/package_show?id=valenbisi-disponibilitat-valenbisi-dsiponibilidad) | None | CC-BY; no published rate limit | Live, updated within the minute | "Bike or dock?" · Beginner · 20–30 min · filtering at source with ArcGIS `where=number=…` + `outSR=4326`, then "updated X min ago" with Luxon · check against a fixture snapshot |
| [Parkings layer 194](https://opendata.vlci.valencia.es/api/3/action/package_show?id=parkings) | None | CC-BY | Live | "Park near the stadium" · Intermediate · 30–40 min · Haversine distance in a Code node, `plazaslibr ≥ N`, stale-data guard on `ultima_mod` · fixture snapshot |
| [Traffic layer 192](https://opendata.vlci.valencia.es/api/3/action/package_show?id=estat-transit-temps-real-estado-trafico-tiempo-real) | None | CC-BY | Live | "Commute traffic snapshot" · Beginner · 20–25 min · Summarize node (count by `estado`) · fixture |
| [EMT stops 226](https://opendata.vlci.valencia.es/api/3/action/package_show?id=emt) + arrivals HTML | None; arrivals page is unofficial HTML over HTTP | Layer CC-BY; page terms unknown | Live | "Bus stop countdown" · Intermediate · 35–45 min · HTML node (CSS selectors) on a real page · fixture HTML |
| [Metrovalencia departures](https://geoportal.valencia.es/geoportal-services/api/v1/salidas-metro.html?estacion=24&lang=es) via layer 221 | None; HTML | Layer CC-BY; page terms unknown | Live; catalog link broken | "Next metro to the beach/airport" · Intermediate · 35–45 min · two-step lookup (station name → code → departures) + HTML parsing; lesson "don't trust catalog links blindly" · fixture HTML |
| [Fallas layer 215](https://opendata.vlci.valencia.es/api/3/action/package_show?id=falles-fallas) | None | CC-BY | Live, 2026 data | "Fallas route builder" (seasonal Feb–Mar) · Advanced · 50–70 min · Code-node nearest-neighbour ordering + Google Maps directions URL; bonus trilingual blurbs from `lema` · deterministic on fixture · partial overlap with backlog "Valencia AI trip planner" |
| [Renfe GTFS-RT alerts](https://gtfsrt.renfe.com/alerts.json) | None | Licence not checked | Live, 30 s cache | "Rodalia disruption notifier" · Intermediate · 40 min · state/dedupe across runs (Data Table of seen alert IDs) on a large national JSON · fixture |
| [REE REData PVPC](https://www.ree.es/en/datos/apidata) | None | GET-only; terms not found | Live | "When to run the washing machine" · Intermediate · 30–40 min · array/window maths (cheapest 3-hour window), €/MWh → €/kWh, Europe/Madrid time zone; bonus: aggregate 96 quarter-hour spot values to hourly · deterministic for any past date |
| [Fuel prices API](https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/help) | None, CORS `*` | Terms not checked | Live, 65 stations in València | "Cheapest diesel near me" · Intermediate · 35–45 min · data cleaning (comma decimals → numbers) + geocoding + Haversine · fixture snapshot |
| [BOE open data](https://www.boe.es/datosabiertos/api/boe/sumario/20261006) | None; needs `Accept` header | Terms not checked | Live | "BOE grants radar" · Intermediate · 40–50 min · HTTP headers + Split Out of nested sections + keyword filter + LLM summary in the learner's language · deterministic on a past date |
| [GVA IVC cultural agenda](https://dadesobertes.gva.es/api/3/action/package_show?id=cul-agc-ivc) | None | CC-BY | Live; includes past events | "This week in Valencian culture" · Intermediate · 35–45 min · dd/mm/yyyy parsing, next-7-days filter, group by `tipo_evento`, messy `hora` field · deterministic with a fixed "today" |
| [INE](https://servicios.ine.es/wstempus/js/ES/OPERACIONES_DISPONIBLES?page=1) + [Eurostat](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/prc_hicp_manr?geo=ES&coicop=CP00&lastTimePeriod=1) | None | Official statistics | Live | "Spain vs EU inflation card" · Beginner · 20–30 min · two official sources + Merge · deterministic (past months) · confirm current CPI series code first |
| [Nager.Date ES](https://date.nager.at/Api) | None | "No Rate Limits" | Live; misses 19 Mar 2026 for ES-VC | "Bridge-day planner with corrections" · Beginner · 20–30 min · LongWeekend endpoint + Data Table of official overrides ("trust but verify") · deterministic |
| AEMET OpenData | Free key by email (possible 90-day expiry) | Not verified with a key | Key-gated | Only as a bonus or alternative; signup friction and overlap with the "daily weather notification" backlog item |
| ESIOS | Personal token on request | — | 403 without token | Not recommended; REE REData gives PVPC without a token |

#### Design notes
- The Valencia geoportal is the strongest new local backbone: keyless, CC-BY, minute-fresh and multi-format, and it carries real teaching quirks (UTM default coordinates, a local-time string next to epoch-ms timestamps, an `exceededTransferLimit` flag, a typo in the Valenbisi dataset ID, a broken FGV resource link).
- Any challenge or blog text that links to `valencia.opendatasoft.com` or `valencia.es/dadesobertes` will dead-end; the repo grep found only the still-working `calidadaire.cors` endpoint, but new content should link to opendata.vlci.valencia.es.
- Valencia and REE data come in Spanish/Valencian (field names like `plazaslibr`, `denominacion`), so the English and Ukrainian versions need a short field glossary in the tips.
- Past-date queries (REE prices, BOE summaries, Nager holidays) are immutable, which gives objective verification without maintaining fixtures; live-only layers (Valenbisi, parkings, departures) need fixture snapshots for verification.
- The Nager.Date omission of 19 March is a ready-made "verify your source against the official one" lesson; challenges must not silently rely on Nager for Valencian regional holidays.
- EMT and Metrovalencia arrival pages are HTML meant for people. They suit an HTML-extraction challenge, but ship a fixture copy of the page structure (not the live content) and a fallback in case the markup changes.

### Gaps
- No published rate limits or terms of use were found for geoportal.valencia.es layers, the EMT `QR.php` page or the `salidas-metro.html` page; reuse terms for the HTML pages are unknown.
- The meaning of traffic `estado` codes (0, 1, …) was not verified; a challenge needs the code table from the city before using it.
- AEMET: rate limits and whether keys really expire after 90 days were not confirmed (the sentence may be commented out); AEMET's documented two-step "returns a `datos` URL" response pattern was not re-verified because it needs a key.
- REE REData usage limits and licence text were not found on the docs page.
- Licence or reuse terms for Renfe GTFS-RT, the fuel-price API and BOE/INE APIs were not checked page by page (they are public-sector open data but the exact conditions were not read).
- INE series `IPC251856` returning December 2025 as its latest value may mean a discontinued or rebased series; the current CPI series code was not identified.
- Whether NAP downloads (e.g. FGV static GTFS) require a registered account was not confirmed.

## 2. Ukraine: which currency, holiday and open-data APIs are usable, and how to handle war-related data?

### Takeaway
All three currency APIs (NBU official rates, Monobank, PrivatBank incl. archive) are live, keyless and JSON, and Frankfurter v2 now also covers UAH, which makes a strong parallel-requests-and-Merge challenge with Ukrainian flavour. Nager.Date's Ukrainian 2026 holidays reflect the 2023 calendar reform, but under martial law public holidays are not days off. Air-raid alert APIs are token-gated and ethically sensitive; they should be avoided.

### Cited Findings
- NBU official rates are keyless JSON (`?json`), filterable by `valcode` and `date=YYYYMMDD`, served via Cloudflare with `Access-Control-Allow-Origin: *`; a request on the evening of 6 Oct returned EUR 50.6394 with `exchangedate` "07.10.2026" (the next business day's rate is published in advance) — [live probe](https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&json)
- A historical query returned USD 44.6819 for 01.10.2026 — [live probe](https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&date=20261001&json)
- Since 21 January 2026 the NBU API includes a new `special` field marking whether the hryvnia/USD rate was set under special (Y) or normal (N) conditions — [NBU API for developers](https://bank.gov.ua/ua/open-data/api-dev)
- Monobank `GET /bank/currency` is keyless; docs say the data is cached and updated no more than once every 5 minutes; responses use ISO 4217 numeric codes (840 USD, 978 EUR, 980 UAH) and Unix timestamps — [Monobank API docs](https://api.monobank.ua/docs/index.html); [live probe](https://api.monobank.ua/bank/currency)
- PrivatBank public endpoints are keyless: cash rates (`coursid=5`, e.g. EUR buy 49.95 / sale 50.95) and a dated archive with NBU and bank rates (`exchange_rates?json&date=01.10.2026`) — [cash probe](https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5); [archive probe](https://api.privatbank.ua/p24api/exchange_rates?json&date=01.10.2026)
- Frankfurter v2 returned EUR→UAH 50.57 and EUR→USD 1.1236 for 2026-10-06 without a key — [live probe](https://api.frankfurter.dev/v2/rates?base=EUR&quotes=UAH,USD)
- The ECB SDMX API has no UAH reference-rate series (404 "No Series was returned") — [live probe](https://data-api.ecb.europa.eu/service/data/EXR/D.UAH.EUR.SP00.A?lastNObservations=1&format=jsondata)
- data.gov.ua runs CKAN 2.7.2 with a working keyless Action API — [status_show](https://data.gov.ua/api/3/action/status_show); [package_search](https://data.gov.ua/api/3/action/package_search?q=covid&rows=1)
- data.gov.ua content is available under Creative Commons Attribution 4.0 unless stated otherwise — [data.gov.ua terms page](https://data.gov.ua/pages/aboutuser2)
- Nager.Date UA 2026 lists 11 holidays: 1 Jan, 8 Mar, Easter 12 Apr, 1 May, 8 May (Victory Day over Nazism), Pentecost 31 May, 28 Jun, Statehood Day 15 Jul, 24 Aug, Defenders Day 1 Oct and Christmas 25 Dec — [live probe](https://date.nager.at/api/v3/PublicHolidays/2026/UA)
- Under martial law, the Labour Code rules on holidays (Art. 73) do not apply, so public holidays are working days unless the employer decides otherwise; e.g. 15 July and 24 August 2026 bring no extra day off (secondary legal news) — [sud.ua (secondary)](https://sud.ua/en/news/ukraine/373560-den-zakhysnykiv-i-zakhysnyts-ukrainy-2026-chomu-zminyly-datu-sviata-i-chy-bude-vykhidnyi); [Torgsoft (secondary)](https://torgsoft.ua/en/articles/law/holidays/); [Wikipedia](https://en.wikipedia.org/wiki/Public_holidays_in_Ukraine)
- The alerts.in.ua air-raid API refuses keyless calls: HTTP 401 "API token required. Please contact api@alerts.in.ua for details." — [live probe](https://api.alerts.in.ua/v1/alerts/active.json)

### Inferences

#### Vetted shortlist (Ukraine) with one challenge idea each
| Candidate | Auth / friction | Limits and terms | Reliability | Proposed challenge |
|---|---|---|---|---|
| [NBU rates](https://bank.gov.ua/ua/open-data/api-dev) | None | No published limit found | Live | "Hryvnia rate board" · Intermediate · 30–45 min · three parallel HTTP requests (NBU, Monobank, PrivatBank) → Merge → bank spread vs official rate, numeric-code mapping, Ukrainian-language message · verify on a fixed past date (NBU + PrivatBank archive are immutable) |
| [Monobank](https://api.monobank.ua/docs/index.html) | None | Cached ≤ once per 5 min | Live | Part of the rate board; tip: schedule no more often than every 5 minutes, add Retry On Fail with wait for 429s, fall back to the last value stored in a Data Table |
| [PrivatBank archive](https://api.privatbank.ua/p24api/exchange_rates?json&date=01.10.2026) | None | Not documented | Live | "Month-end FX report" · Intermediate · 30 min · Loop over generated dates (Luxon), aggregate, chart or table · fully deterministic |
| [Frankfurter v2](https://frankfurter.dev/) | None | Open source, self-hostable | Live, with transient 522s | Cross-check/fallback source in the rate board (teaches fallback branches) |
| [Nager.Date UA](https://date.nager.at/api/v3/PublicHolidays/2026/UA) | None | No rate limits | Live, reflects reforms | "Is it a day off?" · Beginner · 15–20 min · If node encoding a domain rule (martial law: holiday ≠ day off) · deterministic |
| [data.gov.ua](https://data.gov.ua/api/3/action/status_show) | None | CC BY 4.0 unless stated | Live | Low priority: "Find a dataset" tool for an AI agent; specific datasets not vetted |
| alerts.in.ua | Token by email request | — | 401 without token | Avoid |

#### Ethics and positioning
- Air-raid alerts and other live war data should be avoided for challenges: the API needs a manually issued token, and turning alerts into a puzzle or a "balloon" reward trivialises danger for Ukrainian learners and their families. Neutral, everyday Ukrainian data (exchange rates, holidays, open data) gives local flavour without that risk.
- The martial-law holiday rule is factual and neutral and makes a good "read the domain rules" moment, but the challenge text should state it plainly and not editorialise.
- Monobank, PrivatBank and NBU outputs use Ukrainian names (`txt: "Євро"`) and numeric codes, which is a natural mapping exercise and gives the Ukrainian translation real substance.

### Gaps
- No documented rate limits were found for NBU or PrivatBank; Monobank's exact 429 policy for `/bank/currency` beyond the 5-minute cache was not documented on the page read.
- Whether the NBU API offers English currency names in this endpoint was not checked.
- data.gov.ua datasets suitable for frequent automated use (stable, updated, non-sensitive) were not vetted; the keyword search tried returned generic results.
- The martial-law holiday rule is sourced from legal news and Wikipedia, not the statute text itself.

## 3. Global no-key or free-key APIs: what is live and usable in October 2026?

### Takeaway
Most classic no-key APIs are live (Open-Meteo, Nager.Date, Open Library, Wikipedia/Wikidata, Nominatim/Overpass, Hacker News, GitHub, USGS, arXiv, PokeAPI, TheMealDB, Open Food Facts, DummyJSON, JSONPlaceholder), and CoinGecko still has an official keyless tier. Several changed in 2025–2026: REST Countries v3.1 is deprecated and v5 needs a key, The Met retired its v1 search on 2026-10-01, Frankfurter moved to a v2 API that covers UAH, Open Food Facts cut product reads to 15 requests/min per IP, and Bluesky's public search now returns 403. Per-IP limits are the main design risk for a 120-person event or for n8n Cloud's shared egress IPs.

### Cited Findings

#### Weather, geo and time
- Open-Meteo forecast, air-quality, marine and geocoding endpoints all returned 200 without a key and expose no rate-limit headers — [forecast](https://api.open-meteo.com/v1/forecast?latitude=39.47&longitude=-0.38&current=temperature_2m,wind_speed_10m,weather_code&timezone=Europe/Madrid); [air quality](https://air-quality-api.open-meteo.com/v1/air-quality?latitude=39.47&longitude=-0.38&current=pm10,pm2_5,european_aqi); [marine](https://marine-api.open-meteo.com/v1/marine?latitude=39.45&longitude=-0.30&current=wave_height,sea_surface_temperature); [geocoding](https://geocoding-api.open-meteo.com/v1/search?name=Valencia&count=1&language=es)
- Open-Meteo free API: non-commercial use only; fewer than 10,000 calls/day, 5,000/hour and 600/minute; data under CC BY 4.0 — [Open-Meteo terms](https://open-meteo.com/en/terms)
- Nominatim: absolute maximum 1 request/second, a custom User-Agent or Referer identifying the app (stock library UAs "will not do"), visible attribution; periodic requests from apps count as bulk geocoding and are "strongly discouraged" — [Nominatim usage policy](https://operations.osmfoundation.org/policies/nominatim/); live, responses carry "Data © OpenStreetMap contributors, ODbL 1.0" — [live probe](https://nominatim.openstreetmap.org/search?q=Ciutat+de+les+Arts+i+les+Ciencies&format=jsonv2&limit=1)
- Overpass: users are expected to send at most about 10,000 requests/day and keep downloads below about 1 GB/day; rate limiting is per IP — [Overpass commons guide](https://dev.overpass-api.de/overpass-doc/en/preface/commons.html); live query for cafés within 300 m of central València returned data with an ODbL notice — [live probe](https://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%3Bnode(around%3A300%2C39.4699%2C-0.3763)%5Bamenity%3Dcafe%5D%3Bout%203%3B)
- Sunrise-Sunset API is live and keyless — [live probe](https://api.sunrise-sunset.org/json?lat=39.47&lng=-0.38&formatted=0)

#### Currency and holidays
- Frankfurter: "The public API lives at api.frankfurter.dev. You don't need an API key"; open source and self-hostable; v2 serves 223 currencies from central banks and official sources, back to 1948; endpoint `/v2/rates?base=…&quotes=…` — [frankfurter.dev](https://frankfurter.dev/)
- The old host redirects: `api.frankfurter.app/latest` → 301 to `api.frankfurter.dev/v1/latest` — [live probe](https://api.frankfurter.app/latest?from=EUR&to=UAH)
- Reliability: during testing, `/v1/latest` and `/v2/rates` returned Cloudflare 522 or timed out for several minutes while the cached `/v2/currencies` still answered; about 10 minutes later both returned 200 — [v2 rates probe](https://api.frankfurter.dev/v2/rates?base=EUR&quotes=UAH,USD); [v1 probe](https://api.frankfurter.dev/v1/latest?symbols=USD)
- ECB Data Portal SDMX API is keyless (EXR D.USD.EUR returned 200) — [live probe](https://data-api.ecb.europa.eu/service/data/EXR/D.USD.EUR.SP00.A?lastNObservations=1&format=jsondata)
- Nager.Date advertises "No Rate Limits, Unlimited queries"; responses are Cloudflare-cached with `max-age=604800` — [Nager.Date API page](https://date.nager.at/Api); [live probe](https://date.nager.at/api/v3/LongWeekend/2026/ES)
- REST Countries: every v3.1 path tried (`/name/spain`, `/alpha/es`, `/all`) now 301-redirects to a legacy file that returns "This API version has been deprecated … migrate to our new version (v5)" — [live probe](https://restcountries.com/v3.1/name/spain?fields=name,capital,population,currencies,languages); [deprecation page](https://restcountries.com/docs/countries/legacy-api-deprecation)
- REST Countries v5 uses API keys (bearer token) with one monthly quota; a demo key `rc_live_demo` works from the docs; sustained traffic above 20 requests per 10 seconds gets 429; "Start free, no credit card required", Personal plan $12/month — [docs](https://restcountries.com/docs); [pricing](https://restcountries.com/pricing)

#### Knowledge, books, culture
- Wikipedia REST page summary and the on-this-day feed are live in English, Spanish and Ukrainian, and the api.wikimedia.org feed also still answers — [summary](https://en.wikipedia.org/api/rest_v1/page/summary/Valencia); [en feed](https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/10/06); [es feed](https://es.wikipedia.org/api/rest_v1/feed/onthisday/events/10/06); [uk feed](https://uk.wikipedia.org/api/rest_v1/feed/onthisday/events/10/06); [api.wikimedia.org feed](https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/events/10/06)
- Wikimedia's User-Agent policy: clients without a descriptive User-Agent, or with generic defaults like `python-requests/x`, may be blocked — [Wikimedia User-Agent policy](https://foundation.wikimedia.org/wiki/Policy:Wikimedia_Foundation_User-Agent_Policy)
- Wikidata API and the SPARQL query service are live and keyless (`Access-Control-Allow-Origin: *`) — [wbsearchentities](https://www.wikidata.org/w/api.php?action=wbsearchentities&search=Valencia&language=en&format=json&limit=1); [WDQS](https://query.wikidata.org/sparql?format=json&query=SELECT%20%3Fitem%20WHERE%20%7B%20%3Fitem%20wdt%3AP31%20wd%3AQ5%20%7D%20LIMIT%201)
- Open Library: default (non-identified) 1 request/second; requests with a User-Agent naming the app and a contact get 3x; the API is "not intended to serve as a bulk data backend", use the monthly dumps instead — [Open Library developer API](https://openlibrary.org/developers/api); [live probe](https://openlibrary.org/search.json?q=don+quijote&limit=1&fields=title,author_name,first_publish_year,key)
- Gutendex timed out on three attempts over about 10 minutes, then answered 200 in 0.07 s at the end of the session — [live probe](https://gutendex.com/books/?ids=2000)
- arXiv API terms: no more than one request every three seconds, one connection at a time — [arXiv API Terms of Use](https://info.arxiv.org/help/api/tou.html); the API timed out twice (25 s) before succeeding, the RSS feed was live and the status page showed the main site up — [API probe](https://export.arxiv.org/api/query?search_query=ti:automation&max_results=1); [RSS probe](https://rss.arxiv.org/rss/cs.AI); [status](https://status.arxiv.org/)
- The Met: `/public/collection/v1/search` now returns HTTP 410 "retired on 2026-10-01"; the paginated `/v1.1/search` works — [v1 probe](https://collectionapi.metmuseum.org/public/collection/v1/search?q=sorolla); [v1.1 probe](https://collectionapi.metmuseum.org/public/collection/v1.1/search?q=sorolla&limit=2); [Met API docs](https://metmuseum.github.io/)
- Art Institute of Chicago search is live and keyless (a search for "valencia" returned Hispano-Moresque lusterware from Manises) — [live probe](https://api.artic.edu/api/v1/artworks/search?q=valencia&limit=1&fields=id,title,artist_display)
- Open Trivia DB is keyless; session tokens prevent repeated questions and are deleted after 6 hours of inactivity — [OpenTDB API config](https://opentdb.com/api_config.php); [live probe](https://opentdb.com/api.php?amount=1&type=multiple)

#### Developer, social and news feeds
- Hacker News Firebase API: "There is currently no rate limit" — [HN API README](https://github.com/HackerNews/API); live top stories and Algolia HN search (keyless) — [topstories](https://hacker-news.firebaseio.com/v0/topstories.json); [Algolia search](https://hn.algolia.com/api/v1/search?query=n8n&tags=story&hitsPerPage=1)
- GitHub REST unauthenticated limit is 60 requests/hour, counted per originating IP — [GitHub REST rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api); the live response header showed `x-ratelimit-limit: 60` — [live probe](https://api.github.com/repos/n8n-io/n8n); release Atom feeds need no auth — [live probe](https://github.com/n8n-io/n8n/releases.atom)
- Mastodon's public hashtag timeline is keyless with `x-ratelimit-limit: 300` per 5-minute window — [live probe](https://mastodon.social/api/v1/timelines/tag/n8n?limit=1)
- Bluesky public AppView: `getProfile` works keyless, but `searchPosts` returned an HTML 403 Forbidden page from the CDN (cause not documented; may be a block on unauthenticated search) — [profile probe](https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=bsky.app); [search probe](https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts?q=n8n&limit=1)
- RSS sources live: n8n community forum latest topics and hnrss.org keyword feeds — [community.n8n.io RSS](https://community.n8n.io/latest.rss); [hnrss](https://hnrss.org/newest?q=n8n)

#### Science and space
- NASA via api.data.gov: DEMO_KEY is documented at 30 requests/hour and 50/day per IP, and registered (free) keys default to 1,000 requests/hour — [api.data.gov developer manual](https://api.data.gov/docs/developer-manual/); contradicted by live APOD and NeoWs responses with DEMO_KEY that reported `x-ratelimit-limit: 10` — [APOD probe](https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY); [NeoWs probe](https://api.nasa.gov/neo/rest/v1/feed?start_date=2026-10-05&end_date=2026-10-06&api_key=DEMO_KEY)
- USGS earthquake GeoJSON feeds and the FDSN event query are keyless with `Access-Control-Allow-Origin: *` and 60 s caching — [feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson); [FDSN query](https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=1&minmagnitude=3&minlatitude=35&maxlatitude=44&minlongitude=-10&maxlongitude=5)
- Eurostat dissemination API is keyless (Spain HICP annual rate returned) — [live probe](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/prc_hicp_manr?geo=ES&coicop=CP00&lastTimePeriod=1)
- wheretheiss.at reports `X-Rate-Limit-Limit: 350` per 5 minutes — [live probe](https://api.wheretheiss.at/v1/satellites/25544)

#### Food and fun
- PokeAPI: no authentication; rate limiting removed since the move to static hosting in November 2018; fair-use policy with permanent IP bans for abuse — [PokeAPI docs](https://pokeapi.co/docs/v2)
- TheMealDB: test key "1" may be used during development or for educational use; "The API and site will always remain free at point of access"; searching "paella" returns a Spanish paella recipe — [TheMealDB API page](https://www.themealdb.com/api.php); [live probe](https://www.themealdb.com/api/json/v1/1/search.php?s=paella)
- Open Food Facts: 15 requests/min per IP for product reads, 10/min per IP for search; a custom User-Agent `AppName/Version (ContactEmail)` is required; database under ODbL, contents under DbCL, images CC BY-SA — [OFF API docs](https://openfoodfacts.github.io/openfoodfacts-server/api/)
- Open Food Facts reliability: product read worked, but v2 search returned 503 "Page temporarily unavailable", while the new search service answered — [product probe](https://world.openfoodfacts.org/api/v2/product/3017620422003.json?fields=product_name,nutriscore_grade,brands); [v2 search 503](https://world.openfoodfacts.org/api/v2/search?categories_tags=en:breakfast-cereals&fields=code,product_name&page_size=2); [search.openfoodfacts.org](https://search.openfoodfacts.org/search?q=paella&page_size=1&fields=code,product_name)
- Dog CEO is live and keyless — [live probe](https://dog.ceo/api/breeds/image/random)

#### Testing utilities and crypto
- JSONPlaceholder is live (fake data; `x-ratelimit-limit: 3600000`) — [live probe](https://jsonplaceholder.typicode.com/todos/1)
- DummyJSON: `/http/503/{message}` returns that status as `application/problem+json`; `?delay=1500` added about 1.5 s; responses carry `x-ratelimit-limit: 100` — [http probe](https://dummyjson.com/http/503/Service%20down); [delay probe](https://dummyjson.com/products/1?select=title&delay=1500); [docs](https://dummyjson.com/docs)
- httpbin.org answered (`/get` 200; `/status/503` returned 503 as requested); httpbingo.org (go-httpbin) returned the requested 429; postman-echo returned 200 — [httpbin](https://httpbin.org/get); [httpbingo](https://httpbingo.org/status/429); [postman-echo](https://postman-echo.com/get?foo=bar)
- webhook.site: free URLs expire after 7 days and accept at most 100 requests — [webhook.site docs](https://docs.webhook.site/)
- CoinGecko still offers an official keyless Public API (no sign-up): IP-based shared pool of about 10–30 calls/min for CoinGecko endpoints and about 10/min for GeckoTerminal; "not suitable for production workloads, scheduled polling, or high-frequency updates" — [CoinGecko keyless docs](https://docs.coingecko.com/docs/keyless-public-api); keyless `simple/price` returned 200 — [live probe](https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur)
- CoinGecko's free Demo key (no card) got "Higher Minute Rate Limits" per the changelog; search results (including CoinGecko's own free-API article and third-party trackers) state Demo = 100 calls/min since 17 May 2026 and 10,000 calls/month, but no page with those numbers was read in full — [changelog](https://docs.coingecko.com/changelog); [CoinGecko learn article](https://www.coingecko.com/learn/best-free-crypto-api)

### Inferences

#### Vetted shortlist (global) with one challenge idea each
| Candidate | Auth | Key limits / terms | Status 2026-10-06 | Proposed challenge (avoids existing and backlog scenarios) |
|---|---|---|---|---|
| [Open-Meteo](https://open-meteo.com/en/terms) | None | Non-commercial; 600/min, 10k/day; CC BY 4.0 | Live | "Beach-day score for Malvarrosa" · Beginner–Intermediate · 25–35 min · Merge three parallel calls (marine, air quality, forecast) into one score; deliberately different from the backlog's "daily weather notification" |
| [Frankfurter v2](https://frankfurter.dev/) | None | Open source; no published limit | Live, transient 522s | "Expense normaliser" · Beginner · 20–30 min · Form (amount, currency, date) → historical rate → EUR → Data Table; bonus: Retry On Fail + fallback to ECB SDMX · deterministic (historical rates) |
| [Open Library](https://openlibrary.org/developers/api) | None (identify via UA) | 1 req/s (3 req/s identified); no bulk | Live | "Reading-list enricher" · Intermediate · 30–40 min · Loop Over Items + Wait to respect 1 req/s, custom User-Agent header · deterministic (stable ISBN metadata) |
| [Wikipedia feeds en/es/uk](https://foundation.wikimedia.org/wiki/Policy:Wikimedia_Foundation_User-Agent_Policy) | None (descriptive UA) | UA policy | Live in all three languages | "On this day, three languages" · Beginner · 15–25 min · loop over a language list, pick top events; low translation effort because content is native · no overlap with the Wikipedia *agent* challenge |
| [Nominatim](https://operations.osmfoundation.org/policies/nominatim/) + [Overpass](https://dev.overpass-api.de/overpass-doc/en/preface/commons.html) | None | Nominatim 1 req/s, no periodic bulk; Overpass ~10k/day; ODbL attribution | Live | "What's around this Valenbisi station?" · Intermediate · 35–45 min · Overpass QL query by radius + attribution line in the output · fixture for verification |
| [HN Algolia](https://hn.algolia.com/api/v1/search?query=n8n&tags=story&hitsPerPage=1) | None | No documented limit | Live | "Brand-mention monitor" · Intermediate · 30–40 min · incremental polling with a stored cursor (`created_at_i` > last run) and dedupe · deterministic over a past time window |
| [GitHub releases Atom](https://github.com/n8n-io/n8n/releases.atom) | None | REST alternative capped at 60/h per IP | Live | "Release-notes explainer" · Beginner–Intermediate · 25–35 min · RSS Feed Trigger + LLM summary per language to Discord · avoids REST rate limits |
| [NASA NeoWs](https://api.data.gov/docs/developer-manual/) | Free key (DEMO_KEY too tight) | 1,000/h with own key | Live | "Asteroid watch" · Intermediate · 30 min · reshaping a date-keyed object into items, unit conversion, sorting · deterministic for past dates |
| [USGS FDSN](https://earthquake.usgs.gov/fdsnws/event/1/) | None | Not documented on page read | Live | "Iberia earthquake log" · Beginner · 20–25 min · query parameters (bounding box, min magnitude) + dedupe by event ID · deterministic past window |
| [arXiv](https://info.arxiv.org/help/api/tou.html) | None | ≤1 request per 3 s, one connection | Live but slow | "Weekly research digest" · Intermediate · 35–45 min · XML/Atom parsing + Wait + longer HTTP timeout and retries |
| [TheMealDB](https://www.themealdb.com/api.php) | Test key "1" (educational OK) | Free at point of access | Live | "Weekly menu + shopping list" · Intermediate · 35–45 min · reshape 20 `strIngredientN` columns into rows, then aggregate · deterministic by meal IDs |
| [Open Food Facts](https://openfoodfacts.github.io/openfoodfacts-server/api/) | None (custom UA required) | 15 product reads/min/IP; ODbL | Product reads live; v2 search 503 | "Barcode Nutri-Score checker" · Beginner–Intermediate · 25–35 min · If branch for `status: 0` (not found), friendly errors · fixture barcodes |
| [Mastodon tag timeline](https://mastodon.social/api/v1/timelines/tag/n8n?limit=1) | None | 300 req/5 min | Live | "Hashtag listener" (open alternative to X) · Intermediate · 30 min · `since_id` cursor + dedupe |
| [The Met v1.1](https://metmuseum.github.io/) | None | Open Access data | v1 retired 2026-10-01 | "Art of the day" · Beginner · 20 min · paginated search; real lesson in API version retirement |
| [PokeAPI](https://pokeapi.co/docs/v2) | None | No rate limit; fair use | Live | Beginner warm-up for HTTP Request + expressions (not business-style; best as a tip/sandbox) |
| [CoinGecko keyless](https://docs.coingecko.com/docs/keyless-public-api) | None (Demo key optional) | ~10–30/min shared IP pool; not for scheduled polling | Live | Not recommended for scheduled challenges; acceptable as a manual-trigger example |
| REST Countries | Key now required (v5) | 20 req/10 s; paid plans | v3.1 deprecated | Avoid; replace with a static fixture or Wikidata |
| Bluesky search | Keyless search blocked | — | 403 from CDN | Avoid for keyless challenges |
| Gutendex | None | — | Intermittent timeouts | Avoid as a backbone |

#### Cross-cutting ranking of the strongest new backbones (all regions)
1. REE PVPC "when to run the washing machine" — keyless, Spain-local, deterministic on past dates, teaches array/window logic and time zones.
2. Hryvnia rate board (NBU + Monobank + PrivatBank, optional Frankfurter) — keyless, Ukraine-local, teaches parallel branches, Merge and fallbacks.
3. GVA cultural agenda digest — keyless, CC-BY, teaches date parsing and grouping on messy real data.
4. Fuel prices "cheapest near me" — keyless, teaches data cleaning and geodistance.
5. Metrovalencia or EMT departures via HTML — keyless, teaches the HTML node; risk: unofficial markup, so ship a fixture.
6. GitHub releases Atom + RSS Feed Trigger + AI explainer — keyless, multilingual output.
7. HN Algolia brand monitor — keyless, teaches cursor state across executions.
8. BOE grants radar — keyless, teaches headers, nested JSON and summarisation.
9. Open Library enricher — keyless, teaches rate-limit compliance with Loop + Wait.
10. Seasonal Fallas route builder — keyless, advanced Code-node logic, high local appeal in February–March.

#### Rate-limit and execution-budget implications
- Per-IP caps collide at events: with ~120 participants behind one venue NAT (self-hosted laptops), GitHub's 60/h, Open Food Facts' 15/min, Nominatim's 1/s, CoinGecko's keyless pool and NASA's DEMO_KEY would be exhausted within minutes. Prefer APIs without per-IP caps (Nager.Date, PokeAPI, Valencia geoportal as far as known) or fixtures for event days.
- n8n Cloud sends outbound requests from a published set of IP addresses (see section 4), so learners on Cloud may share per-IP quotas with other tenants; per-IP-capped APIs should be paired with personal keys (GitHub token, NASA key) or caching.
- The n8n Cloud trial allows 1,000 executions and a 180-second execution timeout (section 4): an hourly schedule uses 24 executions/day (about 41 days), every 15 minutes uses 96/day (about 10 days), and every minute uses 1,440/day (exhausted in under 17 hours). Polling challenges should default to manual triggers for testing and hourly or slower schedules, and rate-limited loops must fit in 180 s (e.g. 50 arXiv calls at 3 s spacing = 150 s).

### Gaps
- NASA DEMO_KEY: documentation (30/h, 50/day per IP) conflicts with the observed `x-ratelimit-limit: 10`; which applies now is unresolved.
- CoinGecko Demo plan numbers (100 calls/min, 10,000/month) come from a search snippet of CoinGecko's own article, not a page read in full.
- USGS query result caps, Hacker News Algolia limits and Mastodon instance-specific policies beyond headers were not checked.
- Wikimedia API rate limits and any planned deprecation of api.wikimedia.org were not found on the page read (no matching text).
- X/Twitter API pricing and access in 2026 was not re-verified; it was not tested because it requires an account.
- Wikipedia content licence (commonly CC BY-SA) and TheMealDB/PokeAPI data licences were not read on their pages.

## 4. Free output and storage channels: friction on n8n Cloud vs self-hosted

### Takeaway
The lowest-friction outputs are Discord webhooks (no bot, no auth), ntfy.sh (no signup, 250 messages/day per IP) and Telegram bots (free, but the Telegram Trigger needs a public HTTPS URL, which is a hurdle for local self-hosting). Google services are easy on n8n Cloud thanks to managed OAuth, but self-hosted learners must build their own OAuth client, and in "Testing" mode refresh tokens expire after 7 days. WhatsApp needs a Meta business portfolio plus test-number juggling, and Microsoft 365 needs an app registration. For storage, n8n Data Tables or Neon/Baserow beat Airtable (1,000 API calls/month) and Supabase/Qdrant (pause or suspend after a week of inactivity) for self-paced learners.

### Cited Findings
- Telegram bots can message users at no cost; in a single chat, avoid more than one message per second, or bursts eventually get 429s — [Telegram Bot FAQ](https://core.telegram.org/bots/faq)
- n8n's Telegram Trigger needs an HTTPS webhook URL; behind a reverse proxy, `WEBHOOK_URL` must be set to the public HTTPS address ("An HTTPS URL must be provided for webhook") — [n8n Telegram Trigger common issues](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.telegramtrigger/common-issues/)
- Discord webhooks "do not require a bot user or authentication to use" — [Discord webhook docs](https://discord.com/developers/docs/resources/webhook); rate limits are per route and per webhook ID, exposed via `X-RateLimit-*` headers rather than fixed published numbers — [Discord rate limits](https://discord.com/developers/docs/topics/rate-limits)
- Slack Free plan: 90-day access to message and file history, content older than one year deleted, and a limit of 10 app integrations — [Slack plans help article](https://slack.com/help/articles/7050776459923); incoming webhooks allow 1 message per second with short bursts, then HTTP 429 — [Slack rate limits](https://docs.slack.dev/apis/web-api/rate-limits)
- n8n managed Google OAuth2 ("Sign in with Google directly on n8n, with no setup required on the Google Cloud Console") is available for n8n Cloud users only and only for certain Google nodes — [n8n Google credentials](https://docs.n8n.io/integrations/builtin/credentials/google/)
- Google issues refresh tokens that expire in 7 days to projects with an External user type whose consent screen is in "Testing" status (unless only basic profile scopes are requested) — [Google OAuth 2.0 docs](https://developers.google.com/identity/protocols/oauth2)
- n8n's Microsoft credential docs include app-registration setup material (e.g. "Provision a SharePoint app registration with the Azure CLI") and state that for corporate Microsoft Entra accounts an admin must have enabled "User can consent to apps accessing company data on their behalf" — [n8n Microsoft credentials](https://docs.n8n.io/integrations/builtin/credentials/microsoft/)
- n8n's WhatsApp Business Cloud credentials require a Meta developer account and a Meta business portfolio (formerly Business Manager) — [n8n WhatsApp credentials](https://docs.n8n.io/integrations/builtin/credentials/whatsapp/)
- The WhatsApp test number can message up to 5 manually added recipient numbers, and the temporary access token lasts under 24 hours; production needs a System User token (secondary sources; Meta's page refused automated fetches) — [Digital Inspiration (secondary)](https://digitalinspiration.com/docs/document-studio/apps/whatsapp/phone); [WinSender (secondary)](https://www.winsender.net/how-to-setup-whatsapp-cloud-api-register-your-phone-number-and-get-your-access-token/); [Meta developer blog on tokens](https://developers.facebook.com/blog/post/2022/12/05/auth-tokens/)
- Resend Free: $0/month, 3,000 emails/month, daily limit 100 — [Resend pricing](https://resend.com/pricing)
- Brevo Free: "Free forever, no credit card needed"; once Brevo approves the account for sending, up to 300 emails/day — [Brevo pricing](https://www.brevo.com/pricing/)
- Mailjet Free: 6,000 emails/month, 200 emails/day — [Mailjet pricing](https://www.mailjet.com/pricing/)
- ntfy.sh anonymous limits (IP-based): 250 messages/day, messages kept 12 hours, 5 emails/day, no phone calls, attachments up to 2 MB each and 20 MB total with 3-hour expiry; paid tiers start at Supporter ($6/month, 2,500 messages/day) — [live /v1/account](https://ntfy.sh/v1/account); [live /v1/tiers](https://ntfy.sh/v1/tiers)
- Notion API: 180 requests/minute (average 3/s) on non-Business plans, 600/minute on Business/Enterprise; excess returns 429 `rate_limited` — [Notion request limits](https://developers.notion.com/reference/request-limits)
- Airtable Free: 1,000 API calls per month (per workspace) and 5 requests/second per base; monthly limits apply to Free and Team plans — [Airtable support](https://support.airtable.com/docs/managing-api-call-limits-in-airtable)
- Baserow Free: 3,000 rows per workspace and 2 GB storage; self-hostable with Docker — [Baserow pricing](https://baserow.io/pricing)
- NocoDB Free: up to 3 users, 1,000 records, 1 GB storage — [NocoDB pricing](https://nocodb.com/pricing)
- Supabase Free: 500 MB database, 5 GB egress, 50,000 MAU, limit of 2 active projects, and free projects are paused after 1 week of inactivity — [Supabase pricing](https://supabase.com/pricing); [Supabase billing docs](https://supabase.com/docs/guides/platform/billing-on-supabase)
- Neon Free: $0, "no time limits and no credit card required", 100 projects, 100 CU-hours per project per month, and (new) 1 GB Postgres storage per project — [Neon pricing](https://neon.com/pricing)
- Upstash Redis Free: 256 MB data, 10 GB monthly bandwidth, 500K commands/month — [Upstash pricing](https://upstash.com/pricing/redis)
- Qdrant Cloud Free: single node 0.5 vCPU / 1 GB RAM / 4 GB disk, free forever, no credit card; unused free clusters are suspended after 1 week and deleted after 4 weeks of inactivity — [Qdrant pricing](https://qdrant.tech/pricing/); [Qdrant cluster docs](https://qdrant.tech/documentation/cloud/create-cluster/)
- Pinecone's free Starter plan is positioned "for trying out and for small applications" — [Pinecone pricing](https://www.pinecone.io/pricing/)
- n8n Cloud trial: no credit card required; trial limits of 1,000 executions, 5 concurrent executions and a 180-second execution timeout; Starter plan includes 2.5K workflow executions/month — [n8n pricing](https://n8n.io/pricing/)
- n8n Cloud outbound requests (HTTP Request and app nodes) come from the IP addresses published on the docs page for allowlisting; inbound webhook traffic does not use them — [n8n Cloud IP addresses](https://docs.n8n.io/manage-cloud/cloud-ip/)

### Inferences

#### Friction matrix for learners
| Channel | n8n Cloud | Self-hosted (local) | Card / business checks | Recommendation |
|---|---|---|---|---|
| Discord webhook | Paste URL | Same | None | Default "notify" output for new challenges |
| ntfy.sh | Works | Works (outbound only) | None | Zero-signup alternative; use unguessable topic names; 250/day per IP is fine for individuals but not for an event behind one NAT |
| Telegram (send) | Easy | Easy | None | Fine, but existing challenges already lean on Telegram; rotate channels |
| Telegram Trigger | Works | Needs public HTTPS (tunnel/reverse proxy) | None | For self-hosted beginners, offer a polling alternative (Schedule + getUpdates) or a Form trigger |
| Slack | OAuth app or webhook | Same | None | OK for "team" scenarios; one-person free workspace is easy; 10-integration cap |
| Gmail / Sheets | Managed OAuth (easy) | Own Google Cloud OAuth client; 7-day token expiry in Testing | None | Flag the 7-day expiry in tips for self-paced self-hosters |
| Microsoft 365 | Managed OAuth not confirmed | Azure/Entra app registration + possible admin consent | Work accounts may be blocked | Avoid as a primary path |
| WhatsApp Cloud API | Needs Meta business portfolio | Plus public HTTPS webhook | Business portfolio; payment method for production (not verified) | Avoid for self-paced challenges; backlog WhatsApp ideas are better as Telegram variants or fixture-first |
| Email (Resend/Mailjet/Brevo) | API key | Same | Brevo requires account approval | Resend already used; Mailjet (200/day) is a no-approval alternative |
| Storage | Data Tables built-in | Same | — | Prefer Data Tables; Neon for "real Postgres"; avoid Airtable for polling (1,000 calls/month); warn that Supabase and Qdrant pause after a week |

#### Other notes
- Self-paced learners often return days or weeks later; free tiers that pause (Supabase after 1 week, Qdrant after 1 week with deletion at 4 weeks) or tokens that expire (Google Testing mode after 7 days, WhatsApp temporary token under 24 h) will break their workflows silently. Challenge tips should say this explicitly.
- Webhook-receiving challenges are the main Cloud vs self-hosted split; polling-based designs (Schedule, RSS Feed Trigger, Form Trigger reached via the local editor) keep both audiences equal.

### Gaps
- Exact Discord webhook rate numbers are not published (header-driven only).
- Whether n8n Cloud now offers managed OAuth for Microsoft nodes was not confirmed on the page read.
- Pinecone Starter quotas (storage, read/write units, region) were not captured from the JS-rendered pricing page.
- WhatsApp test-number limits are from secondary sources; Meta's official page could not be fetched. Payment-method and business-verification requirements for production messaging were not verified this session.
- Whether ntfy.sh topics are readable by anyone who knows the name was not re-read in the docs (commonly understood; treat as an assumption).

## 5. Free AI providers (brief)

### Takeaway
Free tiers still exist at OpenRouter (":free" models, capped per minute and per day by lifetime credits purchased), Gemini (free of charge, but prompts may be used to improve products and reviewed by humans, and EU-facing apps must use paid services), Groq (e.g. 30 RPM / 1K RPD for gpt-oss-120b) and Mistral ("Free mode" in Studio). Another researcher covers this in depth.

### Cited Findings
- OpenRouter free model variants (IDs ending in `:free`) are subject to free-usage limits on requests per minute and per day, tiered by all-time credits purchased ("Less than" / "At least" a threshold); a negative balance can block even free models; `GET /api/v1/key` reports `free_model_daily_requests` — [OpenRouter limits](https://openrouter.ai/docs/api-reference/limits)
- Gemini API: the free tier is "Free of charge" and content is "used to improve our products"; for unpaid services human reviewers may read API input and output; developers must use only Paid Services when making API clients available to users in the EEA, Switzerland or the UK; rate limits apply per project, not per key — [Gemini pricing](https://ai.google.dev/gemini-api/docs/pricing); [Gemini API terms](https://ai.google.dev/gemini-api/terms); [Gemini rate limits](https://ai.google.dev/gemini-api/docs/rate-limits)
- The Gemini docs banner announces "Gemini 3.8 Flash is now available" — [Gemini rate limits page](https://ai.google.dev/gemini-api/docs/rate-limits)
- Groq free limits per model, e.g. `openai/gpt-oss-120b` 30 RPM and 1K RPD; prompt-guard models 30 RPM and 14.4K RPD — [Groq rate limits](https://console.groq.com/docs/rate-limits)
- Mistral: "Activate Studio in Free mode and generate your first API key" — [Mistral quickstart](https://docs.mistral.ai/getting-started/quickstart/)

### Inferences
- For a Valencia/EU audience, the Gemini free tier is fine for a learner's private experiments, but a challenge that ends with a public-facing bot for EU users would need paid services under Gemini's terms; OpenRouter (already used) or Groq avoid that wording.
- Free AI quotas are small enough that AI steps should be single calls per execution, not inside loops over many items.

### Gaps
- OpenRouter's exact free-model numbers were not rendered in the fetched HTML (historically 20 RPM and 50/day under a $10 purchase threshold, 1,000/day above it, but unverified this session).
- Gemini free-tier RPM/RPD values per model are shown in AI Studio, not in the docs page fetched.
- Mistral free-mode limits and training-data terms were not checked.

## 6. Fixture strategies when third parties are unreliable

### Takeaway
Use three layers: (1) immutable past-date queries against reliable official APIs for objective checks, (2) static JSON snapshots and synthetic data on the site's own GitHub Pages host (CORS `*`, 10-minute cache) for live-only sources, and (3) importable n8n "mock API" workflows plus public failure simulators (DummyJSON `/http/{code}` and `?delay`, httpbingo) for deterministic error handling. Avoid hosted mock services with small free quotas (Beeceptor 50 requests/day per endpoint) or that are down (My JSON Server). Store only synthetic data or small CC-BY/CC0/ODbL snapshots with attribution, never copies of proprietary sources.

### Cited Findings
- GitHub Pages: soft bandwidth limit of 100 GB/month, published sites up to 1 GB, soft limit of 10 builds/hour (not applied when publishing via a custom GitHub Actions workflow), possible 429 rate limiting, and not allowed as hosting for commercial SaaS or e-commerce — [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- n8n-challenges.app is served by GitHub.com with `Access-Control-Allow-Origin: *` and `Cache-Control: max-age=600` — [live probe](https://n8n-challenges.app/)
- Beeceptor free plan: 50 requests per endpoint per day and 3 mock rules, no credit card — [Beeceptor pricing](https://beeceptor.com/pricing/)
- Mockoon CLI lets you self-host mock APIs "in your CI/CD pipeline, on your servers or in your cloud environments" — [Mockoon CLI](https://mockoon.com/cli/)
- JSON Server's current docs are a v1 beta ("usable but expect breaking changes"), started with `npx json-server db.json` — [JSON Server README](https://github.com/typicode/json-server)
- My JSON Server (my-json-server.typicode.com) returned HTTP 530 during testing — [live probe](https://my-json-server.typicode.com/)
- DummyJSON deterministic failures: `/http/503/{message}` returns 503 problem+json; `?delay=` adds latency; 100-request rate-limit header — [live probe](https://dummyjson.com/http/503/Service%20down); [docs](https://dummyjson.com/docs)
- httpbingo.org returns any requested status (429 tested) — [live probe](https://httpbingo.org/status/429)
- webhook.site free URLs: 7-day expiry, max 100 requests — [webhook.site docs](https://docs.webhook.site/)
- Licences relevant to snapshots: Valencia VLCi and GVA datasets `cc-by` — [VLCi parkings](https://opendata.vlci.valencia.es/api/3/action/package_show?id=parkings), [GVA IVC agenda](https://dadesobertes.gva.es/api/3/action/package_show?id=cul-agc-ivc); data.gov.ua CC BY 4.0 unless stated — [data.gov.ua](https://data.gov.ua/pages/aboutuser2); Open-Meteo CC BY 4.0 — [terms](https://open-meteo.com/en/terms); OSM data ODbL 1.0 — [Nominatim response](https://nominatim.openstreetmap.org/search?q=Ciutat+de+les+Arts+i+les+Ciencies&format=jsonv2&limit=1); Open Food Facts ODbL/DbCL/CC BY-SA — [OFF docs](https://openfoodfacts.github.io/openfoodfacts-server/api/); The Met Open Access datasets usable "in any media without permission or fee" — [Met API docs](https://metmuseum.github.io/)
- Historical official values are fixed by nature, e.g. NBU USD for 01.10.2026 = 44.6819 — [live probe](https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&date=20261001&json)

### Inferences

#### Recommended fixture toolkit
1. **Immutable queries first.** Where a challenge's check can use a past date or window (NBU/PrivatBank archive, Frankfurter historical, REE PVPC for a given day, BOE summary for a given date, USGS or HN Algolia time windows), the expected answer can be written into the challenge with no fixture to maintain.
2. **Static snapshots on GitHub Pages.** Publish versioned files such as `/fixtures/v1/valenbisi/2026-10-06T1900.json` from the site repo. They are GET-only and return only 200/404, so they suit "read and transform" challenges, not POST or error drills. A GitHub Action could refresh CC-BY snapshots weekly and diff the schema to catch upstream changes (e.g. the OpenDataSoft shutdown or the Met v1 retirement).
3. **Importable mock-API workflows.** Ship an n8n workflow (Webhook + Respond to Webhook + Code) that learners import into their own instance. It has no third-party dependency, works on Cloud and self-hosted, and survives the organizer's server being down. Query parameters can drive deterministic failure modes, e.g. `?scenario=rate-limit` → 429 with `Retry-After: 2` on the first call per run ID; `?page=3` → 500 once; `?slow=1` → delay past the HTTP node timeout; plus schema drift (number sent as `"1,915"`), duplicates, an empty last page, malformed JSON, and 401 when a header is missing.
4. **Public failure simulators for quick drills.** DummyJSON (`/http/{code}/{message}`, `?delay=`) and httpbingo.org (`/status/{code}`) give deterministic errors without hosting anything; mention their own 100-requests or similar caps.
5. **Organizer-hosted mocks for events only.** For a 120-person event, run Mockoon CLI or a self-hosted go-httpbin in Docker with the mock definition committed to the repo; skip Beeceptor (50 requests/day per endpoint) and My JSON Server (down).

#### Keeping fixtures legal in a public repo
- Commit only (a) synthetic data generated to match a real schema (Faker-style names, prices, coordinates), or (b) small, dated samples from openly licensed sources with an ATTRIBUTION file (CC-BY for Valencia/GVA/data.gov.ua/Open-Meteo; ODbL share-alike obligations apply if you publish a derived OSM or Open Food Facts database; CC0-like for Met Open Access).
- Do not commit copies from proprietary or unclear-terms sources (Idealista, Mercadona, EMT/Metrovalencia HTML pages, bank APIs whose reuse terms were not found); recreate their structure with synthetic values instead (keep the HTML tags and field names, invent the content).
- Record the source URL, retrieval date and licence in each fixture's metadata so the trilingual pages can cite them consistently.

### Gaps
- Whether Mockoon Cloud offers a usable free hosted tier in 2026 was not checked (only the self-hosted CLI was confirmed).
- Exact rate-limit window for DummyJSON's `x-ratelimit-limit: 100` header (per minute or other) was not documented on the page read.
- Licence terms for Monobank/PrivatBank/NBU API data reuse were not found, so they are treated as "synthetic only" in public fixtures.
