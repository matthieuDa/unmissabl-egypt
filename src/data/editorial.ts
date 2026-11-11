/**
 * Local editorial seed, FR / EN.
 * Sources: docs/research/creators-and-references.md and
 * docs/research/creator-projects-additional.md (observed 2026-10-11).
 * Portfolio references belong to their original creators and production teams.
 * Declared bases describe public profiles; they do not promise availability.
 */
import type {Lang} from './site';
export type Localized<T = string> = Record<Lang,T>;

export type Talent = {
  id: string;
  name: string;
  role: Localized;
  bio: Localized;
  website?: string;
  instagram?: string;
  base?: Localized;
  baseStatus?: 'declared' | 'to-confirm';
  producer?: boolean;
};

export type Sector = {
  id: string;
  name: Localized;
  headline: Localized;
  description: Localized;
  needs: Localized<string[]>;
  formats: Localized<string[]>;
};

export type Destination = {
  id: string;
  name: Localized;
  period: Localized;
  status: Localized;
  description: Localized;
  lat: number;
  lon: number;
  lead?: 'alexandre-buisson';
  producer: 'matthieu-dalle';
};

export type VisibilityMetric = {
  id: string;
  talentId: string;
  value: number;
  displayValue: Localized;
  label: Localized;
  estimate: true;
  source: 'Modash';
  sourceURL: string;
  date: string;
  method: Localized;
  limitation: Localized;
};

