# Proposition commerciale locale

Le modèle `/fr/proposal/` (anglais : `/en/proposal/`) permet d’adapter client, interlocuteur, objectif, lieux, période, validité, livrables, quantités, prix HT, TVA, droits et conditions. Il est destiné à l’équipe commerciale et doit rester `noindex`. Aucun mécanisme d’authentification n’est inclus : ne pas présenter une page non indexée comme confidentielle.

Les modèles hôtel, golf, resort, automobile et haras fournissent uniquement des suggestions de livrables. Ils ne fixent aucun prix, aucune quantité de contenu garantie, aucune disponibilité ni remise. Tous les prix sont laissés vides. Une ligne incomplète affiche « À chiffrer ». Une TVA non renseignée ne produit pas de total TTC et ne signifie pas une exonération.

## Préparer une proposition

1. Choisir un modèle puis « Appliquer le modèle ». Cette action remplace l’objectif et les lignes, comme indiqué près de la commande.
2. Renseigner le prospect, la période et le périmètre ; adapter les droits et exclusions au projet réel.
3. Saisir les quantités et prix. Les montants sont calculés en centimes et la TVA arrondie au centime sur le sous-total.
4. Cliquer « Imprimer / enregistrer en PDF », choisir A4 et désactiver les en-têtes/pieds de page du navigateur pour un document propre. Le formulaire et la navigation ne sont pas imprimés.
5. Facultativement enregistrer le brouillon JSON et le réouvrir ultérieurement dans la même langue.

Il n’y a ni envoi réseau, ni stockage automatique, ni donnée client placée dans l’URL. L’import est limité à 100 Ko et 15 lignes, vérifie le schéma et ignore les propriétés supplémentaires. Les textes sont injectés via `textContent`, jamais comme HTML.

Le pied de proposition indique « Document de travail — à valider » et précise que le devis final doit confirmer périmètre, disponibilités, droits, fiscalité et montants. Ce modèle ne remplace pas les mentions légales de l’entreprise ni un contrat final validé.

## Préremplir le secteur

Les liens peuvent utiliser `?sector=hotel`, `golf`, `resort`, `automotive` ou `equestrian`. Les alias `hospitality`, `hotels`, `hotellerie`, `haras`, `automobile` et `resorts` sont acceptés. Aucun nom client ni autre donnée personnelle ne doit être prérempli par URL.

## Validation

`node --experimental-strip-types --test tests/proposal.test.mjs` vérifie la précision monétaire, l’absence de conversion d’un prix manquant en gratuité, les arrondis de TVA, les fichiers invalides, les limites et les deux langues. Le rendu navigateur, les sauts de page PDF et la navigation clavier doivent être contrôlés dans l’intégration finale.
