# Inventaire média B — UNMISSABL V1

Observation des sources publiques le **12 octobre 2026**. Fichier de données : `docs/research/media-inventory-b.json`. Périmètre demandé : Dumont Films, Sanctuary Creative, Creatum Media / Adobe Portfolio, Bahri Najm, Zaid Wazzan / Behance et liens publics Orie, Marceau, Laura, Keoni.

## Résultat et portée de la vérification

- **192 fiches** : **172 verified**, **20 source-only**.
- **115 URL vidéo directes** : 86 MP4 Adobe signés, 15 MP4 Wix/Sanctuary, 8 MP4 Creatum, 5 MP4 Bahri, 1 MOV Dumont.
- **100 lecteurs embarqués** : 86 Adobe + 14 YouTube/Vimeo Dumont. Un film Dumont/Ookpik reste source-only parce que Chuck n'est pas crédité.
- **49 fiches photographiques** : 40 séries Behance, 3 projets Dumont sans lecteur vidéo, 6 galeries Adobe. Les galeries mélangées à des logos et sans légendes individuelles sont source-only.
- Les fiches recensent des versions, extraits, galeries et sources. **Ce n'est pas un compte de productions, de clients ou de personnes différentes.**
- `verified` signifie que le projet/média et son association au portfolio sont présents sur la source publique inspectée. Cela ne signifie ni client contractuel UNMISSABL, ni rôle individuel exhaustivement établi, ni validation artistique du film. Les limites sont dans `notes`.
- `source-only` identifie un profil/lien à qualifier, un projet avec médias vides, une galerie ambiguë ou une attribution individuelle insuffisante. Ces entrées ne doivent pas devenir automatiquement des cartes de réalisations validées.
- Aucun média n'a été téléchargé ou réhébergé pendant ce relevé. Aucun compte, connexion, API payante, endpoint privé ou navigateur CUA n'a été utilisé.

## Couverture par source

