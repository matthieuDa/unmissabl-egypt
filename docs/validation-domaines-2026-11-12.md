# France — domaines et vignobles, 12 novembre 2026

## Contenu livré

Golf est retiré de la prospection France. Les cinq onglets sont Hôtels & yachting, Automobile, Domaines & villas, Vignobles et Haras, en FR et EN. Les liens directs et le brief conservent l’activité sélectionnée.

- Domaines & villas : véritable visite au drone FPV de Maison de Prépinson, Alexandre Buisson et Tim Ohler. Nouvelle fiche projet, film complet, galerie et crédits. Localisation belge issue du site du domaine, distincte de la Côte d’Azur où la prochaine production est envisagée.
- Vignobles : plans identifiés du Domaine & Distillerie Brillouet dans le film Charentes Tourisme publié au portfolio de Tom Pacelli. Extrait limité à l’alambic, au chai et à la dégustation ; la commande d’origine reste touristique. Aucun survol FPV de vignes confirmé dans le catalogue. La proposition de futur tournage présente le FPV sous réserve des lieux et conditions.
- Aperçus locaux H.264 640/1280/1920, sans audio, sans agrandissement des sources. Les posters et minutages sont documentés dans `research/domaines-vignobles-2026-11-12.json`.

## Vérifications

- Astro : 48 fichiers, zéro erreur, avertissement ou suggestion.
- Build : 194 pages HTML ; 72 projets et 8 secteurs globaux disponibles.
- Validation : 13 273 contrôles réussis. Tests : 30 réussis, dont les deux nouvelles références, retrait de Golf, relations ARIA, langues et POST HTTP local du contact.
- Détecteur Impeccable : aucun signal sur DestinationSectors et BriefForm.
- Navigateur : ordinateur 1440 × 1000 ; mobile 390 × 844 et 360 × 800 ; tablette 820 × 1180. Pas de débordement horizontal. Les cinq onglets restent lisibles ; cibles mobiles de 60 px. La navigation clavier entre les nouveaux onglets fonctionne.
- Lecture réelle confirmée : Maison de Prépinson et Brillouet, `readyState=4`, vidéo active en lecture, panneaux masqués en pause. Le mobile charge la variante 640, la tablette la variante 1280. Hors écran, l’aperçu attend le défilement avant de charger.
- Changement de langue : activité et ancre conservées ; invitation et résumé du brief dans la bonne langue. Le formulaire reprend France — Côte d’Azur / printemps 2027 / activité.
- Extrait Brillouet encodé contrôlé par images à 0,2 seconde : resserrement des coupes pour éliminer les plans de vélo et de restaurant voisins dans le film d’origine.
- HTTP : nouvelles pages et vidéo 200 ; anciens liens `/solutions/golf/` redirigés vers l’invitation France Hôtels.

Contrôles sur le navigateur du poste avec dimensions simulées, pas sur un iPhone physique. Aucun déploiement ni email externe. Les configurations manuelles du contact demeurent celles décrites dans `contact-configuration.md`.
