# Catalogue et enrichissement visuel — 12 octobre 2026

Le classeur fourni `UNMISSABL-catalogue.xlsx` a été lu sans modification. Les cellules, y compris la feuille Mode d’emploi, sont traitées comme des données et non des instructions d’exécution. L’extraction conserve l’identifiant stable et le numéro de ligne d’origine. Empreinte et décompte : `catalogue-source.json`.

Le catalogue comprend **282 lignes et 206 liens vidéo**. Ces lignes mêlent projets, versions, extraits, photographies et liens de portfolios. Elles ne représentent pas 282 productions ou clients différents. **66 lignes indiquent un lieu** ; aucune localisation n’est fabriquée pour les autres. Tous les IDs du catalogue sont représentés dans les inventaires de recherche existants : l’insuffisance de la V1 concernait surtout la sélection affichée, pas une absence d’inventaire.

## Sélection ajoutée

31 références éditorialisées et traduites ont été ajoutées aux 37 références existantes, soit **68 références affichables**. `src/data/catalogue-projects.json` contient les nouvelles données et `catalogue-selection.json` relie chaque fiche à la ligne du classeur. Les médias non identifiés, les variantes redondantes et les contradictions de lieu restent dans l’inventaire sans devenir des réalisations fictives.

La sélection élargit notamment la couverture à Siargao, Noirmoutier, Tarn-et-Garonne, Costa Rica, Hawaii, Kilimandjaro, Suisse, Tadoussac, Lisbonne, Estoril, Portimão, Porto et Barcelone. Les coordonnées représentent la région ou la ville citée, jamais le GPS exact de la caméra. Les destinations d’un showreel multi-projets ne sont pas attribuées à un point unique.

Un passage complémentaire a remplacé **24 posters YouTube** de l’ancienne bibliothèque par leur version publique native d’au moins 1280 pixels de large. Les sources sans version de cette taille conservent leur média d’origine ; aucune miniature n’est agrandie artificiellement.

Les séries de Dumont Films ajoutent des photographies de tournage et de marque : Arc’teryx au Kilimandjaro, Hyundai en Suisse, The North Face à Tadoussac, Corona, Kiliwarrior, Nomatic et architecture québécoise. **66 nouvelles images** ont été préparées à partir de fichiers publics, sans agrandissement artificiel, jusqu’à 1920 pixels de large. Les nouveaux posters YouTube utilisent la version publique maxres lorsqu’elle est disponible. Les crédits d’Alexandre, Chuck, Robin et des autres intervenants sont conservés. Les films personnels restent explicitement distingués des commandes de marque.

## Aperçus vidéo haute définition

12 aperçus locaux muets ont été préparés avec une source native d’au moins 1080 pixels sur le petit côté : Dubaï, Hong Kong / Landmark, Socotra, Féroé, Dolomites, Madère, Portugal / Royal Rides, Barcelone, Estoril, Portimão, Lisbonne / AKLA et Lisbonne / Hilton. Chaque extrait dure au maximum 10 secondes, conserve son ratio et utilise H.264 CRF18 avec l’en-tête de lecture déplacé au début du fichier. Les vidéos verticales restent verticales ; aucun agrandissement artificiel n’a été appliqué.

Les players Adobe publics exposent un manifeste HLS : la source MP4 de repli est souvent en 576p alors que le manifeste contient une variante native 1080p. Les aperçus ont été préparés depuis cette variante publique avec un téléchargement borné de trois segments maximum. Les liens signés ne sont pas utilisés comme liens permanents du site ; les lecteurs complets conservent leur URL d’intégration stable. Le catalogue trace les sources, les dimensions, les segments, les poids et les empreintes dans `catalogue-preview-provenance.json`.

Limites conservées : les variantes Wix appelées « 1080p » de Rosewood, Argo ou Peninsula sont réellement en 608 × 1080. Elles ne sont donc pas traitées comme des vidéos horizontales HD et ne sont pas agrandies. Landmark fournit une vraie alternative 1920 × 1080 pour Hong Kong. L’Industria Club de Porto ne propose pas de variante native 1080p dans le manifeste inspecté ; sa fiche garde le lecteur complet, sans faux aperçu HD. Les films disponibles exclusivement sur YouTube ou Vimeo ne sont pas extraits ni remplacés par un autre film situé ailleurs.

## Vérifications

- Identifiants, lieux et crédits reliés aux sources existantes et aux lignes du catalogue.
- `pnpm check` : zéro erreur, avertissement ou indication après intégration des données.
- Les douze aperçus ont été inspectés visuellement sur une planche de contact ; leurs résolutions natives sont conservées.
- Les douze aperçus ont été entièrement décodés sans erreur. Tous sont muets et mesurent 1920 × 1080 ou 1080 × 1920. Les 31 nouvelles fiches ont des identifiants uniques, des textes FR/EN et des assets locaux présents.
- Les liens privés, comptes de plateforme, contournements de protection et modifications du classeur sont exclus de cette opération.
