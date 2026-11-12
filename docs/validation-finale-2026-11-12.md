# Validation finale — 12 novembre 2026

La reprise du navigateur a permis de terminer la vérification du parcours France qui restait en attente dans le rapport précédent.

## Contrôles réalisés dans le navigateur

- France FR/EN : quatre onglets, bon panneau visible, URL partageable et résumé du formulaire mis à jour pour chaque activité.
- Film Haras de Prépinson : lecture automatique confirmée, 1280 × 572 décodé, aucune erreur de lecteur. SIRO, Royal Rides et Hilton également en lecture ; les autres panneaux sont en pause.
- Clavier : navigation avec les flèches, retour au premier onglet avec Début, focus conservé sur l’onglet sélectionné.
- Français vers anglais : activité et ancre conservées ; invitation et formulaire dans la langue choisie.
- Mobile : 360 × 800 et 390 × 844. Les quatre choix sont désormais sur deux lignes, chacun avec une hauteur de 60 px. Aucun choix tronqué ou défilement horizontal de la page.
- Tablette 820 × 1180 : aperçu Golf en lecture, document sans débordement horizontal.
- Ordinateur 1440 × 1000 : film équestre et composition de la page contrôlés. Accueil rechargé : aucune ancienne entrée `/solutions/`, film de fond en lecture et introduction terminée.
- Brief mobile Haras : enregistrement confirmé depuis le formulaire ; référence locale `5c8a8bf9-34f7-46a7-8aaf-a827e641211c`, aucun email externe. La sélection indique France — Côte d’Azur, printemps 2027, Haras.

## Corrections finales

- Les onglets mobiles restent tous visibles au lieu d’une rangée défilante qui tronquait Haras.
- Le texte de mutualisation parle des frais communs de production, adapté au voyage France.
- Impression Safari : aperçu A4 de deux pages contrôlé avec le modèle Hôtel. Une coupure entre un titre et son contenu a été identifiée ; ajout des règles `break-inside` et `page-break-inside` pour les sections et compatibilité Safari des titres/tableaux. Le dialogue natif de sauvegarde n’a pas permis de produire un PDF témoin ; aucun fichier exporté n’est revendiqué. Le modèle reste personnalisable et imprimable depuis `/fr/proposal/` et `/en/proposal/`.

## Vérifications automatisées

- Astro : 48 fichiers, zéro erreur / avertissement.
- Build : 192 pages HTML.
- Validation de contenu : 13 122 contrôles réussis.
- Tests : 29 réussis.
- Détecteur Impeccable sur les trois surfaces modifiées : aucun signal.

Ces vérifications utilisent le navigateur du poste et ses dimensions simulées, pas un iPhone physique ni une certification WCAG exhaustive. Aucun déploiement, changement de domaine ou email externe. Les clés Turnstile/Resend, l’expéditeur, le destinataire, la confidentialité finale et la réception réelle restent les réglages d’activation décrits dans `contact-configuration.md`.
