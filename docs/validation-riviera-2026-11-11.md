# Correction de la prospection — Côte d’Azur

## Architecture corrigée

Les invitations par activité sont sur `/fr/destinations/france/` et `/en/destinations/france/`, pour le printemps 2027. Les pages génériques `/solutions/...` ont été retirées. Les anciens liens de cette prévisualisation sont conservés par redirection interne. La navigation globale renvoie à nouveau vers les références sectorielles.

Quatre onglets : Hôtels & yachting, Automobile, Golf, Haras. Chaque vue associe invitation, idée de tournage, livrables et référence. Le choix est conservé dans l’URL et transmis au formulaire avec France — Côte d’Azur / printemps 2027. Les flèches gauche/droite, Début et Fin parcourent les onglets ; les panneaux inactifs sont masqués. Sans JavaScript, les panneaux sont tous accessibles.

## Preuves visuelles

- SIRO One Za’abeel : vraie suite hôtelière, extrait Matiss Skujins, 5,24 s, 1280 × 720 natif.
- Royal Rides : film automobile de Duarte, référence existante horizontale.
- Duo Curio Collection by Hilton : référence hôtelière explicitement nommée pour le projet séjour/golf ; aucune réalisation golf inventée.
- Haras de Prépinson : film exact retrouvé au portfolio officiel, Alexandre Buisson, tournage réel à Ortho en Belgique. Extrait de 12 s en 640, 1280 et 1920 px ; pas d’agrandissement artificiel. Cadre natif préservé sans bandes noires. Film complet intégré à sa fiche projet via YouTube, crédits humains et galerie de photogrammes.

Sources, crédits originaux et transformations : `docs/research/haras-prepinson-2026-11-11.json` et `siro-reference-2026-11-11.json`. Les noms d’agences restent dans la provenance, pas dans le parcours public.

## Vérifications effectuées

- Contrôle Astro : 48 fichiers, aucune erreur ni avertissement.
- Build : 192 pages HTML. Validation : 13 122 contrôles réussis.
- 29 tests fonctionnels réussis, dont six tests de la nouvelle architecture (retrait des anciennes pages, langues, relations ARIA, liens de contact, références et calendriers).
- Pages FR/EN, fiche du haras, ancien lien commercial et vidéo locale : HTTP 200 vérifiés. L’ancien lien redirige vers le bon onglet France.
- Métadonnées et formats vidéo vérifiés ; posters SIRO et Haras inspectés visuellement. Aperçus adaptatifs réutilisant le lecteur existant, lecture du panneau visible et arrêt des panneaux masqués.
- Détecteur Impeccable exécuté sur les composants modifiés : aucun signal.

Le pilotage du navigateur n’était pas disponible lors de cette correction (« browser.user is unavailable »). Les interactions dans le navigateur et le rendu mobile de cette nouvelle section ne sont donc pas revendiqués comme vérifiés visuellement. L’aperçu local est servi ; cette revue reste à effectuer avant publication, en complément des tests automatisés.

Aucune publication en production ni envoi externe. Les conditions de configuration du formulaire et les limites de vérification PDF de la livraison initiale restent inchangées.
