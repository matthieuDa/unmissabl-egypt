# Validation initiale — 11 novembre 2026

Cette première passe précède la correction de l’architecture commerciale. Voir `validation-riviera-2026-11-11.md` pour l’état actuel.

Périmètre : site global récupéré depuis la version v8, nouveaux parcours commerciaux FR/EN, calendrier, contact et proposition. Aucun déploiement ni email externe. Les tests utilisent des données fictives.

## Résultats

- `npm run check` : 46 fichiers Astro, zéro erreur, avertissement ou suggestion.
- `npm run build` : 200 pages HTML générées.
- `npm run validate` : 13 786 contrôles réussis (liens, médias locaux, relations, langues et crédits). L’action `/api/contact` est vérifiée comme fonction serveur, non comme fichier statique.
- `npm test` : 28 tests réussis, y compris un vrai POST HTTP vers un serveur temporaire et l’écriture privée d’un brief. Les tests commerciaux vérifient également les pages construites et le calendrier.
- Détecteur Impeccable exécuté sur les six nouveaux composants/styles principaux : aucun signal retourné.

## Parcours vérifiés dans le navigateur

- Dix variantes sectorielles FR/EN ouvertes : hôtels, golf, resorts, automobile et haras. Titres et textes localisés, références locales, formulaire contextualisé.
- Dimensions contrôlées : 360 × 800, 390 × 844, 820 × 1180 et 1440 × 900. Aucun débordement horizontal du document dans les vues inspectées. Aucun champ sans libellé, image sans attribut alternatif ou image cassée dans ces vues.
- Page hôtellerie et modèle de proposition inspectés visuellement sur mobile ; champs à 16 px pour éviter le zoom automatique de saisie sur iPhone.
- Menu mobile : ouverture, fermeture avec Échap, retour du focus au bouton ; indicateur de focus visible. Champs, commandes et états présents dans l’arbre d’accessibilité.
- Contact hôtel : saisie puis envoi depuis le navigateur. Confirmation locale reçue, fichier enregistré hors des médias publics avec permissions `0600`. Aucun email externe.
- Proposition : trois lignes fictives à 1 000 €, 500 €, 500 €, TVA de 20 % : 2 000 € HT, 400 € de TVA, 2 400 € TTC. Export JSON, réouverture et conservation des valeurs vérifiés dans l’interface. Le changement FR/EN conserve le secteur dans l’URL.
- Contrastes mesurés sur le modèle : texte principal 16,73:1 sur ivoire ; texte d’aide 6,82:1 ; texte du document 18,61:1 sur blanc.
- Commande d’impression déclenchée depuis le bouton. Règles A4, masquage de l’éditeur et de la navigation, répétition de l’en-tête du tableau et protections contre les coupures de lignes inspectés. La boîte d’impression native n’étant pas inspectable par l’outil, aucun PDF témoin ni contrôle des sauts de page du PDF final n’est revendiqué.
- Aucun message d’erreur console remonté pour les pages contrôlées. Les règles de réduction du mouvement existantes sont conservées.

## Limites et contrôle avant mise en ligne

Ces contrôles ne constituent pas une certification WCAG exhaustive ni un test sur un iPhone physique. Vérifier Safari iOS et les coupures de pages PDF sur le navigateur utilisé pour l’envoi des offres.

Les services email et anti-spam ont été testés avec des réponses contrôlées. Le contrôle effectif de Turnstile, du rate limit Netlify et de la boîte de réception reste à effectuer avec la configuration de l’hébergement autorisé. Voir [contact-configuration.md](contact-configuration.md). Les champs, tokens, origines, limites, erreurs fournisseur et absence de configuration sont couverts sans fausse confirmation.

Compléter les informations légales, l’adresse de contact et les conditions commerciales. Les prix de la proposition restent libres ; aucune remise ou disponibilité n’est inventée. Les références golf et haras sont explicitement adjacentes, en attendant des cas sectoriels documentés.

La cible préparée pour le serveur est Netlify. Le site statique actuel sur ChatGPT Sites ne change pas et ne peut pas exécuter ce serveur en recevant seulement `dist/`.
