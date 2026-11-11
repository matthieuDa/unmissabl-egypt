/**
 * Explicit original production credits, never inferred from the filmmaker's name.
 * Sources: matching portfolio records in docs/research/media-inventory-a.json
 * and media-inventory-b.json; Tom's production-house labels rechecked 2026-10-12.
 *
 * Beautiful Destinations (AMEX / Red Sea), Social Cut / Taiga (Puma / Levi's)
 * and Les Coflocs (Volkswagen) are labelled Agency in Tom's source pages.
 * Their agency credits remain in project-copy.ts; they are not relabelled here.
 * Missing keys mean that no separate production credit has been established.
 */
export const productionCredits: Record<string, string> = {
  // https://dumontfilms.ca/projects/elewana-collection — original Production credit.
  'elewana-collection': 'Chuck Dumont, Alexandre Buisson, Benjy, Jules Rapp',

  // The source pages explicitly use "Production House".
  'tom-onefinestay': 'Exordi',
  'tom-charentestourism': 'Les Coflocs',

  // Same film as https://dumontfilms.ca/projects/dji-air-3 (YouTube Efa-hzncDzY).
  'robin-dji-lofoten': 'Benjy, Chuck Dumont, Robin Diederichs, Xavier Barriault',

  // Production references published by Sanctuary Creative, not an individual role claim.
  'samuel-kwan-236bfe8ca0454367b3e2c46b12c59ac3': 'Sanctuary Creative',
  'samuel-kwan-8218e39818084803818865e4ff74b712': 'Sanctuary Creative',
  'samuel-kwan-78dba1769d554fdf8de6d88601739faf': 'Sanctuary Creative',
  'samuel-kwan-76d126f1cdae492f971cf01e0c16764c': 'Sanctuary Creative',
  'samuel-kwan-e69d32ce332f4aecb0c60b70c08ed0a4': 'Sanctuary Creative',
  'samuel-kwan-507de54c49f240b1a7f2d27c44231ab1': 'Sanctuary Creative',
  'samuel-kwan-467cf31c65464fd180f8b2660a3d02d6': 'Sanctuary Creative',
  'samuel-kwan-13f1b1ebf6bd49279b59821517b45d63': 'Sanctuary Creative',

  // Original production structure documented in the Creatum Media project portfolio.
  'duarte-creatum-columbia-1': 'Creatum Media',
  'duarte-creatum-ferrari': 'Creatum Media',
  'duarte-creatum-luxury-chalet-1': 'Creatum Media',
  'duarte-creatum-royal-rides-1': 'Creatum Media',
};
