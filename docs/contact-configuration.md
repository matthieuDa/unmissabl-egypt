# Contact : fonctionnement et configuration

Le site utilise un vrai POST `/api/contact`. Le message est validé côté serveur puis envoyé via Resend. Le serveur confirme l’acceptation du message par le fournisseur ; une vérification de la réception effective en boîte mail reste nécessaire après configuration et autorisation de publication.

Aucun compte, domaine, secret ou service cloud n’a été créé ou modifié. Aucun email de test n’a été envoyé. Le site ChatGPT actuellement publié est statique : cette fonction Netlify ne sera pas exécutée par un simple téléchargement de `dist/` vers ChatGPT Sites. Pour cette PR, la cible préparée est Netlify, déjà présent dans le dépôt. Une autre plateforme doit disposer de son adaptateur serveur avant activation du formulaire.

## Aperçu local réellement testable

1. Avec Node 24, installer les dépendances avec `npm ci`, puis construire le site avec `npm run build`.
2. Lancer `npm run preview:commercial`. Port par défaut 4322 ; variable `PORT` disponible.
3. Ouvrir `http://127.0.0.1:4322/fr/contact/` ou `/en/contact/`.
4. Envoyer un brief fictif. Le fichier est enregistré dans `.local/contacts/<reference>.json`, hors de `dist/`, avec permissions restreintes. La réponse mentionne explicitement qu’aucun email n’est envoyé.
5. Supprimer les briefs fictifs après les tests. Ne jamais utiliser de coordonnées de prospects réels pour une démo.

Ce serveur écoute uniquement l’interface locale. Il accepte huit tentatives par minute et rejette les requêtes provenant d’une autre origine. La capture locale est injectée uniquement par ce serveur ; l’adaptateur Netlify ne peut pas passer en mode capture par une simple variable d’environnement.

`astro dev` seul sert l’interface, mais pas la fonction Netlify. Utiliser ce serveur pour valider le parcours complet localement, ou Netlify Dev avec les variables appropriées.

## Variables à renseigner après validation

| Variable | Portée | Valeur attendue |
|---|---|---|
| `PUBLIC_TURNSTILE_SITE_KEY` | Build, publique | Clé du widget Turnstile pour les domaines autorisés. Reconstruire après modification. |
| `TURNSTILE_SECRET_KEY` | Fonction, secrète | Secret du même widget ; jamais dans une variable `PUBLIC_*`. |
| `RESEND_API_KEY` | Fonction, secrète | Clé autorisée à envoyer avec le domaine expéditeur vérifié. |
| `CONTACT_FROM_EMAIL` | Fonction | Expéditeur autorisé, par exemple `Unmissabl <contact@unmissabl.com>` après création et vérification de cette adresse/domaine. |
| `CONTACT_TO_EMAIL` | Fonction | Boîte réellement surveillée par Matthieu ; plusieurs destinataires séparés par virgule si nécessaire. |
| `CONTACT_ALLOWED_ORIGINS` | Fonction | Origines HTTPS exactes, sans slash final, séparées par virgule ; par exemple `https://unmissabl.com,https://www.unmissabl.com`. |

Ne pas utiliser les clés de test Turnstile dans le contexte de production. Ne pas définir ces secrets dans Git, dans une URL ou dans les fichiers servis. La clé publique seule n’active pas la réception : toutes les variables serveur sont requises. Une configuration absente produit une erreur explicite 503 et ne confirme aucun envoi.

## Protections incluses

- Validation côté serveur des champs obligatoires, types, longueurs, email et caractères de contrôle ; corps limité à 16 Kio, même sans `Content-Length`.
- Champ leurre invisible aux utilisateurs et retiré de la navigation clavier.
- Liste d’origines explicite ; aucun CORS permissif.
- Validation Turnstile serveur : `success`, hostname autorisé et action exacte `production-brief`. Échec ou indisponibilité = aucun email.
- Limite Netlify au niveau de la fonction : 5 requêtes par fenêtre de 10 minutes, agrégées par domaine et IP. Vérifier l’application de cette règle sur le compte Netlify choisi avant mise en ligne.
- Expéditeur et destinataire imposés par la configuration ; l’email du prospect sert seulement à `Reply-To`.
- Message texte brut, sans injection HTML ; sujet nettoyé des retours de ligne.
- Délais limites des appels externes ; erreurs présentées sans perdre la saisie ; widget réinitialisé après chaque tentative.
- Clé d’idempotence Resend dérivée du contenu et de l’identifiant de saisie pour limiter les doublons lors d’une reprise. Pas de confirmation de réussite si le fournisseur rejette la requête.
- Aucun corps de brief, adresse IP ou secret dans les logs applicatifs. Pas d’email automatique au prospect, afin de ne pas transformer le formulaire en service d’envoi vers des tiers.

## Réception et confidentialité avant activation

Configurer et vérifier le domaine expéditeur dans Resend, sa boîte de réception et les enregistrements DNS demandés par ce fournisseur. Créer le widget Turnstile et limiter ses hostnames à ceux réellement utilisés. Configurer les variables serveur dans le contexte Netlify voulu ; réserver des clés et une boîte de test pour les previews éventuelles.

Avant publication, compléter la notice de confidentialité avec l’identité et le contact du responsable, la durée de conservation effectivement appliquée, les informations sur les prestataires et l’exercice des droits. La version locale ne prétend pas que ces paramètres sont finalisés. Après autorisation de déploiement, envoyer un brief fictif et vérifier réception, Reply-To, échec fournisseur, anti-spam, rate limit et absence d’erreur console. Une acceptation de l’API email ne remplace pas ce contrôle de boîte mail.

## Sources techniques consultées le 11 novembre 2026

- [Cloudflare — validation serveur](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) : le token doit être validé côté serveur, expire après cinq minutes et est destiné à un seul usage.
- [Cloudflare — intégration du widget](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/) : rendu explicite et chargement depuis le script officiel.
- [Resend — API d’envoi](https://resend.com/docs/api-reference/emails/send-email) : envoi, destinataire, Reply-To et idempotence.
- [Netlify — fonctions](https://docs.netlify.com/build/functions/api/) : handler Request/Response, chemin personnalisé et règle de rate limiting.
