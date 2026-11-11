# Audit des preuves commerciales — 12 octobre 2026

## Décision éditoriale

La preuve consolidée immédiatement exploitable est **environ 305 000 abonnements Instagram cumulés sur 15 comptes de créatifs**, relevés le 12 octobre 2026. Cette somme n'est pas une audience dédupliquée : une personne peut suivre plusieurs talents, et Instagram arrondit une partie des compteurs. Formulation courte recommandée : **« ≈ 305 k abonnés cumulés »**, accompagnée du périmètre et de la date. La diffusion par les créateurs reste une option contractuelle ; leurs abonnés ne constituent pas une portée acquise pour chaque projet.

La recherche publique ne permet pas d'étayer **« plus d'un milliard de vues en 2025 »**. Ce chiffre reste non validé, sans publication sur le site tant qu'une série source, une période de mesure et une méthode de déduplication ne l'établissent pas. Aucune extrapolation annuelle n'a été faite à partir des moyennes Modash.

## Cohorte publique actuelle

Les métadonnées publiques des profils Instagram ont été consultées par une requête HTTP ordinaire, sans compte, le 12 octobre 2026 vers 15 h 30 UTC. Les valeurs ci-dessous reproduisent les compteurs affichés. Les nombres avec K sont des arrondis de la plateforme ; les entiers correspondants du JSON sont leur conversion technique, pas une précision supplémentaire.