export const talents: Talent[] = [
  {
    id: 'tom-pacelli',
    name: 'Tom Pacelli',
    role: { fr: 'Réalisateur & photographe', en: 'Filmmaker & photographer' },
    bio: {
      fr: 'Des destinations aux campagnes de marque, Tom compose des récits ancrés dans les lieux. Le voyage, l’outdoor et la photographie nourrissent son regard.',
      en: 'Tom brings a sense of place to destination stories and brand campaigns, drawing on travel, the outdoors and photography.',
    },
    website: 'https://www.tompacelli.com/',
    instagram: 'https://www.instagram.com/tom.pacelli/',
    base: { fr: 'Tallinn / Dubaï', en: 'Tallinn / Dubai' },
    baseStatus: 'declared',
  },
  {
    id: 'orie-hyde',
    name: 'Orie Hyde',
    role: { fr: 'Réalisateur & photographe', en: 'Filmmaker & photographer' },
    bio: {
      fr: 'Orie associe film, photographie et direction visuelle pour les marques premium. Son travail explore les destinations et les univers de marque.',
      en: 'Orie combines filmmaking, photography and visual direction for premium brands, with a focus on destinations and brand storytelling.',
    },
    instagram: 'https://www.instagram.com/orie.hyde/',
    base: { fr: 'Dubaï / Paris', en: 'Dubai / Paris' },
    baseStatus: 'declared',
  },
  {
    id: 'marceau-thevenin',
    name: 'Marceau Thevenin',
    role: { fr: 'Directeur créatif & vidéaste', en: 'Creative director & filmmaker' },
    bio: {
      fr: 'Événement, lifestyle, sport et aventure : Marceau travaille le rythme et l’énergie du récit, de l’écriture au montage.',
      en: 'Marceau works across events, lifestyle, sport and adventure, shaping the pace and energy of a story from concept to edit.',
    },
    instagram: 'https://www.instagram.com/marceau.tvn/',
    base: { fr: 'Paris', en: 'Paris' },
    baseStatus: 'declared',
  },
  {
    id: 'laura',
    name: 'Laura Edl',
    role: { fr: 'Filmmaker de voyage', en: 'Travel filmmaker' },
    bio: {
      fr: 'Laura porte un regard de voyageuse sur les lieux et les expériences. Elle contribue à la prise de vue de productions internationales.',
      en: 'Laura approaches places and experiences through a traveller’s eye. Her work includes camera contributions to international productions.',
    },
    instagram: 'https://www.instagram.com/lauraaedl/',
    base: { fr: 'Dubaï / Paris', en: 'Dubai / Paris' },
    baseStatus: 'declared',
  },
  {
    id: 'samuel-kwan',
    name: 'Samuel Kwan',
    role: { fr: 'Filmmaker', en: 'Filmmaker' },
    bio: {
      fr: 'Hôtellerie, beauté et univers de marque : Samuel développe un regard attentif aux gestes et aux lieux.',
      en: 'Samuel’s work spans hospitality, beauty and brand stories, with an eye for detail and atmosphere.',
    },
    website: 'https://www.sanctuarycreatives.com/',
    instagram: 'https://www.instagram.com/samuelkwansy/',
    base: { fr: 'Hong Kong', en: 'Hong Kong' },
    baseStatus: 'declared',
  },
  {
    id: 'cj-blardony',
    name: 'CJ Blardony',
    role: { fr: 'Filmmaker & photographe', en: 'Filmmaker & photographer' },
    bio: {
      fr: 'CJ mêle voyage, photographie et récits de marque. Sa sélection de films traverse les paysages et les savoir-faire, du Portugal à la Mongolie.',
      en: 'CJ brings together travel, photography and brand storytelling. His selected films explore landscapes and craftsmanship, from Portugal to Mongolia.',
    },
    website: 'https://bio.site/cjblardony',
    instagram: 'https://www.instagram.com/cjblardony/',
    baseStatus: 'to-confirm',
  },
  {
    id: 'robin-chills',
    name: 'Robin Chills',
    role: { fr: 'Réalisateur & directeur de la photographie', en: 'Director & cinematographer' },
    bio: {
      fr: 'Du récit de destination au film d’aviation, Robin explore le voyage par l’image. Son portfolio distingue la réalisation, la photographie et le montage selon chaque projet.',
      en: 'Robin’s work moves between destination stories and aviation films. His portfolio identifies his directing, cinematography and editing roles on each project.',
    },
    website: 'https://www.robinchills.com/',
    instagram: 'https://www.instagram.com/robinchills/',
    // The official site says Barcelona; Instagram says Bali. No single base asserted.
    baseStatus: 'to-confirm',
  },
  {
    id: 'chuck-dumont',
    name: 'Chuck Dumont',
    role: { fr: 'Producteur, filmmaker & pilote FPV', en: 'Producer, filmmaker & FPV pilot' },
    bio: {
      fr: 'Chuck contribue à des productions d’hôtellerie, d’automobile et d’outdoor. La production et les prises de vue aériennes occupent une place centrale dans ses crédits.',
      en: 'Chuck contributes to hospitality, automotive and outdoor productions, with production and aerial filmmaking central to his credited work.',
    },
    website: 'https://dumontfilms.ca/',
    instagram: 'https://www.instagram.com/chuck_dumont/',
    base: { fr: 'Rivière-du-Loup, Québec', en: 'Rivière-du-Loup, Québec' },
    baseStatus: 'declared',
  },
  {
    id: 'zaid-wazzan',
    name: 'Zaid Wazzan',
    role: { fr: 'Photographe & vidéaste', en: 'Photographer & filmmaker' },
    bio: {
      fr: 'Joaillerie, mode et gastronomie composent le portfolio de Zaid. Il travaille la matière, le détail et la présence du produit en photographie et en vidéo.',
      en: 'Zaid’s portfolio spans jewellery, fashion and food. His photography and video work focus on texture, detail and the presence of a product.',
    },
    website: 'https://www.behance.net/zaidwazzan',
    instagram: 'https://www.instagram.com/_byzaid_/',
    // Current Instagram declaration; the older Behance location is Amman.
    base: { fr: 'Dubaï', en: 'Dubai' },
    baseStatus: 'declared',
  },
  {
    id: 'matiss-skujins',
    name: 'Matiss Skujins',
    role: { fr: 'Filmmaker & créateur de contenu', en: 'Filmmaker & content creator' },
    bio: {
      fr: 'Matiss crée des contenus pour l’hôtellerie, le sport et les marques. Son portfolio associe campagnes, films de voyage, événements et postproduction.',
      en: 'Matiss creates content for hospitality, sport and brands. His portfolio brings together campaigns, travel films, events and post-production.',
    },
    website: 'https://bymatiss.com/',
    instagram: 'https://www.instagram.com/matiss.skujins/',
    base: { fr: 'Dubaï', en: 'Dubai' },
    baseStatus: 'declared',
  },
  {
    id: 'keoni-lachhar',
    name: 'Keoni Lachhar',
    role: { fr: 'Filmmaker, photographe & directeur créatif', en: 'Filmmaker, photographer & creative director' },
    bio: {
      fr: 'Keoni réunit film, photographie et direction créative. Son regard s’exprime dans les univers de marque, la mode et les contenus sociaux.',
      en: 'Keoni works across film, photography and creative direction, exploring brand stories, fashion and social content.',
    },
    instagram: 'https://www.instagram.com/bykeonilachhar/',
    baseStatus: 'to-confirm',
  },
  {
    id: 'bahri-najm',
    name: 'Bahri Najm',
    role: { fr: 'Filmmaker · Aérien, FPV & sous-marin', en: 'Filmmaker · Aerial, FPV & underwater' },
    bio: {
      fr: 'Le regard de Bahri relie la terre, le ciel et l’eau. Ses spécialités déclarées réunissent prises de vue sous-marines, aériennes et FPV autour du voyage et de l’aventure.',
      en: 'Bahri’s approach connects land, sky and water. His stated specialities include underwater, aerial and FPV filmmaking, centred on travel and adventure.',
    },
    website: 'https://bahrinajm.com/',
    instagram: 'https://www.instagram.com/bahrinajm/',
    baseStatus: 'to-confirm',
  },
  {
    id: 'rayan-claverol',
    name: 'Rayan Claverol',
    role: { fr: 'Filmmaker & photographe', en: 'Filmmaker & photographer' },
    bio: {
      fr: 'Rayan associe film et photographie, avec des prises de vue au sol, dans les airs et sous l’eau. Le voyage et l’expérience des lieux structurent son univers visuel.',
      en: 'Rayan combines film and photography on the ground, in the air and underwater. Travel and a sense of place shape his visual work.',
    },
    website: 'https://rayanclaverol.com/',
    instagram: 'https://www.instagram.com/rayanclaverrol/',
    baseStatus: 'to-confirm',
  },
  {
    id: 'duarte',
    name: 'Duarte',
    role: { fr: 'Vidéaste & créateur de contenu', en: 'Filmmaker & content creator' },
    bio: {
      fr: 'Duarte couvre l’automobile et le sport mécanique, mais aussi l’hôtellerie, la restauration et l’immobilier.',
      en: 'Duarte’s portfolio spans automotive and motorsport alongside hospitality, restaurants and real estate.',
    },
    website: 'https://ducreates.myportfolio.com/',
    instagram: 'https://www.instagram.com/du.creates/',
    base: { fr: 'Dubaï / Monaco', en: 'Dubai / Monaco' },
    baseStatus: 'declared',
  },
  {
    id: 'alexandre-buisson',
    name: 'Alexandre Buisson',
    role: { fr: 'Réalisateur · Responsable créatif Égypte', en: 'Director · Egypt creative lead' },
    bio: {
      fr: 'Alexandre travaille notamment sur l’hôtellerie, le voyage et les contenus de marque. Il est le réalisateur référent de la production Égypte, coordonnée par Matthieu.',
      en: 'Alexandre’s work spans hospitality, travel and branded content. He is the lead director for the planned Egypt production, coordinated by Matthieu.',
    },
    website: 'https://www.alexonmedia.com/',
    instagram: 'https://www.instagram.com/alexoonnn/',
    baseStatus: 'to-confirm',
  },
  {
    id: 'matthieu-dalle',
    name: 'Matthieu Dalle-Berardinelli',
    role: { fr: 'Producteur · Votre interlocuteur', en: 'Producer · Your point of contact' },
    bio: {
      fr: 'Du premier échange à la livraison, Matthieu réunit les talents, cadre la production et coordonne votre projet. Il travaille avec votre équipe ou votre agence pour donner à chaque tournage les moyens de son ambition.',
      en: 'From the first conversation to delivery, Matthieu brings the team together and coordinates your production. He works with your team or agency to shape a shoot around your creative ambitions.',
    },
    producer: true,
  },
];

