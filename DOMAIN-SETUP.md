# UNMISSABL — raccordement du domaine (déploiement OpenAI Sites historique)

Ce fichier documente le déploiement OpenAI Sites précédent. Pour le déploiement GitHub/Netlify, connecter le dépôt dans Netlify et appliquer les enregistrements DNS affichés dans les réglages de domaine Netlify.

La landing est déployée à https://unmissabl-egypt.hjrf68hwnt.chatgpt.site.
L'accès est actuellement privé. Son ouverture publique attend la confirmation de Matthieu.

Les domaines `unmissabl.com` et `www.unmissabl.com` sont enregistrés côté hébergement, avec validation DNS en attente. Les valeurs ci-dessous ont été retournées par l'hébergeur le 21 septembre 2026. Vérifier de nouveau le statut avant d'appliquer des modifications ultérieures.

## À appliquer chez le gestionnaire DNS

Remplacer uniquement les quatre anciens enregistrements A Squarespace de la racine (`198.49.23.144`, `198.49.23.145`, `198.185.159.144`, `198.185.159.145`) par les deux nouveaux A ci-dessous. Remplacer le CNAME de `www` par la cible fournie. Préserver les autres enregistrements, notamment toute configuration mail, et ne pas changer les serveurs de noms.

| Type | Nom / hôte | Valeur |
| --- | --- | --- |
| A | @ | 162.159.143.30 |
| A | @ | 172.66.3.26 |
| CNAME | www | custom-domains.chatgpt.site. |
| TXT | _openai-site-verification | openai-site-verification=g6_-NuFWSGkWKlyYzCLh4cF-WN9I0eUQqxm-bz5hDco |
| TXT | _cf-custom-hostname | 33c9d8e1-a536-4ec3-9907-1cd3f0199422 |
| TXT | _openai-site-verification.www | openai-site-verification=83apDUw1cWBOdIOKBGFE6Kt5IpqmiTWvueaVBy4x1d0 |
| TXT | _cf-custom-hostname.www | d85b19d4-9788-4c0f-812e-e235b082272b |

Si le fournisseur demande un nom complet, ajouter `.unmissabl.com` aux noms relatifs. Ne pas ajouter ce suffixe deux fois. Utiliser le TTL par défaut.

## Vérification finale

Après propagation, actualiser le statut des deux domaines dans l'hébergement ; attendre la validation du domaine et du certificat SSL, puis ouvrir les deux adresses dans une session sans authentification et vérifier accueil, images et contact. La demande de rendez-vous prépare un email ; elle ne confirme pas automatiquement un créneau.
