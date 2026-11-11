# Trois propositions d'ouverture — 12 octobre 2026

Les montages réunissent des extraits réels des portfolios du collectif. Ils présentent les références des talents et de leurs structures de production, sans attribuer les commandes d'origine à UNMISSABL.

| Proposition | Intention | Durée | Format ordinateur | Format mobile |
| --- | --- | --- | --- | --- |
| Signature | Recommandation pour l'accueil : hospitalité, automobile, art de vivre, outdoor et voyage. Alternance de gestes précis et de plans ouverts. | 16,5 s | 1920 × 1080 | 810 × 1080 |
| Destinations | Une sélection plus immersive de paysages, de villes et d'expériences. | 19 s | 1920 × 1080 | 810 × 1080 |
| Marques en mouvement | Un montage plus publicitaire : produits, sport, cocktails, conduite et événements. Un plan Porsche Singer vertical remplace le premier plan automobile sur mobile. | 14,75 s | 1920 × 1080 | 810 × 1080 |

## Sélection et qualité

- Sources publiques de Rayan Claverol, Robin Chills, Sanctuary Creative, Creatum Media / Duarte, Tom Pacelli, Dumont Films et Bahri Najm / Last Meridian Films.
- Les sources paysage retenues sont nativement en 1920 × 1080 ou en 3840 × 2160. La source Porsche Singer est nativement en 1080 × 1920.
- Exports H.264, CRF 19, preset slow, 24 images par seconde, sans piste audio, avec `faststart`. Aucun plafond artificiel de débit, aucun agrandissement, aucune modification des couleurs.
- Les variantes mobiles sont recadrées plan par plan. Le format 3:4 préserve les détails réels des sources paysage ; il évite d'agrandir artificiellement des plans 1080p en 1080 × 1920.
- Les petits reels Tom Pacelli de 720p et le Ferrari Madeira en 1080p avec bandes noires ont été écartés des montages d'accueil. Le premier imposerait un agrandissement ; le second demanderait de recadrer puis d'agrandir pour remplir un écran 16:9.
- Le film Etihad MOV, très lourd, n'a pas été téléchargé au-delà de la limite de travail définie. Sa source reste documentée dans la bibliothèque.
- Les copies intégrales téléchargées restent dans le cache temporaire. Le site utilise uniquement les six montages, leurs posters et les aperçus documentés séparément.

## Crédits et emplacements

Les showreels sont composites. Une image reconnaissable ne crée pas automatiquement un projet client ou une localisation sur la carte. Les sources et rôles exacts restent ceux des portfolios : Sanctuary Creative et Dumont Films sont crédités comme structures collectives lorsque le rôle individuel par extrait n'est pas documenté.

`reels-provenance.json` conserve les sources, leurs empreintes SHA-256, les dimensions d'origine, les points d'entrée et de sortie, le recadrage mobile, les poids et les contrôles de chaque export. La source publique HLS du plan Porsche Singer est reliée à `catalogue-preview-provenance.json`.

Les crédits affichables sont centralisés dans `src/data/reels.json`. Le script reproductible est `scripts/prepare-reels.py`.

## Vérifications réalisées

- Planche de douze images de chaque source principale avant sélection ; inspection de plans supplémentaires du showreel Dumont.
- Inspection de la planche de chaque montage final, sur ordinateur et dans son recadrage mobile. Ajustement du plan de terrasse Signature et du cadrage du plongeur Destinations après cette inspection.
- Décodage intégral des six exports sans erreur ; dimensions exactes, absence de piste audio et position de l'atome `moov` avant `mdat` vérifiées.
- Posters WebP extraits du montage à 0,5 seconde, qualité 90, largeur 1920 pixels.

Ces contrôles concernent les fichiers livrés. Les tests de chargement, de lecture automatique et de transition avec le loader sont effectués dans le site par le travail d'intégration.