export const sectors: Sector[] = [
  {
    id: 'hospitality',
    name: { fr: 'Hôtellerie', en: 'Hospitality' },
    headline: { fr: 'Faire ressentir le séjour. Avant l’arrivée.', en: 'Make the stay felt. Before arrival.' },
    description: {
      fr: 'Révéler un lieu à travers son architecture, ses gestes et l’expérience de ses hôtes. Nous produisons des images pour vos campagnes et vos canaux, en lien avec votre équipe ou votre agence.',
      en: 'Bring a property to life through its spaces, people and guest experience. We create campaign and channel assets in collaboration with your team or agency.',
    },
    needs: {
      fr: ['Présenter un établissement ou une nouvelle adresse', 'Faire découvrir l’expérience au-delà des chambres', 'Renouveler une bibliothèque de contenus de marque'],
      en: ['Introduce a property or a new opening', 'Show the guest experience beyond the rooms', 'Refresh your brand’s content library'],
    },
    formats: {
      fr: ['Film de marque', 'Formats verticaux', 'Photographies de lieu et de lifestyle'],
      en: ['Brand film', 'Vertical edits', 'Property and lifestyle photography'],
    },
  },
  {
    id: 'travel',
    name: { fr: 'Voyage & destinations', en: 'Travel & destinations' },
    headline: { fr: 'Un lieu. Mille raisons d’y aller.', en: 'A place worth travelling for.' },
    description: {
      fr: 'Paysages, rencontres, expériences : construire un récit qui donne envie de partir. Nos talents apportent leur regard de terrain à votre stratégie de destination.',
      en: 'Landscapes, people and experiences come together in a story that invites the journey. Our filmmakers bring their on-location perspective to your destination strategy.',
    },
    needs: {
      fr: ['Donner une identité visuelle à une destination', 'Mettre en scène un itinéraire ou une expérience', 'Créer des contenus pour une campagne saisonnière'],
      en: ['Give a destination a distinctive visual identity', 'Bring an itinerary or experience to life', 'Create content for a seasonal campaign'],
    },
    formats: {
      fr: ['Film de destination', 'Récits courts pour les réseaux', 'Séries photographiques'],
      en: ['Destination film', 'Short social stories', 'Photography series'],
    },
  },
  {
    id: 'fashion',
    name: { fr: 'Mode, lifestyle & outdoor', en: 'Fashion, lifestyle & outdoor' },
    headline: { fr: 'Votre collection. Un autre terrain d’expression.', en: 'Your collection. A new setting.' },
    description: {
      fr: 'Donner du mouvement, de la matière et un contexte à votre univers. Une équipe de production internationale pour prolonger votre direction créative dans des lieux qui font sens.',
      en: 'Give your brand movement, texture and a setting with purpose. An international production team to take your creative direction into the right locations.',
    },
    needs: {
      fr: ['Lancer une collection ou un produit', 'Montrer les usages et les détails', 'Décliner une campagne pour plusieurs canaux'],
      en: ['Launch a collection or product', 'Show how it feels, works and moves', 'Adapt a campaign across channels'],
    },
    formats: {
      fr: ['Film de campagne', 'Photographies de collection', 'Formats courts et portraits'],
      en: ['Campaign film', 'Collection photography', 'Short edits and portraits'],
    },
  },
  {
    id: 'automotive',
    name: { fr: 'Automobile', en: 'Automotive' },
    headline: { fr: 'Le caractère, en mouvement.', en: 'Character in motion.' },
    description: {
      fr: 'Design, conduite, compétition : raconter ce qui distingue un véhicule et l’expérience qui l’entoure. Une production conçue avec votre équipe, du repérage aux formats de diffusion.',
      en: 'Design, driving and motorsport reveal the character of a vehicle. We plan the production with your team, from location scouting to the final channel formats.',
    },
    needs: {
      fr: ['Accompagner un lancement', 'Raconter un événement ou une expérience de conduite', 'Créer une série de contenus produit'],
      en: ['Support a launch', 'Tell the story of an event or driving experience', 'Build a series of product assets'],
    },
    formats: {
      fr: ['Film de marque ou de lancement', 'Photographie automobile', 'Formats sociaux et films événementiels'],
      en: ['Brand or launch film', 'Automotive photography', 'Social edits and event films'],
    },
  },
  {
    id: 'aviation',
    name: { fr: 'Aviation', en: 'Aviation' },
    headline: { fr: 'Le voyage commence dans l’image.', en: 'The journey starts with the story.' },
    description: {
      fr: 'Faire ressentir une expérience de voyage, du service à la destination. Nos talents réunissent des références aériennes et touristiques, avec un tournage cadré selon vos accès et votre fonctionnement.',
      en: 'Bring the journey to life, from the service to the destination. Our team draws on aviation and travel work, with production planned around your access and operations.',
    },
    needs: {
      fr: ['Présenter une expérience de voyage', 'Mettre en valeur une cabine ou un service', 'Relier une marque à ses destinations'],
      en: ['Introduce a travel experience', 'Showcase a cabin or service', 'Connect a brand with its destinations'],
    },
    formats: {
      fr: ['Film de marque', 'Photographies d’expérience', 'Formats courts de destination'],
      en: ['Brand film', 'Experience photography', 'Short destination films'],
    },
  },
  {
    id: 'food',
    name: { fr: 'Gastronomie & boissons', en: 'Food & drink' },
    headline: { fr: 'Donner une image au goût.', en: 'Make flavour visible.' },
    description: {
      fr: 'Un geste, une texture, un moment partagé : traduire ce que l’on goûte en images. Du restaurant à la marque de boissons, nous produisons des contenus adaptés à votre univers et à vos usages.',
      en: 'A gesture, a texture, a shared moment: turn taste into a visual story. From restaurants to drinks brands, we create content shaped around your identity and channels.',
    },
    needs: {
      fr: ['Présenter une adresse ou une nouvelle carte', 'Raconter un produit et ses savoir-faire', 'Mettre en scène un moment de dégustation'],
      en: ['Introduce a restaurant or a new menu', 'Tell the story behind a product and its craft', 'Create a setting for a tasting experience'],
    },
    formats: {
      fr: ['Film de marque ou de lieu', 'Photographies culinaires et produit', 'Portraits et formats verticaux'],
      en: ['Brand or venue film', 'Food and product photography', 'Portraits and vertical edits'],
    },
  },
  {
    id: 'jewellery',
    name: { fr: 'Joaillerie & horlogerie', en: 'Jewellery & watches' },
    headline: { fr: 'Chaque détail mérite le premier plan.', en: 'Every detail deserves attention.' },
    description: {
      fr: 'Faire dialoguer matière, lumière et mouvement. Une approche attentive aux détails pour présenter une pièce, une collection ou l’expérience de votre maison.',
      en: 'Bring material, light and movement into focus. A considered approach to presenting a piece, a collection or the experience of your brand.',
    },
    needs: {
      fr: ['Présenter une collection ou une pièce', 'Mettre en valeur les détails et les matières', 'Raconter un lancement ou une expérience en boutique'],
      en: ['Introduce a collection or a piece', 'Reveal details and materials', 'Capture a launch or an in-store experience'],
    },
    formats: {
      fr: ['Photographies de collection', 'Films de détail et de marque', 'Formats courts de lancement'],
      en: ['Collection photography', 'Detail and brand films', 'Short launch edits'],
    },
  },
  {
    id: 'architecture',
    name: { fr: 'Architecture & immobilier', en: 'Architecture & real estate' },
    headline: { fr: 'Raconter l’espace. Faire imaginer la vie.', en: 'Show the space. Suggest the life within.' },
    description: {
      fr: 'Lignes, volumes, lumière et usages donnent un sens au lieu. Nous apportons une production visuelle à votre projet, en complément de votre équipe de communication ou de votre agence locale.',
      en: 'Lines, space, light and everyday use give a place meaning. We bring visual production to your project alongside your communications team or local agency.',
    },
    needs: {
      fr: ['Présenter un lieu, un bien ou un projet livré', 'Raconter sa conception et ses usages', 'Constituer une bibliothèque d’images pour sa commercialisation'],
      en: ['Present a property or completed development', 'Tell the story of its design and use', 'Build an image library for marketing'],
    },
    formats: {
      fr: ['Film architectural', 'Photographies d’espaces', 'Formats courts et prises de vue aériennes selon le projet'],
      en: ['Architectural film', 'Interior and exterior photography', 'Short edits and aerial footage where appropriate'],
    },
  },
];

