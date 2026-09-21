# UNMISSABL — Egypt

Landing anglaise pour la production du 16 au 25 octobre 2026. Site statique sans dépendance d'exécution. Tous les médias et polices utilisés dans la page sont servis localement.

## Usage

- `npm start` : aperçu sur http://localhost:3008
- `npm run check` : liens, ancres, fichiers et balisage essentiel
- Source du site : `dist/`
- `scripts/browser-check.mjs` : vérification réelle de trois pages à quatre tailles d'écran ; passer le chemin absolu du module Playwright dans `PLAYWRIGHT_MODULE`.

## Contact

Les boutons conduisent à `contact.html`. Le mode `?intent=call` affiche les préférences de rendez-vous. Le formulaire valide les champs et prépare un email encodé à `dalle.matthieu@gmail.com` dans l'application de messagerie du visiteur. Aucun email envoyé automatiquement, aucun enregistrement de données, aucune réservation automatique. Un lien mail direct et une copie de l'adresse sont disponibles.

## Publication

Projet Sites : `appgprj_6ab15a220b088191bf0b7955ac8f9119`.
Version 1 : commit `b1ce1ee0af29ef36b1edcffa512ef71fd3ce1d1d`.
URL : https://unmissabl-egypt.hjrf68hwnt.chatgpt.site

Les sources validées ont été poussées dans le dépôt d'hébergement. Les accès publics et le raccordement final du domaine restent à finaliser ; voir `DOMAIN-SETUP.md`. Aucune clé d'accès n'est conservée dans le projet.

## Médias et attribution

Les images d'Égypte sont des photographies Unsplash indépendantes, pas des réalisations de l'expédition à venir. Sources et crédits publics dans `dist/credits.html`. Les projets d’Alex proviennent des pages officielles Alexon Media. Les projets de Samuel et cinq logos ont été extraits des deux PDF fournis par Matthieu. Les deux projets de CJ sont explicitement sélectionnés sur bio.site/cjblardony ; les logos Mazda et DJI viennent des sites officiels de ces marques. Les références restent attribuées aux portfolios individuels, et le rôle exact de CJ sur Mazda n’est pas supposé. La sélection comporte six projets visibles et quatre autres dans une section dépliable.