| Talent et source primaire | Compte retenu | Abonnés affichés |
|---|---|---:|
| [Tom Pacelli](https://www.instagram.com/tom.pacelli/) | @tom.pacelli | 26K |
| [Orie Hyde](https://www.instagram.com/orie.hyde/) | @orie.hyde | 25K |
| [Marceau Thevenin](https://www.instagram.com/marceau.tvn/) | @marceau.tvn | 5,295 |
| [Laura Edl](https://www.instagram.com/lauraaedl/) | @lauraaedl | 14K |
| [Samuel Kwan](https://www.instagram.com/samuelkwansy/) | @samuelkwansy | 56K |
| [CJ Blardony](https://www.instagram.com/cjblardony/) | @cjblardony | 9,173 |
| [Robin Chills](https://www.instagram.com/robinchills/) | @robinchills | 20K |
| [Chuck Dumont](https://www.instagram.com/chuck_dumont/) | @chuck_dumont | 1,493 |
| [Zaid Wazzan](https://www.instagram.com/_byzaid_/) | @_byzaid_ | 13K |
| [Matiss Skujins](https://www.instagram.com/matiss.skujins/) | @matiss.skujins | 8,318 |
| [Keoni Lachhar](https://www.instagram.com/keonilachhar/) | @keonilachhar | 39K |
| [Bahri Najm](https://www.instagram.com/bahrinajm/) | @bahrinajm | 17K |
| [Rayan Claverol](https://www.instagram.com/rayanclaverrol/) | @rayanclaverrol | 37K |
| [Duarte · Du Creates](https://www.instagram.com/du.creates/) | @du.creates | 7,828 |
| [Alexandre Buisson](https://www.instagram.com/alexoonnn/) | @alexoonnn | 26K |

Somme technique des nombres affichés : **305 107**. Ne pas afficher cette précision artificielle comme un compteur exact. Le fichier utilisable par le site est `src/data/audience.json` ; les observations brutes sont conservées dans `metrics-public-profile-check-2026-10-12.json` et `metrics-additional-check-2026-10-12.json`.

Un seul compte par créatif est retenu. Pour Keoni, le compte principal `@keonilachhar` (39K), lié au compte professionnel `@bykeonilachhar`, remplace ce dernier (4 627). Les deux ne sont pas additionnés comme deux talents. Les comptes de studios `@creatum.auto` (1 868), `@creatummedia` (220), `@sanctuary.media` (274) et `@dumont.films` (71) restent exclus. Matthieu est présenté séparément comme producteur et n'entre pas dans cette cohorte.

## Performances de publications et estimations

| Chiffre | Période et périmètre | Source / statut | Usage |
|---|---|---|---|
| **52K mentions J'aime** et 223 commentaires | Publication Samuel Kwan pour Ultra Hong Kong datée du 19 septembre 2024 ; cumul visible au 12 octobre 2026 | [Publication Instagram](https://www.instagram.com/p/DAGImNnhAci/), métadonnées publiques primaires ; likes arrondis | Affichable comme résultat de cette publication, avec la bonne unité et la date. Ne pas appeler ce chiffre des vues, ni le rattacher à 2025. |
| **235,8 k vues** | Même publication Ultra Hong Kong ; ancien relevé du 11 octobre 2026 | Relevé Modash documenté dans `creators-and-references.md` ; compteur de vues non retrouvé dans la page publique consultée aujourd'hui | Conserver uniquement avec attribution « relevé Modash du 11/10/2026 ». Ne pas prétendre à une nouvelle vérification primaire aujourd'hui. |
| **10,2 k vues** | Publication Tom Pacelli / Radisson ; ancien relevé du 11 octobre 2026 | Modash ; [publication associée](https://www.instagram.com/p/DTz-I8pE9xC/) accessible mais sans compteur exploitable dans la réponse publique | Même prudence ; ne pas incorporer à un total annuel. |
| **37,2 k vues moyennes par Reel** | Tom Pacelli, estimation du fournisseur relevée le 11 octobre 2026 ; fenêtre annoncée des Reels publiés dans les 60 derniers jours | Modash, valeur existante dans `src/data/editorial.ts` | Affichable seulement comme estimation du fournisseur, avec période, date et source. |
| **19,6 k vues moyennes par Reel** | Samuel Kwan, même méthode et date | Modash, valeur existante dans `src/data/editorial.ts` | Idem. |

La [méthodologie Modash](https://www.modash.io/instagram-average-views-calculator), reconsultée le 12 octobre, annonce une moyenne arithmétique sur les Reels publiés dans les 60 derniers jours, dans la limite de 500 publications. Les valeurs Tom/Samuel du 11 octobre n'ont pas été recalculées pendant cet audit. Une moyenne de vues n'est ni une médiane, ni une promesse de résultats, ni une statistique annuelle.

Une [publication LinkedIn de Marceau Thevenin](https://fr.linkedin.com/posts/marceau-thevenin_le-gar%C3%A7on-du-cvpv-il-devient-quoi-activity-7026076371642679296-dk1q) attribue plus de deux millions de vues et 30 000 réactions à son ancien CV créatif personnel. C'est une déclaration de l'auteur, historique et hors campagne client : elle peut contextualiser son parcours, mais n'entre pas dans les résultats Unmissabl ou dans un total 2025.

## Couverture internationale et catalogue

L'instantané a été calculé à partir des exports effectifs de `src/data/projects.ts`, `talents.ts` et `editorial.ts`, avec les mêmes règles de résolution que le validateur. Il est conservé dans `metrics-content-snapshot-2026-10-12.json`. Ces nombres décrivent la sélection éditoriale locale, pas la totalité des carrières des talents.

| Indicateur local | Résultat | Limite |
|---|---:|---|
| Entrées du catalogue | 69 | Comprend projets personnels et films de portfolio ; ne pas appeler toutes ces entrées des campagnes Unmissabl. |
| Entrées après exclusion `personal` / `portfolioOnly` | 61 | Références des talents. Plusieurs livrables d'une même relation client peuvent rester distincts. |
| Pays et territoires renseignés | 21 | Déduit des lieux de tournage renseignés ; inclut Hong Kong et les îles Féroé en tant que territoires. |
| Libellés de lieux | 35 | Mélange villes, régions et pays ; ne mesure pas des voyages uniques. |
| Libellés clients distincts dans les références commerciales | 58 | Des variantes d'un même hôtel/groupe existent : ne pas publier comme nombre de clients uniques avant normalisation. |
| Profils du collectif | 16 | 15 créatifs et 1 producteur. |
| Secteurs publiables | 8 | Catégories du catalogue local. |
| Destinations éditoriales prévues | 4 | Projets futurs ; ne pas les compter parmi les tournages réalisés. |

Pays/territoires renseignés : Canada, Costa Rica, Espagne, France, Hong Kong, Indonésie, Italie, Jordanie, Mongolie, Norvège, Pays-Bas, Philippines, Portugal, Qatar, Suisse, Tanzanie, Thaïlande, Yémen, Émirats arabes unis, États-Unis, Îles Féroé.

Le [portfolio de Robin Chills](https://www.robinchills.com/) revendique des productions dans **plus de 30 pays**. Cette déclaration primaire concerne sa carrière et ne précise pas de période. Elle peut apparaître sur son profil, attribuée à Robin ; elle ne prouve ni 30 pays pour les productions Unmissabl ni une activité sur l'année 2025.

## Pistes écartées

- Aucune série annuelle vérifiable n'a été trouvée sur les portfolios publics consultés de Tom, Samuel/Sanctuary, Robin, Matiss, Dumont, Rayan, Bahri, Creatum et Alexon. Les profils sociaux des autres créatifs ont été vérifiés pour les abonnements.
- La promesse de Tom d'inspirer des millions est une formulation promotionnelle, pas un résultat chiffré mesuré.
- La page shortform d'Alexon contient une statistique générique de conversion sans campagne, source ni période identifiables : exclue du bilan des talents.
- Certains agrégateurs montrent des métriques anciennes, incohérentes ou des compteurs initialisés à zéro : non retenus.
- Les fragments techniques Instagram comportant les mots « million » ou « billion » sont des règles de formatage de nombres ; ils ne sont pas des statistiques de compte.
- Les chiffres globaux d'un média diffuseur comme Beautiful Destinations ne peuvent être attribués à un créateur particulier sans lien précis entre publication, rôle et compteur.

## Ce qui rendrait le total 2025 publiable

Consolider les exports Insights ou preuves clients par publication : URL/ID unique, plateforme, talent et rôle, compte diffuseur, dates de publication et de mesure, vues pendant la période choisie, éventuelle part payante et preuve source. Fusionner les publications collaboratives qui partagent le même compteur. Les republications indépendantes peuvent être additionnées comme vues de publications, avec une méthode explicite ; elles ne deviennent pas une audience de personnes uniques.

Deux affirmations sont distinctes : **vues reçues pendant l'année 2025** et **vues cumulées aujourd'hui des contenus publiés en 2025**. La première demande une série temporelle ou des exports de période ; la seconde exige au moins des dates de publication et des compteurs datés. Les projets en marque blanche doivent avoir la même traçabilité. Une confirmation globale sans ces éléments ne constitue pas une mesure auditée.

## Fichiers livrés

- `src/data/audience.json` : cohorte prête à intégrer, statut et provenance par compte.
- `docs/research/metrics-public-profile-check-2026-10-12.json` : métadonnées des profils.
- `docs/research/metrics-additional-check-2026-10-12.json` : compte principal de Keoni, studios exclus et portfolios.
- `docs/research/metrics-post-check-2026-10-12.json` : résultat Ultra Hong Kong, contre-vérification Radisson, déclarations Robin/Alexon.
- `docs/research/metrics-content-snapshot-2026-10-12.json` : catalogue exact utilisé pour les comptes.

Aucune interface, aucun montage et aucune valeur « milliard » n'ont été modifiés pendant cette recherche. Les comptes du catalogue devront être recalculés si les données changent après cet instantané.