/** Regional markers describe planned destinations, not booked filming locations. */
export const destinations: Destination[] = [
  {
    id: 'egypt',
    name: { fr: 'Égypte', en: 'Egypt' },
    period: { fr: 'Octobre et décembre 2026', en: 'October and December 2026' },
    status: { fr: 'Prochaine fenêtre : décembre', en: 'Next window: December' },
    description: {
      fr: 'Calendrier 2026 : octobre, désormais passé, et décembre. Alexandre Buisson à la direction du projet, Matthieu Dalle-Berardinelli à la production. Nous étudions votre brief pour la fenêtre de décembre ; les accès, l’équipe et les livrables sont définis ensemble.',
      en: '2026 schedule: October, now past, and December. Alexandre Buisson leads the project, with Matthieu Dalle-Berardinelli producing. We assess your brief for the December window; access, crew and deliverables are agreed together.',
    },
    lat: 26.8206,
    lon: 30.8025,
    lead: 'alexandre-buisson',
    producer: 'matthieu-dalle',
  },
  {
    id: 'france',
    name: { fr: 'France — Côte d’Azur', en: 'France — Côte d’Azur' },
    period: { fr: 'Printemps 2027', en: 'Spring 2027' },
    status: { fr: 'Production en préparation', en: 'Production in preparation' },
    description: {
      fr: 'Une production sur la Côte d’Azur pour les hôtels, resorts, golfs, marques automobiles et lieux d’exception. Le printemps 2027 est la fenêtre de préparation : chaque lieu, créneau et équipe sera retenu selon les projets.',
      en: 'A Côte d’Azur production for hotels, resorts, golf clubs, automotive brands and distinctive properties. Spring 2027 is the planned window; locations, timing and crews will be selected around the projects.',
    },
    lat: 43.7,
    lon: 7.25,
    producer: 'matthieu-dalle',
  },
];

