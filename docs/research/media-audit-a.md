# Media audit A — 12 October 2026

Inventory: `media-inventory-a.json`. Only public creator sites, published browser assets, linked portfolio pages and public YouTube oEmbed were used. No authenticated Instagram access, extraction from private areas, outreach, or video download was performed. Creator permission has been confirmed by Matthieu for this project.

## Coverage

| Creator | Records | Verified | Source only | What was inspected |
|---|---:|---:|---:|---|
| Tom Pacelli | 41 | 32 | 9 | Homepage, content grid, all 26 linked portfolio pages, robots, both advertised Yoast sitemaps, all six project-type archives |
| Robin Chills | 9 | 7 | 2 | Homepage, sitemap and complete public app bundle; about/group-trips routes returned 403 but the published bundle exposes their content |
| Matiss Skujins | 32 | 1 | 31 | Homepage HTML and live published component data, public JS, sitemap, `/rework/` and `/update-coming/`; disallowed `/client/` was not accessed |
| CJ Blardony | 4 | 3 | 1 | Public Bio.site link data and four named project links; public Instagram was checked without authentication |
| Rayan Claverol | 2 | 2 | 0 | Homepage, all 13 linked app chunks and embedded latest film; robots/sitemap returned 404 |
| **Total** | **88** | **45** | **43** | **74 poster fields, 39 embed fields, 38 direct-video fields** |

Records are assets/references, not 88 unique commissions: Tom includes four portfolio reels and nine summary-only references. Matiss includes 29 grid projects plus three hero assets; two hero assets are alternate previews of projects already in the grid. Grid entry “Humans Need Other Humans” represents a seven-episode series, not seven separately discovered files. Other multi-deliverable commissions remain a single source-only reference when no individual URLs are available.

`verified` means the public source establishes attribution and a playable-media endpoint or oEmbed metadata was positively observed. It does not verify every frame, third-party brand approval, present-day embed permissions, or guaranteed reach. `source-only` means media was not provided, endpoint availability failed, or metadata could not be confirmed. A `videoUrl` may therefore remain in a source-only record solely to preserve the exact discovered URL; do not feed those records directly to autoplay. `client: null` means personal work or an unidentified commissioning client. Credits belong to the listed filmmaker and are not presented as historical UNMISSABL commissions.

Format follows the published iframe dimensions where available. `video-preview` and `showreel` distinguish those assets from complete client films. Sector tags are editorial routing labels based on the identified subject/client; empty arrays are intentional for personal, wedding, entertainment, sport or other work that does not fit the eight requested sectors. They should not be displayed as creator-supplied categorisation.

## Poster availability

All 74 final poster fields were checked with HEAD requests on 12 October 2026: **40 returned 200 image responses; 34 returned 403**. The latter are 31 Matiss source-only cards/hero variants and Robin’s Venezuela, Dubai and Etihad site posters. Failed poster URLs remain exact provenance in their records and are explicitly flagged in notes. Five verified Robin YouTube cases plus Matiss’s Stars documentary now use the exact reachable thumbnail returned by YouTube oEmbed instead of the unavailable source-site image. All 28 Tom film posters, all four CJ Bio posters, Rayan’s Socotra poster and Robin’s Siargao poster returned 200. Do not treat the presence of a poster field as proof that it can currently load.

## Immediately useful media

All four self-hosted Tom reels answered HEAD 200, `video/mp4` on 12 October 2026:

