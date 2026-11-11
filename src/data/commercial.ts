export type CommercialLocale = 'fr' | 'en';
type L = Record<CommercialLocale, string>;
export type CommercialSector = {
  id: string; name: L; title: L; description: L; heroProject: string;
  referenceIds: string[]; adjacent?: boolean; outcomes: L[]; deliverables: L[];
  annual: L; collaboration: L;
};
const l=(fr:string,en:string):L=>({fr,en});
export const commercialSectors:CommercialSector[]=[
 {
  id:'hotels',name:l('Hôtels','Hotels'),title:l('Donnez envie de réserver le séjour.','Make the stay worth booking.'),
  description:l('Chambres, table, spa, service : des films et photographies qui donnent une raison de choisir votre hôtel. Une production pensée pour votre site, vos campagnes et vos réseaux sociaux.','Rooms, dining, spa and service: films and photographs that give guests a reason to choose your hotel. Production designed for your website, campaigns and social channels.'),
  heroProject:'elewana-collection',referenceIds:['elewana-collection','tom-radisson','samuel-kwan-76d126f1cdae492f971cf01e0c16764c'],
  outcomes:[l('Renouveler les visuels de votre site et de vos pages de réservation.','Refresh your website and booking-page visuals.'),l('Faire découvrir une ouverture, une rénovation ou une nouvelle expérience.','Introduce an opening, refurbishment or new guest experience.'),l('Créer des contenus courts pour vos campagnes et vos réseaux.','Create short content for campaigns and social channels.')],
  deliverables:[l('Film de présentation du séjour','Guest-experience film'),l('Formats courts : chambre, table, spa et destination','Short edits: rooms, dining, spa and destination'),l('Photographies pour le site et la communication','Photography for your website and communications')],
  annual:l('Planifions une production à l’ouverture de saison, puis des compléments pour vos temps forts. Vous constituez une bibliothèque cohérente, sans réinventer un tournage pour chaque publication.','Plan a production at the start of the season, then fresh content around key moments. Build a coherent library without starting a new shoot for every post.'),
  collaboration:l('Associer votre établissement à une maison automobile, une marque de mode ou une agence de voyage. Chacun reçoit ses contenus ; la diffusion croisée se construit avec les partenaires.','Pair your property with an automotive brand, fashion house or travel agency. Each receives its own content, with shared distribution planned together.')
 },
 {
  id:'golf',name:l('Golfs','Golf clubs'),title:l('Faites découvrir le parcours. Et tout ce qui l’entoure.','Show the course. And everything around it.'),
  description:l('Du premier départ à la terrasse du club-house, racontez une expérience complète. Des images pour attirer les visiteurs, présenter votre domaine et accompagner votre saison.','From the first tee to the clubhouse terrace, tell the complete story. Imagery to attract visitors, introduce your estate and support the season.'),
  heroProject:'tom-charentestourism',referenceIds:['tom-charentestourism','elewana-collection','bahri-najm-socotra-hero'],adjacent:true,
  outcomes:[l('Présenter le parcours, le cadre et les services aux visiteurs.','Present the course, setting and services to visiting players.'),l('Valoriser vos séjours golf, votre restauration et vos événements.','Showcase golf breaks, dining and events.'),l('Préparer une banque d’images pour la saison et les partenaires.','Build an image library for the season and your partners.')],
  deliverables:[l('Film du domaine et de l’expérience de jeu','Estate and playing-experience film'),l('Séquences courtes : parcours, entraînement et club-house','Short edits: course, practice and clubhouse'),l('Photographies de lieux et d’expériences','Location and experience photography')],
  annual:l('Une session pour lancer la saison, une autre autour d’un tournoi ou d’une offre de séjour. Le nombre de tournages suit votre calendrier, la lumière et les conditions du parcours.','One session to open the season, another around a tournament or stay package. Shoot frequency follows your calendar, light and course conditions.'),
  collaboration:l('Un golf, un hôtel et une marque automobile peuvent raconter le même week-end sous des angles complémentaires. Le projet, les accès au parcours et les publications se valident ensemble.','A golf club, hotel and automotive brand can tell the same weekend from complementary perspectives. The concept, course access and posts are agreed together.')
 },
 {
  id:'resorts',name:l('Resorts','Resorts'),title:l('Un lieu. Toutes les raisons d’y séjourner.','One destination. Every reason to stay.'),
  description:l('Hébergement, nature, activités et service : mettez en scène ce qui rend votre resort singulier. Un tournage coordonné pour raconter le séjour dans tous ses formats.','Accommodation, nature, activities and service: show what makes your resort distinctive. One coordinated shoot to tell the story of the stay across formats.'),
  heroProject:'elewana-collection',referenceIds:['elewana-collection','tom-redseapadi','tom-radisson'],
  outcomes:[l('Faire comprendre l’expérience complète avant la réservation.','Bring the full experience to life before booking.'),l('Valoriser les activités, les suites et les offres saisonnières.','Showcase activities, suites and seasonal offers.'),l('Donner à vos équipes une bibliothèque de contenus réutilisables.','Give your teams a reusable content library.')],
  deliverables:[l('Film de destination et de séjour','Destination and stay film'),l('Déclinaisons par expérience et par public','Edits by experience and audience'),l('Photographies d’espaces, de services et de détails','Photography of spaces, service and details')],
  annual:l('Organisez vos prises de parole autour des saisons, des nouveaux services et des marchés que vous souhaitez toucher. Les contenus peuvent être livrés en lots pour alimenter votre calendrier.','Organise your communications around seasons, new services and target markets. Content can be delivered in batches to support your calendar.'),
  collaboration:l('Une agence de voyage haut de gamme et votre resort peuvent produire un récit commun, puis le partager auprès de leurs publics respectifs. Nous coordonnons création, partenaires et livrables.','A high-end travel agency and your resort can create a shared story for their respective audiences. We coordinate the creative work, partners and deliverables.')
 },
 {
  id:'automotive',name:l('Automobile','Automotive'),title:l('Votre véhicule. Des décors à sa hauteur.','Your vehicle. Settings to match.'),
  description:l('Lancement, collection, expérience de conduite : des films et photographies qui montrent le design et le caractère du véhicule. Une équipe adaptée aux lieux, aux accès et aux conditions de tournage.','Launches, collections and driving experiences: films and photographs that reveal a vehicle’s design and character. A team selected for the locations, access and shoot conditions.'),
  heroProject:'duarte-creatum-royal-rides-1',referenceIds:['duarte-creatum-royal-rides-1','chuck-dumont-hyundai-ioniq-5','cj-mazda'],
  outcomes:[l('Accompagner un lancement ou une nouvelle collection.','Support a launch or new collection.'),l('Produire des formats pour le site, les réseaux et les distributeurs.','Create formats for websites, social channels and dealers.'),l('Relier le véhicule à un univers de voyage, de sport ou de design.','Connect the vehicle to travel, sport or design.')],
  deliverables:[l('Film de campagne ou d’expérience','Campaign or experience film'),l('Formats courts et séquences produit','Short edits and product sequences'),l('Photographies de design, de détails et de conduite','Design, detail and driving photography')],
  annual:l('Préparez vos lancements et événements en amont. Nous pouvons coordonner plusieurs réalisateurs dans différents pays pour garder une même direction créative, sans déplacer la même équipe partout.','Plan launches and events ahead. We can coordinate filmmakers across countries under one creative direction, without moving the same crew everywhere.'),
  collaboration:l('Automobile et horlogerie, véhicule et hôtel, conduite et golf : réunissez des marques complémentaires autour d’une expérience, avec des livrables et des droits définis pour chacune.','Automotive and watches, a vehicle and hotel, driving and golf: bring complementary brands together around an experience, with deliverables and rights agreed for each.')
 },
 {
  id:'equestrian',name:l('Haras & équestre','Stud farms & equestrian'),title:l('Montrez votre domaine. Faites ressentir votre exigence.','Show your estate. Convey your standards.'),
  description:l('Un haras se découvre par ses chevaux, ses lieux et celles et ceux qui y travaillent. Une approche documentaire et visuelle pour présenter votre activité avec précision et sensibilité.','A stud farm is defined by its horses, its setting and the people who work there. A documentary and visual approach to presenting your activity with care and precision.'),
  heroProject:'tom-charentestourism',referenceIds:['tom-charentestourism','elewana-collection'],adjacent:true,
  outcomes:[l('Présenter le haras, ses installations et son équipe.','Introduce the stud farm, facilities and team.'),l('Accompagner une saison, un événement ou la communication de votre élevage.','Support a season, event or breeding programme’s communications.'),l('Construire des contenus cohérents pour votre site et vos réseaux.','Build consistent content for your website and social channels.')],
  deliverables:[l('Film de présentation du haras','Stud-farm presentation film'),l('Portraits de l’équipe et séquences d’activité','Team portraits and activity sequences'),l('Photographies du domaine et du quotidien','Estate and everyday-life photography')],
  annual:l('Définissons les moments à documenter dans l’année, en lien avec votre équipe. Le déroulé du tournage respecte les contraintes du site, les soins et le rythme des chevaux.','Identify the moments to document throughout the year with your team. The shoot plan respects the site’s requirements, care routines and the horses’ pace.'),
  collaboration:l('Une marque d’équipement, un hôtel ou un partenaire automobile peuvent enrichir un projet commun. Toute présence de chevaux, de cavaliers et de marques est cadrée avec votre équipe avant le tournage.','An equipment brand, hotel or automotive partner can enrich a shared project. Any involvement of horses, riders and brands is planned with your team before filming.')
 }
];
export const commercialSectorById=(id:string)=>commercialSectors.find(s=>s.id===id);