/** Individual historical estimates: never sum or annualise these averages. */
export const metrics: VisibilityMetric[] = [
  {
    id: 'tom-pacelli-modash-reels-2026-10-11',
    talentId: 'tom-pacelli',
    value: 37200,
    displayValue: { fr: '≈ 37,2 k', en: '≈ 37.2k' },
    label: { fr: 'Vues moyennes estimées par Reel', en: 'Estimated average views per Reel' },
    estimate: true,
    source: 'Modash',
    sourceURL: 'https://www.modash.io/instagram-average-views-calculator',
    date: '2026-10-11',
    method: {
      fr: 'Selon Modash : moyenne des vues des Reels publiés sur 60 jours glissants, dans une limite de 500 publications. Relevé le 11 octobre 2026.',
      en: 'Modash reports the mean views of Reels published over a rolling 60-day window, capped at 500 posts. Observed on 11 October 2026.',
    },
    limitation: {
      fr: 'Estimation tierce. Date de rafraîchissement, taille de l’échantillon et part organique ou payante inconnues. Ces résultats ne garantissent pas les vues d’une future campagne.',
      en: 'Third-party estimate. Refresh date, sample size and organic versus paid split are unknown. These results do not guarantee views for a future campaign.',
    },
  },
  {
    id: 'samuel-kwan-modash-reels-2026-10-11',
    talentId: 'samuel-kwan',
    value: 19600,
    displayValue: { fr: '≈ 19,6 k', en: '≈ 19.6k' },
    label: { fr: 'Vues moyennes estimées par Reel', en: 'Estimated average views per Reel' },
    estimate: true,
    source: 'Modash',
    sourceURL: 'https://www.modash.io/instagram-average-views-calculator',
    date: '2026-10-11',
    method: {
      fr: 'Selon Modash : moyenne des vues des Reels publiés sur 60 jours glissants, dans une limite de 500 publications. Relevé le 11 octobre 2026.',
      en: 'Modash reports the mean views of Reels published over a rolling 60-day window, capped at 500 posts. Observed on 11 October 2026.',
    },
    limitation: {
      fr: 'Estimation tierce. Date de rafraîchissement, taille de l’échantillon et part organique ou payante inconnues. Ces résultats ne garantissent pas les vues d’une future campagne.',
      en: 'Third-party estimate. Refresh date, sample size and organic versus paid split are unknown. These results do not guarantee views for a future campaign.',
    },
  },
];