| Public source | Asset | Bytes |
|---|---|---:|
| [Homepage](https://www.tompacelli.com/) | [Brand content reel](https://www.tompacelli.com/wp-content/uploads/2025/01/reel_brand.mp4) | 2,721,202 |
| [Homepage](https://www.tompacelli.com/) | [Destinations reel](https://www.tompacelli.com/wp-content/uploads/2025/01/reel_destinations.mp4) | 3,106,850 |
| [Homepage](https://www.tompacelli.com/) | [Event coverage reel](https://www.tompacelli.com/wp-content/uploads/2025/01/reel_event.mp4) | 3,133,625 |
| [Content](https://www.tompacelli.com/content/) | [2025 web showreel](https://www.tompacelli.com/wp-content/uploads/2025/01/2025_webshowreel.mp4) | 9,239,561 |

[Rayan’s hero showreel](https://rayanclaverol.com/videos/Showreel.mp4) answered HEAD 200, `video/mp4`, 35,181,642 bytes. No source poster is attached to these five reel files; the inventory does not invent one.

Robin’s Dubai file is a genuine public MP4: GET with a small byte range answered 206 `video/mp4` and an MP4 file signature. At 118,393,844 bytes it needs a smaller local derivative before background use. His Etihad MOV reports 1,028,945,808 bytes; HEAD returned an inconsistent `application/json` type and no video playback was verified. The inventory preserves both exact delivery URLs produced by the public site’s own Dropbox helper; they were not constructed from guessed paths.

## Reference choices with specific work

- Hospitality: `tom-radisson` (Bangkok), `tom-redseapadi` (Nujuma/Shebara resort recap), `tom-amex` (Amsterdam hotel/restaurant itinerary). Matiss SIRO and Atlantis are additional real portfolio references but their media availability is currently unresolved.
- Travel: `tom-eastjava`, `tom-tarngaronne`, `tom-charentestourism`, `rayan-socotra`, `robin-ras-al-khaimah`, `cj-mongolia`. The record notes distinguish commercial and personal work.
- Fashion: `tom-levis`, `tom-puma`, `tom-kiabi`. All have real project-specific posters and embedded films.
- Automotive: `tom-volkswagenxlescoflocs` is directly playable; `cj-mazda` is an explicit Bio.site project link with a supplied poster but oEmbed returned 403. `tom-retromobile` is summary-only; `matiss-amber-rally` has unavailable preview media.
- Aviation: `robin-jetex`, `robin-qatar-doha`, `robin-qatar-editor`. Preserve the last record’s **Editor** credit; it is not an on-location filming claim.
- Food: `tom-amex` and `tom-charentestourism` contain explicitly described dining content, but neither is a dedicated food-product case study. `matiss-lima-empanadas` is a dedicated named food reference with currently unavailable preview. `robin-etihad` is a 15-second food cut but the large MOV remains unverified for playback.
- Architecture: `tom-onefinestay` is the strongest explicit real-estate home tour. `matiss-emaar` is a named developer reference whose generic “Content Creation” description does not prove a specific architecture deliverable.
- Jewellery: no defensible dedicated project identified in this five-creator batch. Do not manufacture a jewellery landing page case from a generic luxury logo.

## Source evidence and unresolved points

### Tom Pacelli

Primary catalogue: [content](https://www.tompacelli.com/content/), [homepage](https://www.tompacelli.com/), [sitemap index](https://www.tompacelli.com/sitemap_index.xml), [page sitemap](https://www.tompacelli.com/page-sitemap.xml), [project type sitemap](https://www.tompacelli.com/project-type-sitemap.xml). The 26 linked portfolio pages contain **28 distinct YouTube films across 24 video project pages**. The remaining two pages, [Ozen Freediving](https://www.tompacelli.com/portfolio/ozenfreediving/) and [Super Bock](https://www.tompacelli.com/portfolio/superbock/), explicitly describe photography work and contain no video; they are excluded from this video inventory.

All 28 embedded film IDs returned YouTube oEmbed metadata. Exact source iframe URLs are retained. Individual YouTube posters returned by oEmbed take precedence over page-wide OG images when a page has two films.

The [PAKA Festival page](https://www.tompacelli.com/portfolio/pakafestival/) has a mistaken PUMA heading; its iframe title and body identify PAKA Festival 2025. [Dolomites](https://www.tompacelli.com/portfolio/letsgodolomites/) is a personal film made after the commercial assignment’s daily wrap. [Red Bull](https://www.tompacelli.com/portfolio/redbull/) is an extra personal edit beyond the original deliverables. [Artlist/Escapism](https://www.tompacelli.com/portfolio/aeourstory/) is a contest entry. These distinctions are carried into JSON notes.

Nine lower-grid summaries have no linked individual film: Qatar Airways × Beautiful Destinations, LVMH internal seminar, Lexias Hostels, VL Summer Tour, Nouvelle-Aquitaine, Centrakor, Tourism Australia, Michelin Voyages and Salon Rétromobile. “Tourism Australia” was filmed for an exhibition at the Australian embassy in **Paris**; it does not establish filming in Australia. LVMH is explicitly described as internal and should not become a public-film case tile.

### Robin Chills

Source: [website](https://www.robinchills.com/) and [published app JS](https://www.robinchills.com/assets/index-CEnpLh9b.js). Portfolio array `y$` contains eight exact projects with individual role/year fields, six YouTube IDs and two public Dropbox files. Five of the six YouTube portfolio IDs returned oEmbed metadata. The Venezuela ID `aAP6c90wxGU` returned 403, so its source/title/poster and exact ID in notes are preserved without fabricating an embed URL.

The same bundle embeds [SIARGAO - AUGUST 2026](https://www.youtube.com/embed/MOx-EeFofWM) on the [group trips route](https://www.robinchills.com/group-trips), introduced as “The trip, in 2 minutes”. oEmbed confirms Robin Chills as publisher. It is group-trip promotion, not an external brand commission. Route-level HTTP 403 is recorded, not bypassed.

### Matiss Skujins

Source: [homepage](https://bymatiss.com/) and [published JS](https://file-cdn.framekit.ai/digisell-io.appspot.com/sites/amTSYTLKVB8KCzgLck0l/published/js/230df66af7f7.js). The live `projects` array contains **29 project cards, 28 declared hoverVideo URLs and 29 exact poster URLs**. Fact Magazine is the one card with no hoverVideo. Hero `items` contains three further preview URLs. The JSON records preserve all of these actual values.

The three hero videos initially answered HEAD 200 with MP4 content types (Paddle 2,793,961 bytes; East Java 4,343,519; Stars 7,651,548). Later checks returned 403, including ordinary HEAD and GET for Paddle, and HEAD for all 28 grid previews. Ordinary GET samples for SIRO and Atlantis also returned 403. No alternate hostname, token substitution or access workaround was attempted. These are **source-only media** until availability is resolved; root has been informed.

The complete [Finding Our Way to the Stars documentary](https://youtu.be/EuHx8NWIVSA?si=vgMDZES9uQT6s85E) is explicitly linked from the live hero. Its oEmbed metadata succeeds and confirms Matiss Skujins as publisher, so that project is verified for its YouTube embed despite its failed hover URL.

Crucial exclusion: `/rework/`, `/update-coming/` and default component code include Nike, Canada Goose and generic product videos under another account (`Foodkb1…`). They are template/default content and are not defensibly attributable to Matiss. They are excluded. A legacy Paddle backgroundVideo field under Matiss’s account duplicates an obsolete component configuration; only active hero/grid values are delivered. `/client/` is robots-disallowed and was not accessed. No internal page-ID URL was guessed.

### CJ Blardony

The actual public [Bio.site](https://bio.site/cjblardony) state links four named films and supplies four genuine card posters. YouTube oEmbed confirms DJI RS 3 Mini Launch Video, Mongolia Proudly Welcomes You and Land of a New Tomorrow. The last is published by **ThisWorld Official**, and the Bio page does not specify CJ’s exact role or commissioning client. Mazda’s oEmbed returned 403; the original public watch link and Bio poster remain in a source-only record.

A normal unauthenticated [Instagram profile](https://www.instagram.com/cjblardony/) request returned 200 with no `/reel/` or `/p/` links. It did not expose additional individual videos.

This is the complete four-film public Bio collection, not an assertion that CJ’s entire Instagram or YouTube history has been enumerated. No follower count, reach estimate, or private analytics is included in this media inventory.

### Rayan Claverol

[Homepage](https://rayanclaverol.com/) exposes a single self-hosted showreel and a [YouTube film](https://youtu.be/pVfOKyfAXEk) in Latest film. oEmbed resolves the exact title to **SOCOTRA — A Place Untouched | Cinematic | Sony FX3**. The site explicitly describes concept, shoot and edit. All linked public JS chunks were scanned and add no other project videos. The client logo strip does not assign Decathlon, Novotel, Nuamore, Pacific High or Musicbed to either film; no such client claims were created.

## Location and completeness policy

Shoot locations are retained in notes only when the creator page or actual film title names them. No location object was added because these sources do not provide verified numeric shoot coordinates. A future map may geocode an explicitly named city/region to an approximate centre, labelled as such; do not turn an approximate map point into a precise filming coordinate or a creator’s current availability.

“All publicly discoverable” here means the bounded official-site surfaces described above, their linked portfolio pages, public sitemaps and shipped client data at the time of observation. It does not include private client portals, hidden Instagram histories, or an exhaustive crawl of every video on every linked YouTube channel. Public availability may change independently of creator permission.
