type Copy = {
  description: {fr: string; en: string};
  credit?: {fr: string; en: string};
  location?: {
    label: {fr: string; en: string};
    country: {fr: string; en: string};
    lat: number;
    lon: number;
  };
};

// Sources: the matching records in docs/research/media-inventory-a.json and
// media-inventory-b.json. Places are named by those sources; map coordinates
// represent the city or region, not the precise camera position.
const paris: NonNullable<Copy['location']> = {
  label: {fr: 'Paris', en: 'Paris'},
  country: {fr: 'France', en: 'France'},
  lat: 48.86,
  lon: 2.35,
};

export const projectCopy: Record<string, Copy> = {
  'samuel-kwan-2d1c3c05ffa84f4a82ae28e3c2c4639a': {
    description: {
      fr: 'La production de Noël de Landmark, filmée en drone autour de Chater Road et Statue Square à Hong Kong.',
      en: 'Landmark’s Christmas production, filmed by drone around Chater Road and Statue Square in Hong Kong.',
    },
    location: {
      label: {fr: 'Hong Kong', en: 'Hong Kong'},
      country: {fr: 'Hong Kong', en: 'Hong Kong'},
      lat: 22.281,
      lon: 114.159,
    },
  },
  'tom-puma': {
    description: {
      fr: 'La collection Teveris de Puma prend place dans un reel produit tourné à Paris avec @matt.brt. Une production accompagnée de photographies, réalisée pour Puma France avec Social Cut / Taiga.',
      en: 'Puma’s Teveris collection features in a product reel filmed in Paris with @matt.brt. The production also included photography, created for Puma France with Social Cut / Taiga.',
    },
    credit: {
      fr: 'Tom Pacelli. Agence : Social Cut / Taiga. Talent : @matt.brt.',
      en: 'Tom Pacelli. Agency: Social Cut / Taiga. Talent: @matt.brt.',
    },
    location: paris,
  },
  'tom-levis': {
    description: {
      fr: 'Un reel produit consacré aux chaussures de la collection hiver Levi’s × Zalando, avec @yesmonga. Le tournage parisien inscrit le produit dans une collaboration entre marque, talent et agence.',
      en: 'A product reel featuring footwear from the Levi’s × Zalando winter collection, starring @yesmonga. Filmed in Paris, the project brings together the brand, creator and agency.',
    },
    credit: {
      fr: 'Tom Pacelli. Agence : Social Cut / Taiga. Talent : @yesmonga.',
      en: 'Tom Pacelli. Agency: Social Cut / Taiga. Talent: @yesmonga.',
    },
    location: paris,
  },
  'tom-radisson': {
    description: {
      fr: 'Trois jours de tournage au Château de Bangkok pour raconter le contraste entre le calme de l’hôtel et l’intensité de la ville. Un film principal et dix photographies composent cette production pour Radisson Hotels.',
      en: 'Three days filming at Château de Bangkok explore the contrast between the hotel’s calm and the city’s intensity. A main film and ten photographs make up this production for Radisson Hotels.',
    },
    credit: {
      fr: 'Tom Pacelli, en collaboration avec Johanna-Liisa Meema.',
      en: 'Tom Pacelli, in collaboration with Johanna-Liisa Meema.',
    },
    location: {
      label: {fr: 'Bangkok', en: 'Bangkok'},
      country: {fr: 'Thaïlande', en: 'Thailand'},
      lat: 13.75,
      lon: 100.5,
    },
  },
  'tom-onefinestay': {
    description: {
      fr: 'Une visite filmée du loft rue Jules César, à Paris, pour onefinestay. Les cadrages composés révèlent les volumes et le caractère de l’appartement dans un film de présentation produit avec Exordi.',
      en: 'A filmed tour of the Rue Jules César loft in Paris for onefinestay. Carefully composed shots reveal the apartment’s spaces and character in a property showcase produced with Exordi.',
    },
    credit: {
      fr: 'Tom Pacelli. Production : Exordi.',
      en: 'Tom Pacelli. Production: Exordi.',
    },
    location: paris,
  },
  'tom-amex': {
    description: {
      fr: 'Amsterdam à travers ses hôtels, ses restaurants étoilés et ses lieux emblématiques. Une semaine et demie de tournage pour un film de deux minutes consacré à l’expérience American Express Travel Credits.',
      en: 'Amsterdam through its hotels, Michelin-starred restaurants and landmarks. A week and a half of filming shaped this two-minute film about the American Express Travel Credits experience.',
    },
    credit: {
      fr: 'Tom Pacelli, pour Beautiful Destinations.',
      en: 'Tom Pacelli, commissioned by Beautiful Destinations.',
    },
    location: {
      label: {fr: 'Amsterdam', en: 'Amsterdam'},
      country: {fr: 'Pays-Bas', en: 'Netherlands'},
      lat: 52.37,
      lon: 4.9,
    },
  },
  'tom-charentestourism': {
    description: {
      fr: 'Du surf aux tables locales, quinze jours de tournage dans les Charentes pour un film de destination. Une production menée avec Les Coflocs pour la Région Nouvelle-Aquitaine, au fil des activités du territoire.',
      en: 'From surfing to local dining, fifteen days filming across the Charentes for a destination film. Produced with Les Coflocs for the Nouvelle-Aquitaine region, the project follows the area’s activities and experiences.',
    },
    credit: {
      fr: 'Tom Pacelli. Production : Les Coflocs.',
      en: 'Tom Pacelli. Production: Les Coflocs.',
    },
    location: {
      label: {fr: 'Charentes', en: 'Charentes'},
      country: {fr: 'France', en: 'France'},
      lat: 45.75,
      lon: -0.5,
    },
  },
  'tom-volkswagenxlescoflocs': {
    description: {
      fr: 'Le Volkswagen T6.1 accompagne Les Coflocs en Lot-et-Garonne dans un reel Instagram consacré à la destination. Le véhicule devient le fil conducteur du voyage et de la découverte du territoire.',
      en: 'The Volkswagen T6.1 joins Les Coflocs in Lot-et-Garonne in a destination-led Instagram reel. The vehicle connects the journey with the places explored along the way.',
    },
    credit: {
      fr: 'Vidéo : Tom Pacelli. Agence et talents : Les Coflocs.',
      en: 'Videographer: Tom Pacelli. Agency and on-screen talent: Les Coflocs.',
    },
    location: {
      label: {fr: 'Lot-et-Garonne', en: 'Lot-et-Garonne'},
      country: {fr: 'France', en: 'France'},
      lat: 44.37,
      lon: 0.44,
    },
  },
  'tom-eastjava': {
    description: {
      fr: 'Du mont Bromo au cratère d’Ijen, un film tourné avec IndoTrip Designer à travers Java oriental. Routes isolées, ascensions à l’aube et paysages volcaniques donnent le rythme de cette exploration.',
      en: 'From Mount Bromo to the Ijen crater, a film made with IndoTrip Designer across East Java. Remote roads, dawn ascents and volcanic landscapes shape the journey.',
    },
    location: {
      label: {fr: 'Java oriental', en: 'East Java'},
      country: {fr: 'Indonésie', en: 'Indonesia'},
      lat: -7.7,
      lon: 112.5,
    },
  },
  'tom-redseapadi': {
    description: {
      fr: 'Une semaine avec les Ambassadivers PADI, entre les resorts Nujuma et Shebara, pour Visit Red Sea. Ce récit de deux minutes associe hospitalité, architecture et exploration sous-marine.',
      en: 'A week following PADI Ambassadivers between Nujuma and Shebara resorts for Visit Red Sea. This two-minute story brings together hospitality, architecture and underwater exploration.',
    },
    credit: {
      fr: 'Tom Pacelli, pour Beautiful Destinations. Client : Visit Red Sea, en partenariat avec PADI.',
      en: 'Tom Pacelli, for Beautiful Destinations. Client: Visit Red Sea, in partnership with PADI.',
    },
  },
  'robin-dubai': {
    description: {
      fr: 'Une escale à Dubaï racontée en trente secondes pour Visit Dubai. Robin Chills signe la réalisation et la direction de la photographie de ce film de destination.',
      en: 'A thirty-second Dubai stopover film for Visit Dubai. Robin Chills directed the destination film and served as director of photography.',
    },
    credit: {
      fr: 'Réalisation et direction de la photographie : Robin Chills.',
      en: 'Director and director of photography: Robin Chills.',
    },
    location: {
      label: {fr: 'Dubaï', en: 'Dubai'},
      country: {fr: 'Émirats arabes unis', en: 'United Arab Emirates'},
      lat: 25.2,
      lon: 55.27,
    },
  },
  'robin-jetex': {
    description: {
      fr: '« Fly Private », un film Jetex consacré au voyage en aviation privée. Une référence réalisée par Robin Chills, également crédité à la direction de la photographie.',
      en: '“Fly Private”, a Jetex film centred on private aviation travel. Robin Chills is credited as both director and director of photography.',
    },
    credit: {
      fr: 'Réalisation et direction de la photographie : Robin Chills.',
      en: 'Director and director of photography: Robin Chills.',
    },
  },
  'robin-qatar-doha': {
    description: {
      fr: 'Une découverte du Qatar avec Qatar Airways, présentée dans le portfolio de Robin Chills sous le titre « Doha ». Le film « Burgundy Adventures » relie la compagnie à sa destination.',
      en: 'A journey through Qatar with Qatar Airways, listed in Robin Chills’ portfolio as “Doha”. The film “Burgundy Adventures” connects the airline with its destination.',
    },
    credit: {
      fr: 'Filmmaker : Robin Chills.',
      en: 'Filmmaker: Robin Chills.',
    },
    location: {
      label: {fr: 'Doha', en: 'Doha'},
      country: {fr: 'Qatar', en: 'Qatar'},
      lat: 25.29,
      lon: 51.53,
    },
  },
  'robin-etihad': {
    description: {
      fr: 'Une séquence de quinze secondes consacrée à la restauration à bord de l’Etihad A380. Robin Chills est crédité à la direction de la photographie et au montage.',
      en: 'A fifteen-second cut focused on dining aboard the Etihad A380. Robin Chills is credited as director of photography and editor.',
    },
    credit: {
      fr: 'Direction de la photographie et montage : Robin Chills.',
      en: 'Director of photography and editor: Robin Chills.',
    },
  },
  'robin-dji-lofoten': {
    description: {
      fr: 'Un voyage dans les Lofoten à la recherche du soleil de minuit. Publié sous le titre « What Happens When the Sun Never Sets? », ce film figure parmi les références DJI de Robin Chills.',
      en: 'A journey through the Lofoten Islands in search of the midnight sun. Published as “What Happens When the Sun Never Sets?”, the film appears among Robin Chills’ DJI references.',
    },
    credit: {
      fr: 'Filmmaker : Robin Chills.',
      en: 'Filmmaker: Robin Chills.',
    },
    location: {
      label: {fr: 'Lofoten', en: 'Lofoten Islands'},
      country: {fr: 'Norvège', en: 'Norway'},
      lat: 68.2,
      lon: 13.6,
    },
  },
  'cj-mazda': {
    description: {
      fr: 'L’art textile au Portugal au cœur d’un épisode « Mazda Discovers ». Une référence de CJ Blardony où le récit de marque prend la forme d’une découverte culturelle.',
      en: 'Textile art in Portugal is the subject of this “Mazda Discovers” episode. A CJ Blardony portfolio reference that approaches the brand through cultural discovery.',
    },
    location: {
      label: {fr: 'Portugal', en: 'Portugal'},
      country: {fr: 'Portugal', en: 'Portugal'},
      lat: 39.4,
      lon: -8.22,
    },
  },
  'cj-mongolia': {
    description: {
      fr: '« Mongolia Proudly Welcomes You », un film de voyage publié par CJ Blardony et consacré à la Mongolie. Une invitation à découvrir la destination à travers son regard.',
      en: '“Mongolia Proudly Welcomes You”, a travel film about Mongolia published by CJ Blardony. An invitation to discover the destination through his perspective.',
    },
    location: {
      label: {fr: 'Mongolie', en: 'Mongolia'},
      country: {fr: 'Mongolie', en: 'Mongolia'},
      lat: 46.86,
      lon: 103.85,
    },
  },
  'rayan-socotra': {
    description: {
      fr: '« Socotra — A Place Untouched », un film de Rayan Claverol consacré à l’île de Socotra. Il en assure la conception, le tournage et le montage.',
      en: '“Socotra — A Place Untouched”, a Rayan Claverol film about the island of Socotra. He handled the concept, filming and edit.',
    },
    credit: {
      fr: 'Conception, tournage et montage : Rayan Claverol.',
      en: 'Concept, filming and edit: Rayan Claverol.',
    },
    location: {
      label: {fr: 'Socotra', en: 'Socotra'},
      country: {fr: 'Yémen', en: 'Yemen'},
      lat: 12.5,
      lon: 53.8,
    },
  },
  'samuel-kwan-8218e39818084803818865e4ff74b712': {
    description: {
      fr: '« Artistry in Cocktails », un film vertical consacré au DarkSide Bar du Rosewood Hong Kong. Le cocktail devient le sujet d’un contenu de marque pensé autour de l’identité du bar.',
      en: '“Artistry in Cocktails”, a vertical film for DarkSide Bar at Rosewood Hong Kong. The cocktail is the focus of a brand film centred on the bar’s identity.',
    },
    credit: {
      fr: 'Sanctuary Creative, la structure de Samuel Kwan.',
      en: 'Sanctuary Creative, Samuel Kwan’s studio.',
    },
  },
  'samuel-kwan-76d126f1cdae492f971cf01e0c16764c': {
    description: {
      fr: 'Un film vertical autour de la carte « Exploration » du bar Argo, au Four Seasons Hong Kong. Une référence consacrée à l’offre du bar au sein de l’hôtel.',
      en: 'A vertical film around Argo’s “Exploration” menu at Four Seasons Hong Kong. A reference dedicated to the hotel bar’s offering.',
    },
    credit: {
      fr: 'Sanctuary Creative, la structure de Samuel Kwan.',
      en: 'Sanctuary Creative, Samuel Kwan’s studio.',
    },
  },
  'samuel-kwan-e69d32ce332f4aecb0c60b70c08ed0a4': {
    description: {
      fr: 'Une collaboration festive entre Four Seasons Hong Kong et Mikimoto, présentée dans un film vertical. Une rencontre entre une maison de joaillerie et l’univers de l’hôtellerie.',
      en: 'A festive collaboration between Four Seasons Hong Kong and Mikimoto, presented in a vertical film. A meeting of jewellery and hospitality.',
    },
    credit: {
      fr: 'Sanctuary Creative, la structure de Samuel Kwan.',
      en: 'Sanctuary Creative, Samuel Kwan’s studio.',
    },
  },
};
