# UNMISSABL — site international

Site Astro en français et anglais : références du collectif, destinations, parcours sectoriels, contact et modèle de proposition commerciale imprimable. Cette livraison reste locale et en pull request. **Aucun déploiement en production n’a été effectué.**

## Origine des sources

La base globale v8 a été récupérée depuis la version Sites `c2f3a5509b96789eb10201f16fa7dad37b8b5fae`. La branche `main` du dépôt contenait encore l’ancienne landing Égypte : cet écart explique le volume du diff. Les sources de cette version sont dans `src/` ; `dist/` contient uniquement le résultat généré et ne doit pas être modifié à la main.

## Installation et vérification

Utiliser **Node.js 24** et npm, avec le `package-lock.json` du dépôt.

```sh
npm ci
npm run check
npm run build
npm run validate
npm test
npm run preview:commercial
```

L’aperçu complet est disponible sur [http://127.0.0.1:4322/fr/](http://127.0.0.1:4322/fr/) et [http://127.0.0.1:4322/en/](http://127.0.0.1:4322/en/). Le port peut être changé avec `PORT=4323 npm run preview:commercial`. Reconstruire après modification des sources pour actualiser cet aperçu.

`npm run check` vérifie Astro et TypeScript ; `npm run validate` contrôle les contenus et leurs relations ; `npm test` exécute les tests fonctionnels, dont un serveur HTTP local temporaire. Le serveur de développement `npm run dev` permet de travailler sur l’interface, mais ne fournit pas seul l’API de contact. Les contrôles visuels, clavier et PDF complètent ces commandes.

## Parcours commerciaux

- Pages de prospection : `/fr/solutions/` et `/en/solutions/`, avec variantes `hotels`, `golf`, `resorts`, `automotive` et `equestrian`.
- Destinations : Égypte, fenêtres d’octobre et décembre 2026 ; France — Côte d’Azur, printemps 2027. Octobre est identifié comme une fenêtre passée, sans affirmer qu’une production a eu lieu. L’Islande a été retirée.
- Proposition personnalisable : `/fr/proposal/` et `/en/proposal/`. Renseigner les montants et le périmètre, puis utiliser « Imprimer / enregistrer en PDF ». Aucun prix manquant n’est présenté comme gratuit.
- Formulaire : `/fr/contact/` et `/en/contact/`, également intégré aux pages commerciales avec leur contexte.

Voir [les parcours de prospection](docs/commercial-landings.md) et [le fonctionnement des propositions](docs/proposal-template.md). Les propositions ne sont pas indexées, mais ne sont pas protégées par une authentification. Les brouillons sont exportés volontairement en JSON ; aucun envoi au prospect n’est automatique.

## Contact local et réception réelle

Dans l’aperçu local, un vrai POST `/api/contact` valide le brief et l’enregistre dans **`.local/contacts/`**, hors des fichiers publics, avec permissions restreintes. Ce dossier est ignoré par Git. La confirmation indique clairement qu’aucun email n’est envoyé. Utiliser des coordonnées fictives et supprimer les captures après vérification. Aucune clé n’est nécessaire pour ce parcours local.

La réception réelle est préparée dans une fonction Netlify : validation serveur, champ leurre, contrôle d’origine, vérification Cloudflare Turnstile et envoi via Resend. Les tentatives sont limitées et les reprises d’envoi utilisent une clé d’idempotence. Une configuration incomplète ou une erreur fournisseur ne produit aucune fausse confirmation de succès.

### Configuration manuelle avant activation

Le fichier [.env.example](.env.example) liste les six variables requises. Les renseigner dans le contexte d’hébergement autorisé ; ne jamais committer de clés.

| Variable | Usage |
|---|---|
| `PUBLIC_TURNSTILE_SITE_KEY` | Clé publique intégrée au build ; reconstruire après modification. |
| `TURNSTILE_SECRET_KEY` | Secret du même widget, réservé à la fonction. |
| `RESEND_API_KEY` | Clé d’envoi Resend, réservée à la fonction. |
| `CONTACT_FROM_EMAIL` | Expéditeur autorisé sur un domaine vérifié. |
| `CONTACT_TO_EMAIL` | Boîte de réception réellement surveillée. |
| `CONTACT_ALLOWED_ORIGINS` | Origines HTTPS exactes, séparées par des virgules, sans slash final. |

Le fichier `netlify.toml` prépare Node 24, `npm run build`, la publication de `dist/` et les fonctions de `netlify/functions/`. Après validation de la publication : configurer le widget Turnstile et ses domaines, vérifier le domaine expéditeur Resend, renseigner les variables, compléter les informations légales et de confidentialité, puis contrôler la réception effective d’un brief fictif et les protections anti-spam. Aucune de ces configurations cloud n’a été effectuée dans cette livraison.

**ChatGPT Sites sert le site statique actuel et n’exécute pas cette fonction Netlify.** Envoyer seulement `dist/` sur cette plateforme ne rendrait pas le formulaire opérationnel. Toute autre cible nécessite un adaptateur serveur avant activation.

La procédure détaillée et les sources techniques figurent dans [la configuration du contact](docs/contact-configuration.md).

## Structure et contenus

- `src/components/` : interface, lecteurs, formulaire et proposition.
- `src/data/` : projets, talents, secteurs, destinations, médias et données commerciales.
- `src/i18n/` : textes français et anglais ; langues et réglages communs dans `src/data/site.ts`.
- `public/` : fichiers servis ; `docs/research/` : provenance des médias et recherches.
- `server/` et `netlify/functions/` : traitement du contact et adaptateur d’hébergement.
- `scripts/`, `tests/` : validation, aperçu et tests.

Les références antérieures restent attribuées aux talents et ne doivent pas être présentées comme des productions réalisées par Unmissabl. Conserver les sources, crédits et périmètres des chiffres lors de toute modification. Les conditions, disponibilités, droits et montants de chaque proposition doivent être validés avant transmission au prospect.
