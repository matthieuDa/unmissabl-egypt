# Hébergement et domaine

Cette branche ne change aucun domaine et ne publie pas le site. Le site global actuellement hébergé par ChatGPT Sites reste inchangé.

Le dépôt prépare un site statique Astro accompagné d’une fonction Netlify pour le contact. Avant toute publication autorisée, suivre [la configuration du contact](docs/contact-configuration.md), puis vérifier le domaine cible et ses réglages directement auprès de l’hébergeur retenu. Les anciens paramètres DNS de la landing Égypte ne sont pas réutilisés.

Après validation de la mise en ligne :

1. Vérifier l’hébergement choisi, ses domaines HTTPS et les variables de contact.
2. Mettre à jour `src/data/site.ts` : URL canonique, adresse de contact et mode `demo`. Le mode actuel laisse les pages non indexables.
3. Compléter les mentions de confidentialité et les informations de l’entreprise.
4. Configurer uniquement les enregistrements DNS réellement demandés par l’hébergeur retenu ; préserver les enregistrements mail existants.
5. Contrôler les deux langues, les liens, les vidéos et la réception réelle d’un brief fictif sur le domaine final.

Une pull request ou un build local ne vaut pas autorisation de déploiement.