| Source | Pages/médias couverts | Limites |
|---|---|---|
| [Dumont Films](https://dumontfilms.ca/projects) | Les 17 fiches reliées par la page projets ; données publiques `__NEXT_DATA__`, crédits et galeries ; showreel d'accueil | Sitemap XML 404. Les trois pages Hyundai, Arc'teryx et North Face ne contiennent que des galeries, aucun lecteur film. |
| [Sanctuary](https://www.sanctuarycreatives.com/work) | Accueil + six pages de projets + page work ; 15 vidéos uniques, qualités 360/480/720/1080 et posters ; sitemap contrôlé | Les vidéos réutilisées comme hero sont dédupliquées par identifiant. Aucun crédit individuel de Samuel par film publié. |
| [Creatum Media](https://www.creatummedia.com/) | Six projets du tableau public servi par [le JS du site](https://www.creatummedia.com/assets/index-B2g1fpc7.js), routes `/project/:slug` ; huit MP4 sur quatre projets | Sony et Cortina contiennent une URL vidéo vide et des images `/placeholder.svg` : source-only. Sitemap XML 404. |
| [Adobe Portfolio Creatum](https://ducreates.myportfolio.com/) | Les 13 rubriques/projets vidéo/photo trouvés dans le [sitemap](https://ducreates.myportfolio.com/sitemap.xml), dont la page séparée [24h Series Barcelona](https://ducreates.myportfolio.com/24h-series-barcelona) ; 86 lecteurs, légendes par module, galeries | Plusieurs modules ne donnent ni client ni titre. Aucun logo de la page Brands n'a été utilisé pour attribuer arbitrairement un film. |
| [Bahri Najm](https://bahrinajm.com/) | Accueil, Work, Shop et [Socotra — The Grade](https://bahrinajm.com/shop-socotra.html) ; hero et quatre extraits publics | Work comporte six cartes avec liens # et sans lecteurs : source-only. Les quatre extraits de grade proviennent de la même production Socotra. |
| [Zaid Wazzan / Behance](https://www.behance.net/zaidwazzan) | Quatre pages paginées via les liens Next officiels : 12 + 12 + 12 + 4 = 40 séries ; titres, liens de projet, couvertures max_808 | Trois fiches individuelles joaillerie ont répondu 403, via requête directe et outil web. Aucune tentative de contournement ; les couvertures restent publiquement accessibles sur la liste du créateur. |
| Instagram Orie / Marceau / Laura / Keoni | Métadonnées publiques et liens de profil uniquement ; deux pistes de Reels issues du relevé antérieur sont explicitement source-only | Pas d'inventaire exhaustif des publications Instagram ni de crédit de réalisation déduit d'une vignette. |

Cet inventaire couvre les médias exposés par ces surfaces au moment du relevé, pas l'intégralité historique ou privée des travaux des créateurs. Les pages juridiques/contact sont exclues des fiches médias. La page `blank-1` de Sanctuary est un gabarit d'accessibilité, pas un projet.

## Candidats utiles pour la V1

| Fiche / usage | Poids observé | Interprétation correcte |
|---|---:|---|
| `bahri-najm-socotra-hero` — hero voyage | 5,75 Mo MP4 / 5,04 Mo WebM | Film Socotra du portfolio Bahri / Last Meridian ; aucun client commercial nommé. |
| `samuel-kwan-13f1b1ebf6bd49279b59821517b45d63` — Columbia HK / Féroé | 6,97 Mo, 720p | Production Sanctuary ; pays/lieu de film documenté ; rôle personnel Samuel non détaillé. |
| `samuel-kwan-c1aeca96273a4149b4964482386d96f2` — Go Wild HK / Dolomites | 14,84 Mo, 720p | Titre de projet explicite ; ne pas appeler ce film « Columbia Féroé ». |
| `samuel-kwan-236bfe8ca0454367b3e2c46b12c59ac3` — Rosewood Festive | 4,96 Mo, vertical | Film de campagne nommé, distinct du showreel d'accueil. |
| `samuel-kwan-507de54c49f240b1a7f2d27c44231ab1` — Peninsula Mother's Day | 3,16 Mo, vertical | Référence hôtellerie, Hong Kong. |
| `samuel-kwan-467cf31c65464fd180f8b2660a3d02d6` — Spring Moon | 2,81 Mo, vertical | Référence restauration/hôtellerie, Hong Kong. |
| `samuel-kwan-e69d32ce332f4aecb0c60b70c08ed0a4` — Four Seasons × Mikimoto | 7,22 Mo, vertical | Collaboration festive hôtelière ; ne pas inventer un film de packshots joailliers. |
| `duarte-creatum-ferrari` — Madère | 10,70 Mo | **Projet personnel** explicitement nommé dans le site ; Ferrari est le sujet. |
| `duarte-creatum-columbia-1/2/3` | 20,94 / 16,79 / 18,66 Mo | Columbia Sportswear ; réalisateur et chef opérateur déclarés ; les Alpes sont nommées, pays exact absent. |
| `chuck-dumont-elewana-collection` | Lecture YouTube | Benjy réalisation/montage ; production Chuck, Alexandre Buisson, Benjy, Jules Rapp ; Chuck FPV. |
| `duarte-creatum-luxury-chalet-1/2` | 41,06 / 38,37 Mo | Client Pescosta Chalet Luxury Living, lieu contradictoire dans la source ; aucune localisation ajoutée. |
| `duarte-creatum-royal-rides-1/2` | 44,31 / 99,56 Mo | Portugal documenté, films lourds ; MIME serveur `application/octet-stream`. |

Le showreel Dumont est un MOV de 93,23 Mo. Les quatre extraits Socotra pèsent respectivement 0,44 / 0,44 / 0,57 / 1,40 Mo ; ils sont des variantes/extraits de la même production, pas quatre références clients nouvelles.

Les URL directes, posters, sources, rôles et localisations sont dans le JSON. Les MP4 stables lourds nécessitent une préparation locale ou un chargement au clic pour la V1 ; leur présence dans l'inventaire ne signifie pas qu'ils sont adaptés à un préchargement automatique.

## Joaillerie : au moins deux références photographiques distinctes

Les couvertures suivantes sont publiées sous le nom de Zaid et vérifiées HTTP 200. Elles peuvent soutenir une sélection photo, en précisant le format :

1. [Luscious Bracelets photoshoot](https://www.behance.net/gallery/118227397/Luscious-Bracelets-photoshoot) — `zaid-wazzan-behance-118227397`.
2. [AlSukhon Jewelry](https://www.behance.net/gallery/116879129/AlSukhon-Jewelry) — `zaid-wazzan-behance-116879129`.
3. [Signee Jewelry shoot 3](https://www.behance.net/gallery/118225965/Signee-Jewelry-shoot-3) — `zaid-wazzan-behance-118225965`, plus shoots 1 et 2.

Les cinq séries correspondent à trois noms de marques, pas cinq clients uniques démontrés. Les couvertures max_808 sont les tailles réellement exposées dans les srcset ; aucune galerie haute définition n'a été inventée. Un shoot situé à W Amman pour 30SUNDAYS ne fait pas automatiquement de W Amman un client.

## Attribution et géographie

- Les projets sont les travaux antérieurs des créateurs et de leurs structures : Dumont Films, Sanctuary Creative, Creatum Media, Last Meridian Films. Ne pas les présenter comme des commandes UNMISSABL.
- Samuel : attribution publique à Sanctuary ; rôle individuel par film absent. Ce contexte est présent dans chaque fiche.
- Dumont : tous les crédits originaux disponibles sont conservés. Ookpik World nomme Yoan Sun Dubord à la réalisation/FPV ; l'association personnelle à Chuck n'est pas démontrée. Arc'teryx est explicitement photographie et blogue.
- Creatum : `Personal Project` conservé pour Ferrari. Les légendes Ferrari Challenge, Porsche Sprint et 24H Series peuvent décrire l'événement ou l'équipe ; aucun contrat direct constructeur n'est inventé.
- Pescosta : le titre/client indique un chalet, mais la description évoque une île atlantique et les assets s'appellent `madeira-1/2`. Le conflit reste signalé ; pas de point carte.
- Bahri/Socotra : le nom de fichier seul était insuffisant. La page [Socotra — The Grade](https://bahrinajm.com/shop-socotra.html) nomme explicitement son film, reprend exactement le hero et publie les coordonnées Socotra. Ce lien complémentaire établit le lieu pour la carte.
- Les points représentent des villes/régions de productions, jamais la localisation en temps réel ou la disponibilité. Les coordonnées des autres fiches sont des points de repérage approximatifs, pas des lieux de prise de vue GPS vérifiés.
- Aucune base actuelle n'est déduite d'un lieu de campagne. Laura : métadonnée du 12/10 « Dubai - Filmmaker I Laura » ; conserver ce changement par rapport au relevé antérieur Dubaï/Paris.

## Liens Adobe et tests réalisés

Les 86 lecteurs Adobe publics ont été consultés. Le HTML fournit `mp4URL` et `posterframe` avec jeton signé et date d'expiration. Ces liens sont enregistrés comme trace de source ; la date ISO d'expiration est notée dans chaque fiche. **Pour une intégration durable, utiliser l'embed stable ou copier les médias autorisés avant expiration ; ne pas figer le CDN signé dans une page publiée.** Aucun jeton privé ou identifiant de compte n'a été utilisé : il s'agit des URLs du lecteur public.

Contrôles :
- 113 URLs stables (24 vidéos + 89 posters/couvertures) : HEAD 200, aucune erreur.
- Quatre extraits Socotra supplémentaires et le MOV Dumont : HEAD 200.
- WebM Socotra : HEAD 200.
- 86 lecteurs Adobe : HTML public lu, MP4 et poster extraits. Lecture complète/non-régression navigateur non effectuée par cet agent.
- JSON : identifiants uniques, champs autorisés, champs obligatoires et secteurs contrôlés. Aucun changement dans `src/` ou `public/`.

## Instagram : relevé complémentaire, pas de vues extrapolées

Métadonnées publiques du 12 octobre 2026 : Orie 25K ; Marceau 5 295 ; Laura 14K ; Keoni principal 39K ; Keoni professionnel 4 462. Valeurs de plateformes avec arrondis/cache possibles, pas un total annuel ni une audience unique. Les deux comptes Keoni correspondent à la même personne. Aucune nouvelle série de vues de Reels homogène n'a été vérifiée.
